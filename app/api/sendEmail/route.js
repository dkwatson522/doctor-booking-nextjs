import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import WelcomeEmail from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const response = await req.json();
  const result = response.data;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [response.data.email],
      subject: 'Booking Appointment Confirmation',
      react: WelcomeEmail({response}),
    });
    return NextResponse.json({data});
  }
  catch(error){
    return NextResponse.json(error)
  }
}
