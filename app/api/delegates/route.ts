import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../lib/mongodb'

const DB_NAME = 'nans_icpc'
const DELEGATES_COL = 'delegates'
const CODES_COL = 'accreditation_codes'

// POST — register a delegate using an accreditation code
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, institution, position, zone, state, phone, email, code } = body

    if (!fullName || !institution || !zone || !state || !phone || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    // Validate the code
    const codeRecord = await db.collection(CODES_COL).findOne({ code: code.toUpperCase().trim() })

    if (!codeRecord) {
      return NextResponse.json({ error: 'Invalid accreditation code' }, { status: 400 })
    }
    if (codeRecord.status === 'used') {
      return NextResponse.json({ error: 'This accreditation code has already been used' }, { status: 409 })
    }

    // Insert delegate
    const delegate = {
      fullName,
      institution: codeRecord.institution, // use institution from the code (authoritative)
      position: position || 'SUG President',
      zone: codeRecord.zone,
      state: codeRecord.state,
      phone,
      email: email || null,
      code: code.toUpperCase().trim(),
      registeredAt: new Date(),
    }

    const result = await db.collection(DELEGATES_COL).insertOne(delegate)

    // Mark code as used
    await db.collection(CODES_COL).updateOne(
      { code: code.toUpperCase().trim() },
      {
        $set: {
          status: 'used',
          usedAt: new Date(),
          usedBy: result.insertedId,
        },
      }
    )

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/delegates]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET — public: list all registered delegates
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const zone = searchParams.get('zone')
    const search = searchParams.get('search')

    const filter: Record<string, unknown> = {}
    if (zone && zone !== 'all') filter.zone = zone
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { institution: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ]
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const delegates = await db
      .collection(DELEGATES_COL)
      .find(filter)
      .sort({ registeredAt: -1 })
      .toArray()

    return NextResponse.json({ delegates })
  } catch (err) {
    console.error('[GET /api/delegates]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
