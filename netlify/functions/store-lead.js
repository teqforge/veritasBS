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

    // Store the lead (this is where you'd integrate with your CRM)
    const lead = {
      email,
      source,
      guide: guide || 'reality-check-methodology',
      ip: ip || 'unknown',
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // Log the lead (replace this with your CRM integration)
    console.log('New lead captured:', lead);

    // Here you would typically:
    // 1. Save to database (Airtable, Notion, etc.)
    // 2. Add to email list (Mailchimp, ConvertKit, etc.)
    // 3. Send to CRM (HubSpot, Salesforce, etc.)
    // 4. Trigger follow-up sequences

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true, 
        message: 'Lead captured successfully',
        leadId: Date.now().toString() // Simple ID for tracking
      })
    };

  } catch (error) {
    console.error('Error storing lead:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to store lead' })
    };
  }
}; 