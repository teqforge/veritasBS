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
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    const serviceInterest = formData.get('service_interest');

    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Please fill in all required fields.</p>'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Please enter a valid email address.</p>'
      };
    }

    // Track the contact form submission
    console.log('Contact form submitted:', { 
      name, 
      email, 
      company, 
      serviceInterest, 
      messageLength: message.length,
      timestamp: new Date().toISOString() 
    });

    // Here you would typically send an email or save to a database
    // For now, we'll just return a success message

    const successResponse = `
      <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 20px; color: #2d3748;">
        <h4 style="color: #38a169; margin-bottom: 12px;">✅ Message Sent!</h4>
        <p style="margin-bottom: 8px;">Thanks for your message. We'll reply within 24 hours.</p>
        <p style="font-size: 14px; color: #718096;">
          📚 While you wait, grab our free methodology guide above.
        </p>
      </div>
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: successResponse
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 