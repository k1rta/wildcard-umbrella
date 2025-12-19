import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env['DATABASE_URL']!)
    const result = await sql`SELECT version()`

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      version: result[0]?.['version'] || 'unknown',
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: 'Database connection failed',
      },
      { status: 500 }
    )
  }
}
