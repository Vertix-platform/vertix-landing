import { ActionError, defineAction } from "astro:actions";
import { Resend } from 'resend';
import WelcomeEmail from '../emails/welcome';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

export const server = {
  subscribe: defineAction({
    accept: "form",
    handler: async (formData) => {
      const email = formData.get('email') as string;
      const name = formData.get('name') as string;
      const country = formData.get('country') as string;

      if (!email || !name || !country) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Email, name, and country are required"
        });
      }

      if (!audienceId) {
        console.error('RESEND_AUDIENCE_ID is not configured.');
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong."
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

        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Welcome to Vertix!',
          react: WelcomeEmail({ name }),
        });

        if (error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        }

        return {
          success: true,
          message: 'Successfully subscribed!',
          data
        };
      } catch (error) {
        console.error(error);
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong."
        });
      }
    },
  }),
};