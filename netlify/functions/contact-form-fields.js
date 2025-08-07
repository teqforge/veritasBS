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
    // Get the service interest from query parameters
    const queryParams = new URLSearchParams(event.queryStringParameters || '');
    const serviceInterest = queryParams.get('service_interest');

    // Dynamic fields based on service interest
    const dynamicFields = {
      'implementation': `
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Company Size
          </label>
          <select name="company_size" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
            <option value="">Select company size...</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Current Project Challenges
          </label>
          <textarea name="challenges" 
                    placeholder="What specific challenges are you facing with your current projects?"
                    rows="3"
                    style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px; resize: vertical;"></textarea>
        </div>
      `,
      'training': `
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Team Size
          </label>
          <select name="team_size" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
            <option value="">Select team size...</option>
            <option value="1-5">1-5 people</option>
            <option value="6-15">6-15 people</option>
            <option value="16-50">16-50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Preferred Training Date
          </label>
          <input type="date" 
                 name="preferred_date" 
                 min="${new Date().toISOString().split('T')[0]}"
                 style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
        </div>
      `,
      'general': `
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Question Type
          </label>
          <select name="question_type" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
            <option value="">Select question type...</option>
            <option value="methodology">About the methodology</option>
            <option value="implementation">Implementation advice</option>
            <option value="pricing">Pricing questions</option>
            <option value="other">Other</option>
          </select>
        </div>
      `,
      'media': `
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Media Type
          </label>
          <select name="media_type" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
            <option value="">Select media type...</option>
            <option value="podcast">Podcast interview</option>
            <option value="webinar">Webinar/Online event</option>
            <option value="conference">Conference speaking</option>
            <option value="article">Article contribution</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style="margin-bottom: 24px;">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
            Audience Size
          </label>
          <select name="audience_size" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 6px;">
            <option value="">Select audience size...</option>
            <option value="1-100">1-100 people</option>
            <option value="101-500">101-500 people</option>
            <option value="501-1000">501-1000 people</option>
            <option value="1000+">1000+ people</option>
          </select>
        </div>
      `
    };

    const fields = dynamicFields[serviceInterest] || '';
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: fields
    };

  } catch (error) {
    console.error('Error serving dynamic form fields:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 