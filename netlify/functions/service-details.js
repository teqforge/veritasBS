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
    // Extract service type from path
    const pathParts = event.path.split('/');
    const serviceType = pathParts[pathParts.length - 1];

    // Service content database
    const serviceDetails = {
      'guide': `
        <div class="service-card" style="background: white; padding: 40px; border-radius: 12px; text-align: center;">
          <h3 style="color: #1a202c; margin-bottom: 16px;">The Reality Check Guide</h3>
          <p style="font-size: 32px; font-weight: 600; color: #38a169; margin-bottom: 16px;">Free</p>
          <p style="color: #2d3748; margin-bottom: 24px;">
            Complete 50-page methodology with templates. Start this Thursday.
          </p>
          
          <ul style="list-style: none; color: #2d3748; margin-bottom: 32px; text-align: left; max-width: 300px; margin-left: auto; margin-right: auto;">
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              50-page implementation guide
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              Meeting templates
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              Success indicators
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              Warning signs
            </li>
          </ul>
          
          <button hx-post="/download-guide" 
                  hx-vals='{"guide": "reality-check-methodology", "source": "services"}'
                  hx-target="#guide-download-result"
                  hx-indicator="#guide-spinner"
                  class="btn btn-primary">
            <span class="htmx-normal">Download Free Guide</span>
            <span class="htmx-indicator" id="guide-spinner">Preparing...</span>
          </button>
          
          <div id="guide-download-result"></div>
        </div>
      `,
      'implementation': `
        <div class="service-card" style="background: white; padding: 40px; border-radius: 12px; text-align: center;">
          <h3 style="color: #1a202c; margin-bottom: 16px;">Implementation Support</h3>
          <p style="font-size: 32px; font-weight: 600; color: #38a169; margin-bottom: 16px;">£2,000/month</p>
          <p style="color: #2d3748; margin-bottom: 24px;">
            We facilitate your first 12 Reality Check sessions. External voice, honest questions.
          </p>
          
          <ul style="list-style: none; color: #2d3748; margin-bottom: 32px; text-align: left; max-width: 300px; margin-left: auto; margin-right: auto;">
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              12 facilitated sessions
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              3-month minimum
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              External facilitation
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              30-day guarantee
            </li>
          </ul>
          
          <button hx-post="/quick-book" 
                  hx-vals='{"type": "discovery"}'
                  hx-target="#implementation-booking-result"
                  hx-indicator="#implementation-spinner"
                  class="btn btn-secondary">
            <span class="htmx-normal">Book Discovery Call</span>
            <span class="htmx-indicator" id="implementation-spinner">Booking...</span>
          </button>
          
          <div id="implementation-booking-result"></div>
        </div>
      `,
      'training': `
        <div class="service-card" style="background: white; padding: 40px; border-radius: 12px; text-align: center;">
          <h3 style="color: #1a202c; margin-bottom: 16px;">Team Training</h3>
          <p style="font-size: 32px; font-weight: 600; color: #38a169; margin-bottom: 16px;">£5,000</p>
          <p style="color: #2d3748; margin-bottom: 24px;">
            Half-day workshop training your team to run Reality Checks independently.
          </p>
          
          <ul style="list-style: none; color: #2d3748; margin-bottom: 32px; text-align: left; max-width: 300px; margin-left: auto; margin-right: auto;">
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              Half-day workshop
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              Train internal facilitators
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              6 weeks email support
            </li>
            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
              <span style="color: #38a169; position: absolute; left: 0; font-weight: bold;">✓</span>
              All materials included
            </li>
          </ul>
          
          <button hx-post="/quick-book" 
                  hx-vals='{"type": "training"}'
                  hx-target="#training-booking-result"
                  hx-indicator="#training-booking-spinner"
                  class="btn btn-outline">
            <span class="htmx-normal">Book Training</span>
            <span class="htmx-indicator" id="training-booking-spinner">Booking...</span>
          </button>
          
          <div id="training-booking-result"></div>
        </div>
      `
    };

    const serviceContent = serviceDetails[serviceType];
    
    if (!serviceContent) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e;">Service not found.</p>'
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: serviceContent
    };

  } catch (error) {
    console.error('Error serving service details:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 