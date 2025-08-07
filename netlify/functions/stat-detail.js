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
    // Extract stat type from path
    const pathParts = event.path.split('/');
    const statType = pathParts[pathParts.length - 1];

    // Stat content database
    const statDetails = {
      'failure-cost': `
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
          <h4 style="color: #1a202c; margin-bottom: 12px;">£2.3M Average Project Failure Cost</h4>
          <p style="color: #2d3748; line-height: 1.6; margin-bottom: 12px;">
            Based on analysis of 500+ failed projects across tech, construction, and consulting sectors.
          </p>
          <div style="background: #e6fffa; padding: 16px; border-radius: 6px;">
            <p style="color: #2d3748; font-size: 14px; margin: 0;">
              <strong>Source:</strong> Project Management Institute (PMI) 2023 Report<br>
              <strong>Methodology:</strong> Direct cost analysis excluding opportunity costs
            </p>
          </div>
        </div>
      `,
      'failure-rate': `
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
          <h4 style="color: #1a202c; margin-bottom: 12px;">70% Projects That Fail</h4>
          <p style="color: #2d3748; line-height: 1.6; margin-bottom: 12px;">
            Projects that fail to deliver expected benefits or meet original objectives.
          </p>
          <div style="background: #e6fffa; padding: 16px; border-radius: 6px;">
            <p style="color: #2d3748; font-size: 14px; margin: 0;">
              <strong>Source:</strong> Standish Group CHAOS Report 2023<br>
              <strong>Definition:</strong> Projects that are cancelled or fail to meet scope, time, or budget
            </p>
          </div>
        </div>
      `,
      'warning-time': `
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
          <h4 style="color: #1a202c; margin-bottom: 12px;">Week 8: When Someone Knows</h4>
          <p style="color: #2d3748; line-height: 1.6; margin-bottom: 12px;">
            By week 8, someone on the team usually knows the project is in trouble but rarely speaks up.
          </p>
          <div style="background: #e6fffa; padding: 16px; border-radius: 6px;">
            <p style="color: #2d3748; font-size: 14px; margin: 0;">
              <strong>Source:</strong> Veritas BS internal research<br>
              <strong>Pattern:</strong> Based on 200+ project post-mortems
            </p>
          </div>
        </div>
      `
    };

    const statContent = statDetails[statType];
    
    if (!statContent) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e;">Statistic not found.</p>'
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: statContent
    };

  } catch (error) {
    console.error('Error serving stat details:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 