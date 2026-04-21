import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload
// Accepts a multipart form with a single "file" field.
// Returns { url, public_id } on success.
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate size (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5 MB.' }, { status: 400 })
    }

    // Validate type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 })
    }

    // Convert File → Buffer → base64 data URI for Cloudinary
    const arrayBuffer = await file.arrayBuffer()
    const buffer      = Buffer.from(arrayBuffer)
    const base64      = buffer.toString('base64')
    const dataUri     = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder:         'nans_delegates',
      resource_type:  'auto',
      // Strip EXIF/GPS metadata for privacy
      exif:           false,
    })

    return NextResponse.json({ url: result.secure_url, public_id: result.public_id })
  } catch (err) {
    console.error('[POST /api/upload]', err)
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}