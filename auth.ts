import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

import authConfig from "./auth.config";


export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,

  providers: [

    Credentials({

      credentials: {

        email: {},
        password: {},

      },


      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {

          return null;

        }


        const user =
          await prisma.user.findUnique({

            where: {
              email:
                credentials.email as string,
            },

          });


        if (!user) {
          return null;
        }


        const passwordMatch =
          await bcrypt.compare(
            credentials.password as string,
            user.password
          );


        if (!passwordMatch) {
          return null;
        }


        return {

          id: String(user.id),
          name: user.name,
          email: user.email,
        };

      },

    }),

  ],

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },


    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },

  },

});