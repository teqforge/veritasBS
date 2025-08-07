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
    const { type } = formData;

    // Track the booking request
    console.log('Quick booking requested:', { type, timestamp: new Date().toISOString() });

    // Booking content based on type
    const bookingResponses = {
      'discovery': `
        <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 20px; color: #2d3748;">
          <h4 style="color: #38a169; margin-bottom: 12px;">📅 Discovery Call Booked!</h4>
          <p style="margin-bottom: 8px;">We'll send you a calendar link within 24 hours.</p>
          <p style="font-size: 14px; color: #718096;">
            <strong>What to expect:</strong> 30-minute call to discuss your current projects and how Reality Check can help.
          </p>
        </div>
      `,
      'training': `
        <div style="background: #fef5e7; border: 2px solid #d69e2e; border-radius: 8px; padding: 20px; color: #2d3748;">
          <h4 style="color: #d69e2e; margin-bottom: 12px;">🎯 Training Session Booked!</h4>
          <p style="margin-bottom: 8px;">We'll send you a calendar link within 24 hours.</p>
          <p style="font-size: 14px; color: #718096;">
            <strong>What to expect:</strong> Half-day workshop to train your team on running Reality Checks independently.
          </p>
        </div>
      `
    };

    const bookingResponse = bookingResponses[type];
    
    if (!bookingResponse) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Invalid booking type.</p>'
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: bookingResponse
    };

  } catch (error) {
    console.error('Error processing quick booking:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 