import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to yourself (admin notification)
    await resend.emails.send({
      from: 'Contact Form <https://www.mehranmohammadifrd.ir/>', // این رو با دامنه خودت عوض کن
      to: process.env.ADMIN_EMAIL || 'mehran.mohammadi.frd@gmail.com', // ایمیل خودت
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong style="color: #3b82f6;">Name:</strong> ${name}</p>
            <p><strong style="color: #3b82f6;">Email:</strong> ${email}</p>
            <p><strong style="color: #3b82f6;">Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    // Send auto-reply to user
    await resend.emails.send({
      from: 'Mehran Mohamadi', // اسم خودت رو بذار
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Reaching Out! 🚀</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible (usually within 24-48 hours).</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 8px; margin-top: 10px;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to connect with me on:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;">🔗 <a href="https://linkedin.com/in/yourprofile" style="color: #3b82f6;">LinkedIn</a></li>
            <li style="margin: 10px 0;">🐙 <a href="https://github.com/yourusername" style="color: #3b82f6;">GitHub</a></li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Your Name</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0 20px;" />
          <p style="color: #666; font-size: 12px;">This is an automated response. If you need immediate assistance, please contact me directly.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}