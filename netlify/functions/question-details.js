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
        const questionId = event.queryStringParameters?.id || event.path.split('/').pop();
        
        let content = '';
        
        switch(questionId) {
            case '1':
                content = `
                    <div class="question-expanded">
                        <h4>Good Evidence vs Bad Evidence</h4>
                        
                        <div class="evidence-comparison" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">
                            <div class="evidence-good" style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #38a169;">
                                <h5 style="color: #38a169; margin-bottom: 12px;">✅ Good Evidence</h5>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #38a169;">•</span>
                                        "37 customers requested this feature this month"
                                    </li>
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #38a169;">•</span>
                                        "Trial users convert at 73% with this vs 22% without"
                                    </li>
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #38a169;">•</span>
                                        "Customer X will pay £50k extra for this capability"
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="evidence-bad" style="background: #fef5e7; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e;">
                                <h5 style="color: #d69e2e; margin-bottom: 12px;">❌ Bad Evidence</h5>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #d69e2e;">•</span>
                                        "Everyone wants things to be faster"
                                    </li>
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #d69e2e;">•</span>
                                        "Digital transformation is essential"
                                    </li>
                                    <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                        <span style="position: absolute; left: 0; color: #d69e2e;">•</span>
                                        "We need to keep up with innovation"
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="evidence-action" style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-top: 24px;">
                            <p style="margin: 0; font-weight: 600; color: #2d3748;">
                                <strong>Reality Check:</strong> If silence lasts longer than 10 seconds when asking this question, you have your answer.
                            </p>
                        </div>
                    </div>
                `;
                break;
                
            case '2':
                content = `
                    <div class="question-expanded">
                        <h4>Why Surprises Matter</h4>
                        
                        <div style="background: #f0fff4; padding: 24px; border-radius: 8px; margin: 24px 0;">
                            <h5 style="color: #38a169; margin-bottom: 16px;">The Learning Paradox</h5>
                            <p style="margin-bottom: 16px;">
                                If nothing surprises you in a project, you're not learning. And if you're not learning, 
                                you're not adapting to reality. This is how projects fail.
                            </p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                                <div style="background: white; padding: 16px; border-radius: 6px;">
                                    <h6 style="color: #38a169; margin-bottom: 8px;">Good Surprises</h6>
                                    <ul style="list-style: none; padding: 0; font-size: 14px;">
                                        <li style="margin-bottom: 6px;">• Users actually want feature X, not Y</li>
                                        <li style="margin-bottom: 6px;">• Integration is harder than expected</li>
                                        <li style="margin-bottom: 6px;">• Team velocity is 30% slower</li>
                                    </ul>
                                </div>
                                
                                <div style="background: white; padding: 16px; border-radius: 6px;">
                                    <h6 style="color: #d69e2e; margin-bottom: 8px;">Warning Signs</h6>
                                    <ul style="list-style: none; padding: 0; font-size: 14px;">
                                        <li style="margin-bottom: 6px;">• "Everything is going according to plan"</li>
                                        <li style="margin-bottom: 6px;">• No surprises for weeks</li>
                                        <li style="margin-bottom: 6px;">• Team seems too confident</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #fef5e7; padding: 20px; border-radius: 8px; margin-top: 24px;">
                            <p style="margin: 0; font-weight: 600; color: #2d3748;">
                                <strong>Reality Check:</strong> The best teams celebrate surprises as learning opportunities, not failures.
                            </p>
                        </div>
                    </div>
                `;
                break;
                
            case '3':
                content = `
                    <div class="question-expanded">
                        <h4>The Psychology of Uncomfortable Truths</h4>
                        
                        <div style="background: #f7fafc; padding: 24px; border-radius: 8px; margin: 24px 0;">
                            <h5 style="color: #2d3748; margin-bottom: 16px;">Why We Stay Silent</h5>
                            <p style="margin-bottom: 16px;">
                                This is the most powerful question because it directly addresses the psychology of groupthink, 
                                status quo bias, and the fear of being the bearer of bad news.
                            </p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 20px;">
                                <div style="background: white; padding: 16px; border-radius: 6px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">🤐</div>
                                    <h6 style="margin-bottom: 8px;">Fear of Conflict</h6>
                                    <p style="font-size: 14px; margin: 0;">Nobody wants to be "negative" or "difficult"</p>
                                </div>
                                
                                <div style="background: white; padding: 16px; border-radius: 6px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">👥</div>
                                    <h6 style="margin-bottom: 8px;">Groupthink</h6>
                                    <p style="font-size: 14px; margin: 0;">Everyone else seems confident, so I must be wrong</p>
                                </div>
                                
                                <div style="background: white; padding: 16px; border-radius: 6px; text-align: center;">
                                    <div style="font-size: 24px; margin-bottom: 8px;">⏰</div>
                                    <h6 style="margin-bottom: 8px;">Sunk Cost</h6>
                                    <p style="font-size: 14px; margin: 0;">We've invested too much to change course now</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #f0fff4; padding: 20px; border-radius: 8px; margin-top: 24px;">
                            <h5 style="color: #38a169; margin-bottom: 12px;">How to Ask This Question</h5>
                            <ol style="margin: 0; padding-left: 20px;">
                                <li style="margin-bottom: 8px;">Ask it directly and wait for silence</li>
                                <li style="margin-bottom: 8px;">Don't fill the silence with your own thoughts</li>
                                <li style="margin-bottom: 8px;">When someone speaks, listen without interrupting</li>
                                <li style="margin-bottom: 8px;">Thank them for their honesty</li>
                                <li style="margin-bottom: 8px;">Act on what they reveal</li>
                            </ol>
                        </div>
                        
                        <div style="background: #fef5e7; padding: 20px; border-radius: 8px; margin-top: 24px;">
                            <p style="margin: 0; font-weight: 600; color: #2d3748;">
                                <strong>Reality Check:</strong> The silence before someone answers is where truth lives. 
                                If you can't handle 30 seconds of silence, you can't handle the truth.
                            </p>
                        </div>
                    </div>
                `;
                break;
                
            default:
                content = '<p>Question details not found.</p>';
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
            body: '<p>Error loading question details.</p>'
        };
    }
}; 