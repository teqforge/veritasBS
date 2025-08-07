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
        const serviceType = event.queryStringParameters?.service || event.path.split('/').pop();
        
        let content = '';
        
        switch(serviceType) {
            case 'guide':
                content = `
                    <div class="service-card featured">
                        <div class="service-header">
                            <h3>The Reality Check Guide</h3>
                            <div class="service-price">Free</div>
                            <p class="service-tagline">Start preventing disasters this Thursday</p>
                        </div>
                        
                        <div class="service-details">
                            <ul class="service-features">
                                <li>Complete 50-page methodology guide</li>
                                <li>Meeting templates and checklists</li>
                                <li>Real case studies and examples</li>
                                <li>Implementation timeline</li>
                                <li>Success indicators and warning signs</li>
                            </ul>
                            
                            <div class="service-outcome">
                                <strong>Outcome:</strong> Your team can start running Reality Checks immediately
                            </div>
                        </div>
                        
                        <div class="service-cta">
                            <form hx-post="/download-guide" hx-target="#guide-result" class="download-form">
                                <input type="hidden" name="guide" value="reality-check-methodology">
                                <input type="hidden" name="source" value="service-details">
                                <div class="email-input-group">
                                    <input type="email" name="email" placeholder="Enter your email address" required 
                                           style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 6px; margin-bottom: 12px; font-size: 16px;">
                                </div>
                                <button type="submit" class="cta-primary">
                                    <span class="cta-text">Download Free Guide</span>
                                    <span class="cta-subtext">Free • Delivered to your inbox</span>
                                </button>
                            </form>
                            <div id="guide-result" class="service-feedback"></div>
                        </div>
                    </div>
                `;
                break;
                
            case 'implementation':
                content = `
                    <div class="service-card">
                        <div class="service-header">
                            <h3>Implementation Support</h3>
                            <div class="service-price">£2,000<span style="font-size: 16px; font-weight: 400;">/month</span></div>
                            <p class="service-tagline">External facilitation for systematic truth-telling</p>
                        </div>
                        
                        <div class="service-details">
                            <ul class="service-features">
                                <li>We facilitate your first 12 Reality Check sessions</li>
                                <li>External voice asks what your team won't</li>
                                <li>3-month minimum commitment</li>
                                <li>Weekly 30-minute sessions</li>
                                <li>Implementation guidance and templates</li>
                            </ul>
                            
                            <div class="service-outcome">
                                <strong>Outcome:</strong> Methodology embedded with external facilitation to ensure honesty
                            </div>
                            
                            <div class="service-guarantee">
                                <strong>Guarantee:</strong> If no valuable truths surface in first month, we refund and help you understand why
                            </div>
                        </div>
                        
                        <div class="service-cta">
                            <button class="cta-secondary" 
                                    hx-post="/contact" 
                                    hx-target="#contact-result"
                                    hx-vals='{"interest": "implementation"}'>
                                Book Discovery Call
                            </button>
                        </div>
                    </div>
                `;
                break;
                
            case 'training':
                content = `
                    <div class="service-card">
                        <div class="service-header">
                            <h3>Team Training</h3>
                            <div class="service-price">£5,000<span style="font-size: 16px; font-weight: 400;"> one-time</span></div>
                            <p class="service-tagline">Build psychological safety and truth-telling culture</p>
                        </div>
                        
                        <div class="service-details">
                            <ul class="service-features">
                                <li>2-day intensive workshop for your team</li>
                                <li>Practice sessions with real scenarios</li>
                                <li>Psychological safety assessment</li>
                                <li>Custom templates for your industry</li>
                                <li>6 months of email support</li>
                            </ul>
                            
                            <div class="service-outcome">
                                <strong>Outcome:</strong> Team develops the skills and confidence to surface uncomfortable truths
                            </div>
                            
                            <div class="service-guarantee">
                                <strong>Guarantee:</strong> If your team doesn't feel more comfortable speaking up after training, we'll work with you until they do
                            </div>
                        </div>
                        
                        <div class="service-cta">
                            <button class="cta-secondary" 
                                    hx-post="/contact" 
                                    hx-target="#contact-result"
                                    hx-vals='{"interest": "training"}'>
                                Book Training Session
                            </button>
                        </div>
                    </div>
                `;
                break;
                
            default:
                content = '<p>Service details not found.</p>';
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
            body: '<p>Error loading service details.</p>'
        };
    }
}; 