import { NextRequest, NextResponse } from 'next/server'

import clientPromise from '../../lib/mongodb'
const DB_NAME    = 'nans_icpc'
const CODES_COL  = 'accreditation_codes'
const DELEGATES_COL = 'delegates'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `NANS-${seg(4)}-${seg(4)}`
}

// GET — validate / inspect a code (public use during registration)
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const record = await db.collection(CODES_COL).findOne({ code: code.toUpperCase() })

    if (!record) {
      return NextResponse.json({ valid: false, error: 'Code not found' }, { status: 404 })
    }

    if (record.status === 'used') {
      return NextResponse.json(
        { valid: false, error: 'This code has already been used', institution: record.institution },
        { status: 409 }
      )
    }

    return NextResponse.json({
      valid: true,
      institution: record.institution,
      zone: record.zone,
      state: record.state,
    })
  } catch (err) {
    console.error('[GET /api/accreditation/:code]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST — admin regenerates a code: deletes associated delegate + old code, creates fresh code
export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params
    const upperCode = code.toUpperCase()

    const client = await clientPromise
    const db = client.db(DB_NAME)

    // Find the existing code record
    const record = await db.collection(CODES_COL).findOne({ code: upperCode })
    if (!record) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 })
    }

    // Delete the associated delegate (if any)
    if (record.usedBy) {
      await db.collection(DELEGATES_COL).deleteOne({ _id: record.usedBy })
    } else {
      // Fallback: delete by code field on the delegate document
      await db.collection(DELEGATES_COL).deleteOne({ code: upperCode })
    }

    // Delete the old accreditation code document
    await db.collection(CODES_COL).deleteOne({ code: upperCode })

    // Generate a unique new code
    let newCode = generateCode()
    let attempts = 0
    while (attempts < 10) {
      const existing = await db.collection(CODES_COL).findOne({ code: newCode })
      if (!existing) break
      newCode = generateCode()
      attempts++
    }

    // Insert the fresh code record (same institution/zone/state)
    const doc = {
      code: newCode,
      institution: record.institution,
      zone: record.zone,
      state: record.state,
      generatedFor: record.generatedFor || null,
      status: 'unused',
      usedAt: null,
      usedBy: null,
      createdAt: new Date(),
      regeneratedFrom: upperCode,
    }

    await db.collection(CODES_COL).insertOne(doc)

    return NextResponse.json({
      success: true,
      newCode,
      institution: record.institution,
      zone: record.zone,
      state: record.state,
    }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/accreditation/:code/regenerate]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
