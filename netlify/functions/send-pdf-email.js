const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const formData = JSON.parse(event.body);
    const { name, email, company } = formData;

    // Create transporter (you'll need to configure this in Netlify)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: '"Veritas BS" <reality@veritasbs.co.uk>',
      to: email,
      subject: 'Your Reality Check Guide is Ready! 📚',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0f172a;">Your Reality Check Guide is Ready!</h1>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for downloading the Reality Check Guide! You're about to access 50 pages of actionable frameworks that will transform how you make decisions.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What's Inside Your Guide:</h3>
            <ul>
              <li>📊 Executive Summary</li>
              <li>🎯 Decision Frameworks</li>
              <li>🛡️ Misinformation Detection</li>
              <li>🧠 Cognitive Bias Recognition</li>
              <li>📈 Data Analysis Tools</li>
              <li>✅ Implementation Checklist</li>
            </ul>
          </div>
          
          <p><strong>Download Link:</strong> <a href="https://veritasbs.co.uk/assets/Reality_Check_Guide_Veritas_BS.pdf">Click here to download your guide</a></p>
          
          <p>If the link doesn't work, you can also visit: <a href="https://veritasbs.co.uk/thank-you.html">https://veritasbs.co.uk/thank-you.html</a></p>
          
          <div style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">What's Next?</h4>
            <ol>
              <li>Read the guide (2-3 hours)</li>
              <li>Apply the frameworks to your decisions</li>
              <li>Book a Reality Audit for personalized guidance</li>
            </ol>
          </div>
          
          <p>If you have any questions or need help implementing these frameworks, don't hesitate to reach out.</p>
          
          <p>Best regards,<br>
          The Veritas BS Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #64748b;">
            You received this email because you downloaded the Reality Check Guide. 
            To unsubscribe, reply with "UNSUBSCRIBE" in the subject line.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
}; 