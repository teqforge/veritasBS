const { Pool } = require('pg');

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { email, source, guide, ip } = formData;

    // Validate required fields
    if (!email || !source) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email and source are required' })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Connect to PostgreSQL database
    const pool = new Pool({
      connectionString: process.env.NETLIFY_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    try {
      // Create leads table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          source VARCHAR(100) NOT NULL,
          guide VARCHAR(100) DEFAULT 'reality-check-methodology',
          ip VARCHAR(45),
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Insert or update lead
      const result = await pool.query(`
        INSERT INTO leads (email, source, guide, ip, status)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) 
        DO UPDATE SET 
          source = EXCLUDED.source,
          guide = EXCLUDED.guide,
          ip = EXCLUDED.ip,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id, email, source, created_at
      `, [email, source, guide || 'reality-check-methodology', ip || 'unknown', 'new']);

      const lead = result.rows[0];

      console.log('Lead stored in database:', {
        id: lead.id,
        email: lead.email,
        source: lead.source,
        created_at: lead.created_at
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: true, 
          message: 'Lead captured successfully',
          leadId: lead.id,
          email: lead.email
        })
      };

    } finally {
      await pool.end();
    }

  } catch (error) {
    console.error('Error storing lead:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to store lead' })
    };
  }
}; 