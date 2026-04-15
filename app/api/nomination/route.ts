import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../lib/mongodb'

const DB_NAME = 'nans_icpc'
const COLLECTION = 'nominations'

// POST — submit a new nomination
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Basic required-field guard
    const required = ['fullName', 'stateOfOrigin', 'institution', 'officeContested']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const doc = {
      ...body,
      status: 'pending',          // pending | cleared | disqualified
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    )
  } catch (err) {
    console.error('[POST /api/nomination]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET — fetch all nominations (admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const office = searchParams.get('office')
    const search = searchParams.get('search')

    const filter: Record<string, unknown> = {}
    if (status && status !== 'all') filter.status = status
    if (office && office !== 'all') filter.officeContested = office
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { institution: { $regex: search, $options: 'i' } },
        { stateOfOrigin: { $regex: search, $options: 'i' } },
      ]
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const nominations = await db
      .collection(COLLECTION)
      .find(filter)
      .sort({ submittedAt: -1 })
      .toArray()

    return NextResponse.json({ nominations })
  } catch (err) {
    console.error('[GET /api/nomination]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
