import { neon } from '@neondatabase/serverless'

const sql = neon(process.env['DATABASE_URL']!)

export async function trackEvent(path: string, userAgent?: string) {
  await sql`
    INSERT INTO analytics_events (path, timestamp, user_agent)
    VALUES (${path}, ${Date.now()}, ${userAgent || null})
  `
}
