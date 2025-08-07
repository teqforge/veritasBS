const { Pool } = require('pg');

exports.handler = async function(event, context) {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e;">Method Not Allowed</p>' 
    };
  }

  try {
    // Connect to PostgreSQL database
    const pool = new Pool({
      connectionString: process.env.NETLIFY_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    try {
      // Get leads from database
      const result = await pool.query(`
        SELECT id, email, source, guide, ip, status, created_at, updated_at
        FROM leads 
        ORDER BY created_at DESC 
        LIMIT 100
      `);

      const leads = result.rows;

      // Create HTML table
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Veritas BS - Lead Management</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .stats { background: #f0fff4; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .lead-count { font-size: 24px; font-weight: bold; color: #38a169; }
          </style>
        </head>
        <body>
          <h1>Veritas BS - Lead Management</h1>
          
          <div class="stats">
            <div class="lead-count">${leads.length} Total Leads</div>
            <p>Last updated: ${new Date().toLocaleString()}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Source</th>
                <th>Guide</th>
                <th>Status</th>
                <th>IP</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              ${leads.map(lead => `
                <tr>
                  <td>${lead.id}</td>
                  <td>${lead.email}</td>
                  <td>${lead.source}</td>
                  <td>${lead.guide}</td>
                  <td>${lead.status}</td>
                  <td>${lead.ip}</td>
                  <td>${new Date(lead.created_at).toLocaleString()}</td>
                  <td>${new Date(lead.updated_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html
      };

    } finally {
      await pool.end();
    }

  } catch (error) {
    console.error('Error viewing leads:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e;">Error loading leads</p>'
    };
  }
}; 