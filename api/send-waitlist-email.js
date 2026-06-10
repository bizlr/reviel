import nodemailer from 'nodemailer';

// Transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: 'resend',
    pass: 're_doCkbZmQ_KnV1F1vtsWRScXdmamZU3fqQ',
  },
});

export default async function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstname, email, referralCode } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // HTML Email Template matching the provided design
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Reviel</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f7f5f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #2D3142;
          }
          .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f7f5f0;
            padding-bottom: 40px;
          }
          .main-table {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            background-color: #fcfbfa;
            border-collapse: collapse;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          }
          .header-banner-fallback {
            background: linear-gradient(180deg, #b0c4de 0%, #4a708b 100%);
            padding: 45px 20px;
            text-align: center;
          }
          .content-padding {
            padding: 40px 35px 30px 35px;
          }
          .section-tag {
            color: #c5a880;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          .headline {
            color: #1a2a3a;
            font-family: "EB Garamond", Garamond, serif;
            font-size: 26px;
            line-height: 1.3;
            margin: 0 0 24px 0;
            font-weight: normal;
          }
          .body-text {
            font-size: 14px;
            line-height: 1.6;
            color: #4f566b;
            margin: 0 0 20px 0;
          }
          .divider {
            border: 0;
            border-top: 1px solid #eef0f2;
            margin: 30px 0;
          }
          .sub-section-tag {
            color: #1a2a3a;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 12px;
          }
          .sub-body-text {
            font-size: 12px;
            line-height: 1.6;
            color: #697386;
            text-align: center;
            margin: 0 0 16px 0;
          }
          .link-container {
            text-align: center;
            margin-bottom: 30px;
          }
          .share-link {
            color: #c5a880;
            font-size: 13px;
            text-decoration: underline;
            font-weight: 500;
          }
          .signature {
            font-size: 14px;
            color: #4f566b;
            margin-top: 20px;
          }
          .signature-names {
            font-family: "EB Garamond", Garamond, serif;
            font-size: 20px;
            font-style: italic;
            color: #1a2a3a;
            margin: 4px 0 0 0;
          }
          .footer-section {
            background-color: #f1ede6;
            padding: 30px 20px;
            text-align: center;
          }
          .footer-logo {
            font-family: "EB Garamond", Garamond, serif;
            font-size: 20px;
            font-style: italic;
            color: #697386;
            margin: 0 0 8px 0;
          }
          .footer-location {
            font-size: 11px;
            color: #8792a2;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
          }
          .footer-links {
            font-size: 11px;
            color: #8792a2;
          }
          .footer-links a {
            color: #8792a2;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <center class="wrapper">
          <table class="main-table" role="presentation">
            <tr>
              <td class="header-banner-fallback">
                <img src="https://launch.reviel.app/logo_reviel.png" alt="Reviel" style="max-height: 48px; width: auto; vertical-align: middle; filter: brightness(0) invert(1);" />
              </td>
            </tr>
            <tr>
              <td class="content-padding">
                <div class="section-tag">You're on the list</div>
                <h2 class="headline">Thank you for trusting us with this.</h2>
                
                <p class="body-text">
                  Reviel is being built slowly, with care. We'll open access in waves — quietly, so the experience stays grounded.
                </p>
                <p class="body-text">
                  You'll hear from us occasionally between now and then. Never noise. Only what matters.
                </p>
                
                <hr class="divider" />
                
                <div class="sub-section-tag">Carry someone with you</div>
                <p class="sub-body-text">
                  If there's someone in your life carrying weight quietly, share Reviel with them. They'll arrive in the same wave you do.
                </p>
                <div class="link-container">
                  <a href="https://launch.reviel.app/share?ref=${referralCode || ''}" class="share-link" target="_blank">launch.reviel.app/share</a>
                </div>
                
                <div class="signature">
                  With care,<br />
                  <div class="signature-names">Tobi & Tomide</div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer-section">
                <div class="footer-logo">Reviel</div>
                <div class="footer-location">Orlando &middot; Indianapolis</div>
                <div class="footer-links">
                  <a href="https://launch.reviel.app/unsubscribe" target="_blank">unsubscribe</a> &middot; 
                  <a href="https://launch.reviel.app/privacy" target="_blank">privacy</a>
                </div>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Reviel" <hello@reviel.app>',
      to: email,
      subject: "You're on the list. Welcome to Reviel",
      html: htmlContent,
    });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer serverless error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
