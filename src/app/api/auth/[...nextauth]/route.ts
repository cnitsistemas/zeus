import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/auth/signout",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const payload = {
          email: credentials && credentials.email,
          password: credentials && credentials.password,
        };

        const res = await fetch(
          `https://cnit-homolog.herokuapp.com/api/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      let access_token: unknown = session.user?.access_token;
      access_token = token.accessToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
