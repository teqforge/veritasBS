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
    const formData = JSON.parse(event.body);
    const { guide, source } = formData;

    // Track the download (you can add analytics here)
    console.log('Guide download requested:', { guide, source, timestamp: new Date().toISOString() });

    // Return success response with download link and tracking
    const successResponse = `
      <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 16px; color: #2d3748; text-align: center;">
        <h4 style="color: #38a169; margin-bottom: 8px;">✅ Guide Downloaded!</h4>
        <p style="margin-bottom: 12px;">Check your downloads folder for "Reality-Check-Methodology-Guide.pdf"</p>
        <p style="font-size: 14px; color: #718096;">
          📧 Want weekly Reality Check tips? 
          <span hx-get="/newsletter-signup-form" 
                hx-target="#newsletter-quick-signup" 
                style="color: #3182ce; cursor: pointer; text-decoration: underline;">
            Subscribe here
          </span>
        </p>
        <div id="newsletter-quick-signup"></div>
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