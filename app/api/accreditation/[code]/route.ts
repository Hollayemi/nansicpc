import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'

const DB_NAME = 'nans_icpc'
const COLLECTION = 'accreditation_codes'

// GET — validate / inspect a code (public use during registration)
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const record = await db.collection(COLLECTION).findOne({ code: code.toUpperCase() })

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
