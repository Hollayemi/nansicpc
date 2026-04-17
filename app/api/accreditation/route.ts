import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../lib/mongodb'

const DB_NAME = 'nans_icpc'
const COLLECTION = 'accreditation_codes'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `NANS-${seg(4)}-${seg(4)}`
}

// POST — admin generates a new accreditation code
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { institution, zone, state, generatedFor } = body

    if (!institution || !zone || !state) {
      return NextResponse.json(
        { error: 'Missing required fields: institution, zone, state' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    // Ensure uniqueness
    let code = generateCode()
    let attempts = 0
    while (attempts < 10) {
      const existing = await db.collection(COLLECTION).findOne({ code })
      if (!existing) break
      code = generateCode()
      attempts++
    }

    const doc = {
      code,
      institution,
      zone,
      state,
      generatedFor: generatedFor || null,
      status: 'unused',
      usedAt: null,
      usedBy: null,
      createdAt: new Date(),
    }

    await db.collection(COLLECTION).insertOne(doc)

    return NextResponse.json({ success: true, code }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/accreditation]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET — admin lists all codes (with optional filters)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const zone = searchParams.get('zone')
    const search = searchParams.get('search')

    const filter: Record<string, unknown> = {}
    if (status && status !== 'all') filter.status = status
    if (zone && zone !== 'all') filter.zone = zone
    if (search) {
      filter.$or = [
        { institution: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { generatedFor: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ]
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const codes = await db
      .collection(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ codes })
  } catch (err) {
    console.error('[GET /api/accreditation]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
