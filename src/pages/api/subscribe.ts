import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import WelcomeEmail from '../../emails/welcome';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

export const POST: APIRoute = async ({ request }) => {
  const { email, name, country } = await request.json();

  if (!email || !name || !country) {
    return new Response(JSON.stringify({ message: 'Email, name, and country are required' }), {
      status: 400,
    });
  }

  if (!audienceId) {
    console.error('RESEND_AUDIENCE_ID is not configured.');
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
        status: 500,
    });
  }

  try {
    await resend.contacts.create({
      email,
      firstName: name,
      lastName: country,
      audienceId,
      unsubscribed: false,
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Vertix!',
      react: WelcomeEmail({ name }),
    });

    return new Response(
      JSON.stringify({ message: 'Successfully subscribed!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    });
  }
};