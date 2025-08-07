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
            case 'failure-rate':
                content = `
                    <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169;">
                        <h4 style="color: #38a169; margin-bottom: 12px;">65% of Projects Fail to Achieve Goals</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Only 31% of projects deliver on time, on budget, with full functionality. 
                            The remaining 65% either fail completely, are cancelled, or deliver 
                            significantly reduced value.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Standish Group CHAOS Report 2024, PMI Pulse of the Profession
                        </div>
                    </div>
                `;
                break;
                
            case 'cost-overrun':
                content = `
                    <div style="background: #fef5e7; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e;">
                        <h4 style="color: #d69e2e; margin-bottom: 12px;">27% Average Project Cost Overrun</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Projects consistently exceed budgets by an average of 27%. 
                            Larger projects (£1M+) have 50% higher failure rates than smaller projects.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Standish Group CHAOS Report 2024, McKinsey Project Management Survey
                        </div>
                    </div>
                `;
                break;
                
            case 'global-waste':
                content = `
                    <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2b6cb0;">
                        <h4 style="color: #2b6cb0; margin-bottom: 12px;">$1M Wasted Every 20 Seconds Globally</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Poor project management and communication gaps cost the global economy 
                            approximately $1 million every 20 seconds. This includes failed projects, 
                            delays, and opportunity costs.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> PMI Pulse of the Profession 2024, Standish Group analysis
                        </div>
                    </div>
                `;
                break;
                
            case 'failure-cost':
                content = `
                    <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169;">
                        <h4 style="color: #38a169; margin-bottom: 12px;">Failed Projects Cost Millions</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Failed projects average 27% cost overruns with many completely abandoned. 
                            The true cost includes opportunity cost, team morale, and customer trust.
                        </p>
                        <div style="font-size: 14px; color: #718096;">
                            <strong>Source:</strong> Standish Group CHAOS Report 2024, PMI Pulse of the Profession
                        </div>
                    </div>
                `;
                break;
                
            case 'warning-time':
                content = `
                    <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2b6cb0;">
                        <h4 style="color: #2b6cb0; margin-bottom: 12px;">Early Warning Signs Often Ignored</h4>
                        <p style="margin-bottom: 12px; color: #2d3748;">
                            Research shows teams often identify problems early but lack safe channels 
                            to voice concerns. The gap between knowing and saying is where money burns.
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