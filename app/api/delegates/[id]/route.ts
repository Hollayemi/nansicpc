import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'

const DB_NAME       = 'nans_icpc'
const DELEGATES_COL = 'delegates'

// PATCH — update delegate status (confirmed | pending)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid delegate ID' }, { status: 400 })
    }

    const body = await req.json()
    const { status, adminNote } = body

    const allowed = ['pending', 'confirmed', 'rejected']
    if (status && !allowed.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` }, { status: 400 })
    }

    const update: Record<string, unknown> = { updatedAt: new Date() }
    if (status)    update.status    = status
    if (adminNote !== undefined) update.adminNote = adminNote

    const client = await clientPromise
    const db     = client.db(DB_NAME)

    const result = await db.collection(DELEGATES_COL).updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Delegate not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[PATCH /api/delegates/:id]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
