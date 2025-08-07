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
    // Extract question ID from path
    const pathParts = event.path.split('/');
    const questionId = pathParts[pathParts.length - 1];

    // Question content database
    const questionDetails = {
      '1': `
        <div style="padding: 32px; border-top: 1px solid #e2e8f0; background: white;">
          <h4 style="color: #1a202c; margin-bottom: 16px;">Good Evidence vs Bad Evidence</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169;">
              <h5 style="color: #38a169; margin-bottom: 12px;">✅ Good Evidence</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>"37 customers requested this feature this month"</li>
                <li>"Trial users convert at 73% with this vs 22% without"</li>
                <li>"Customer X will pay £50k extra for this capability"</li>
              </ul>
            </div>
            
            <div style="background: #fef5e7; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e;">
              <h5 style="color: #d69e2e; margin-bottom: 12px;">❌ Bad Evidence</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>"Everyone wants things to be faster"</li>
                <li>"Digital transformation is essential"</li>
                <li>"We need to keep up with innovation"</li>
              </ul>
            </div>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <button hx-get="/question-examples/1" 
                    hx-target="#more-examples"
                    hx-indicator="#examples-spinner"
                    style="background: #3182ce; color: white; padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer;">
              <span class="htmx-normal">See More Examples</span>
              <span class="htmx-indicator" id="examples-spinner">Loading...</span>
            </button>
          </div>
          
          <div id="more-examples" style="margin-top: 20px;"></div>
        </div>
      `,
      '2': `
        <div style="padding: 32px; border-top: 1px solid #e2e8f0; background: white;">
          <h4 style="color: #1a202c; margin-bottom: 16px;">Why Surprises Prevent Disasters</h4>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #2d3748; line-height: 1.6; margin-bottom: 16px;">
              <strong>If nothing surprises you, you're not learning.</strong> Learning prevents disasters.
            </p>
            <p style="color: #2d3748; line-height: 1.6;">
              Surprises reveal gaps in your understanding. They're early warning signs that something isn't working as expected.
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div style="background: #f0fff4; padding: 20px; border-radius: 8px;">
              <h5 style="color: #38a169; margin-bottom: 12px;">✅ Good Surprises</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>"Users are using feature X differently than expected"</li>
                <li>"Customer feedback is more positive than anticipated"</li>
                <li>"The technical challenge was easier than we thought"</li>
              </ul>
            </div>
            
            <div style="background: #fef5e7; padding: 20px; border-radius: 8px;">
              <h5 style="color: #d69e2e; margin-bottom: 12px;">⚠️ Warning Surprises</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>"Users are abandoning at step 3"</li>
                <li>"The integration is more complex than planned"</li>
                <li>"Customer expectations don't match our assumptions"</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      '3': `
        <div style="padding: 32px; border-top: 1px solid #e2e8f0; background: white;">
          <h4 style="color: #1a202c; margin-bottom: 16px;">The Psychology of Uncomfortable Truths</h4>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #2d3748; line-height: 1.6; margin-bottom: 16px;">
              <strong>The silence before someone answers is where truth lives.</strong>
            </p>
            <p style="color: #2d3748; line-height: 1.6;">
              This question surfaces what people know but are afraid to say. It creates psychological safety for uncomfortable truths.
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div style="background: #f0fff4; padding: 20px; border-radius: 8px;">
              <h5 style="color: #38a169; margin-bottom: 12px;">✅ What to Look For</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>Long pauses before answers</li>
                <li>Qualified responses ("but...", "however...")</li>
                <li>Body language changes</li>
                <li>Defensive explanations</li>
              </ul>
            </div>
            
            <div style="background: #fef5e7; padding: 20px; border-radius: 8px;">
              <h5 style="color: #d69e2e; margin-bottom: 12px;">🎯 Common Pretenses</h5>
              <ul style="color: #2d3748; line-height: 1.6;">
                <li>"The timeline is realistic" (when it's not)</li>
                <li>"Everyone is on board" (when they're not)</li>
                <li>"The budget is sufficient" (when it's not)</li>
                <li>"The technology will work" (when it might not)</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #e6fffa; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h5 style="color: #319795; margin-bottom: 12px;">💡 Pro Tip</h5>
            <p style="color: #2d3748; line-height: 1.6; margin: 0;">
              Ask this question last, after building trust with the first two questions. The longer the silence, the more important the truth being withheld.
            </p>
          </div>
        </div>
      `
    };

    const questionContent = questionDetails[questionId];
    
    if (!questionContent) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e;">Question not found.</p>'
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: questionContent
    };

  } catch (error) {
    console.error('Error serving question details:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
}; 