import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

//signup/signin with google providers
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "email profile",
        },
      },
    }),
  ],
})

export { handler as GET, handler as POST }