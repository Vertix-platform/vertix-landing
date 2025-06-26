import { ActionError, defineAction } from "astro:actions";
import { createUser, getUserByEmail } from '../db/queries';

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

      try {
        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "You're already on our early access list!"
          });
        }

        // Create new user in database
        const user = await createUser(email, name, country);

        return {
          success: true,
          message: 'Successfully joined early access!',
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              country: user.country
            }
          }
        };
      } catch (error) {
        console.error(error);
        if (error instanceof ActionError) {
          throw error;
        }
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. Please try again."
        });
      }
    },
  }),
};