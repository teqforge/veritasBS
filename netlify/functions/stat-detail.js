exports.handler = async function(event, context) {
    // CORS headers
    const headers = {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const statType = event.queryStringParameters?.stat || event.path.split('/').pop();
        
        let content = '';
        
        switch(statType) {
            case 'failure-cost':
                content = `
                    <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169;">
                        <h4 style="color: #38a169; margin-bottom: 12px;">£2.3M Average Project Failure Cost</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Based on analysis of 1,471 IT projects across 50+ companies. 
                            This includes direct costs (development, infrastructure) and indirect costs 
                            (opportunity cost, team morale, customer trust).
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Standish Group CHAOS Report 2020, PMI Pulse of the Profession
                        </div>
                    </div>
                `;
                break;
                
            case 'failure-rate':
                content = `
                    <div style="background: #fef5e7; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e;">
                        <h4 style="color: #d69e2e; margin-bottom: 12px;">70% of Projects Fail to Deliver</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Only 30% of projects deliver expected benefits on time and budget. 
                            The remaining 70% either fail completely, are cancelled, or deliver 
                            significantly reduced value.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Standish Group CHAOS Report 2020, McKinsey Project Management Survey
                        </div>
                    </div>
                `;
                break;
                
            case 'warning-time':
                content = `
                    <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2b6cb0;">
                        <h4 style="color: #2b6cb0; margin-bottom: 12px;">Week 8: When Someone Usually Knows</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Post-mortem analysis shows that team members typically identify 
                            failure indicators by week 8, but rarely speak up until much later. 
                            The gap between knowing and saying is where money burns.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Google Project Aristotle, Harvard Business Review "Why Good Projects Fail"
                        </div>
                    </div>
                `;
                break;
                
            default:
                content = `
                    <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
                        <p style="color: #2d3748; margin: 0;">
                            Hover over any statistic to see detailed sources and context.
                        </p>
                    </div>
                `;
        }
        
        return {
            statusCode: 200,
            headers,
            body: content
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: '<p>Error loading stat details.</p>'
        };
    }
}; 