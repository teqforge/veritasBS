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
    const formData = new URLSearchParams(event.body);
    const email = formData.get('email');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Please enter a valid email address.</p>'
      };
    }

    // Track the newsletter signup (you can add analytics here)
    console.log('Newsletter signup:', { email, timestamp: new Date().toISOString() });

    // Here you would typically save to a database or email service
    // For now, we'll just return a success message

    const successResponse = `
      <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 12px; color: #2d3748; text-align: center;">
        <p style="margin: 0; font-size: 14px;">✅ Subscribed! You'll get weekly Reality Check tips.</p>
      </div>
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: successResponse
    };

  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 