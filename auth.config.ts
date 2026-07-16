import type { NextAuthConfig } from "next-auth";


export default {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [],

  callbacks: {

    authorized({ auth }) {
      return !!auth?.user;
    },

  },

} satisfies NextAuthConfig;