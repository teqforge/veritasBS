const nodemailer = require('nodemailer');

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
    let formData = {};
    
    // Handle different content types
    if (event.headers['content-type'] && event.headers['content-type'].includes('application/json')) {
      // JSON data
      formData = JSON.parse(event.body);
    } else {
      // Form data - parse URL encoded or multipart
      const querystring = require('querystring');
      formData = querystring.parse(event.body);
    }

    const { guide, source, email } = formData;

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Email address is required.</p>'
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html' },
        body: '<p style="color: #e53e3e; text-align: center;">Please enter a valid email address.</p>'
      };
    }

    // Store the lead
    const leadData = {
      email,
      guide,
      source,
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'
    };

    try {
      // Store lead in database
      const response = await fetch(`${process.env.URL || 'https://veritasbs.co.uk'}/.netlify/functions/store-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Lead stored successfully:', result);
      } else {
        console.error('Failed to store lead:', response.status);
      }
    } catch (leadError) {
      console.error('Error storing lead:', leadError);
      // Continue with email sending even if lead storage fails
    }

    // Send email with PDF attachment
    try {
      await sendPDFEmail(email, source);
      
      const successResponse = `
        <div style="background: #f0fff4; border: 2px solid #38a169; border-radius: 8px; padding: 20px; color: #2d3748; text-align: center;">
          <h4 style="color: #38a169; margin-bottom: 12px;">✅ Guide Sent!</h4>
          <p style="margin-bottom: 12px;">Check your email for "Reality-Check-Methodology-Guide.pdf"</p>
          <p style="font-size: 14px; color: #718096; margin-bottom: 16px;">
            📧 You'll also receive weekly Reality Check tips and insights.
          </p>
          <div style="background: #f7fafc; padding: 16px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 0; font-size: 14px; color: #4a5568;">
              <strong>Next steps:</strong><br>
              1. Download the guide from your email<br>
              2. Read the methodology<br>
              3. Start your first Reality Check this Thursday
            </p>
          </div>
        </div>
      `;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: successResponse
      };

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still capture the lead even if email fails
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: `
          <div style="background: #fef5e7; border: 2px solid #d69e2e; border-radius: 8px; padding: 20px; color: #2d3748; text-align: center;">
            <h4 style="color: #d69e2e; margin-bottom: 12px;">⚠️ Email Issue</h4>
            <p style="margin-bottom: 12px;">We've captured your email but had trouble sending the guide.</p>
            <p style="font-size: 14px; color: #718096;">
              We'll send you the guide manually within 24 hours.
            </p>
          </div>
        `
      };
    }

  } catch (error) {
    console.error('Error processing download:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: '<p style="color: #e53e3e; text-align: center;">Something went wrong. Please try again.</p>'
    };
  }
};

async function sendPDFEmail(email, source) {
  // Configure email transporter for Microsoft 365
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  // Email content
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'reality@veritasbs.co.uk',
    to: email,
    subject: 'Your Reality Check Methodology Guide',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1B4D3E;">Your Reality Check Guide is Ready</h2>
        
        <p>Hi there,</p>
        
        <p>Thanks for your interest in preventing project disasters. Your Reality Check Methodology Guide is attached to this email.</p>
        
        <div style="background: #f0fff4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #38a169; margin-top: 0;">What's in the guide:</h3>
          <ul style="color: #2d3748;">
            <li>Complete 50-page methodology</li>
            <li>Meeting templates and checklists</li>
            <li>Real case studies and examples</li>
            <li>Implementation timeline</li>
            <li>Success indicators and warning signs</li>
          </ul>
        </div>
        
        <p><strong>Next steps:</strong></p>
        <ol style="color: #2d3748;">
          <li>Download the PDF attachment</li>
          <li>Read through the methodology</li>
          <li>Schedule your first Reality Check meeting</li>
          <li>Start preventing disasters this Thursday</li>
        </ol>
        
        <p>You'll also receive weekly Reality Check tips and insights to help you implement the methodology effectively.</p>
        
        <p>Best regards,<br>
        The Veritas BS Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #718096;">
          You received this email because you requested the Reality Check Methodology Guide from ${source || 'our website'}. 
          You can unsubscribe from future emails at any time.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: 'Reality-Check-Methodology-Guide.pdf',
        path: './web/assets/Reality_Check_Guide_Veritas_BS.pdf'
      }
    ]
  };

  return transporter.sendMail(mailOptions);
} 