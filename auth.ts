import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // check if user exists and password is correct
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Map the token data to the session object
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;
      // If there is an update, set the name on the session
      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }
      // Return the updated session object
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        token.role = user.role;

        // If user has no name, use email as their default name
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // Update the user in the database with the new name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // Handle session updates (e.g., name change)
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    authorized({ request, auth }: any) {
      // Check for cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // Generate cart cookie
        // const sessionCartId = crypto.randomUUID();

        // // Clone the request headers
        // const newRequestHeaders = new Headers(request.headers);

        // // Create a new response and add the new headers
        // const response = NextResponse.next({
        //   request: {
        //     headers: newRequestHeaders,
        //   },
        // });

        // // Set the newly generated sessionCartId in the response cookie
        // response.cookies.set("sessionCartId", sessionCartId);

        // // Return the response with the sessionCartId set
        // return response;
        return true;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
