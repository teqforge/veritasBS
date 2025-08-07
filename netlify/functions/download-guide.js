exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e;">Method Not Allowed</p>' 
    };
  }

  try {
    let formData = {};
    
    // Handle different content types
    if (event.headers['content-type'] && event.headers['content-type'].includes('application/json')) {
      // JSON data
      formData = JSON.parse(event.body);
    } else {
      // Form data - parse URL encoded or multipart
      const querystring = require('querystring');
      formData = querystring.parse(event.body);
    }

    const { guide, source, email } = formData;

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Email address is required.</p>'
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Please enter a valid email address.</p>'
      };
    }

    // Store the lead
    const leadData = {
      email,
      guide,
      source,
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'
    };

    try {
      // Store lead in database
      const response = await fetch(`${process.env.URL || 'https://veritasbs.co.uk'}/.netlify/functions/store-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Lead stored successfully:', result);
      } else {
        console.error('Failed to store lead:', response.status);
      }
    } catch (leadError) {
      console.error('Error storing lead:', leadError);
      // Continue even if lead storage fails
    }

    // Provide direct download link
    const successResponse = `
      <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 20px; color: #2d3748; text-align: center;">
        <h4 style="color: #38a169; margin-bottom: 12px;">✅ Guide Ready!</h4>
        <p style="margin-bottom: 12px;">Your email has been captured and the guide is ready for download.</p>
        <a href="/THEREALITYCHECK.pdf" 
           download="Reality-Check-Methodology-Guide.pdf"
           style="display: inline-block; background: #38a169; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0; font-weight: 600;">
          📥 Download Guide Now
        </a>
        <p style="font-size: 14px; color: #718096; margin-top: 16px;">
          📧 You'll receive weekly Reality Check tips and insights via email.
        </p>
        <div style="background: #f7fafc; padding: 16px; border-radius: 6px; margin-top: 16px;">
          <p style="margin: 0; font-size: 14px; color: #4a5568;">
            <strong>Next steps:</strong><br>
            1. Download the guide above<br>
            2. Read the methodology<br>
            3. Start your first Reality Check this Thursday
          </p>
        </div>
      </div>
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: successResponse
    };

  } catch (error) {
    console.error('Error processing download:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 