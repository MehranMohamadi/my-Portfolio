import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const adminEmail = process.env.ADMIN_EMAIL || 'mehran.mohammadi.frd@gmail.com';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured on the server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message should be at least 10 characters long.' },
        { status: 400 }
      );
    }

    await Promise.all([
      resend.emails.send({
        from: `Portfolio Contact <${resendFromEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong style="color: #3b82f6;">Name:</strong> ${name}</p>
              <p><strong style="color: #3b82f6;">Email:</strong> ${email}</p>
              <p><strong style="color: #3b82f6;">Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                ${message}
              </p>
            </div>

            <p style="color: #666; font-size: 14px;">This message was sent from your portfolio contact form.</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: `Mehran Mohammadi <${resendFromEmail}>`,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>

            <p>Hi ${name},</p>

            <p>Thanks for your message. I received it successfully and will get back to you as soon as possible.</p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Your message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 8px; margin-top: 10px;">${message}</p>
            </div>

            <p>You can also reach me on Telegram: <a href="https://t.me/Mehran_ll" style="color: #3b82f6;">@Mehran_ll</a></p>

            <p>Best regards,<br /><strong>Mehran Mohammadi</strong></p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
