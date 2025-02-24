import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import db from "@/app/db";
import { Keypair } from "@solana/web3.js";

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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account?.provider === 'google'){
        // save user data in your database
        const email = user.email
        if(!email){
          return false;
        }
        const userDB = await db.user.findFirst({
          where: { 
            username: email
           },
        })
        if(userDB){
          return true;
        }
        
        const keypair  = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;
        
        await db.user.create({
          data: {
            username: email,
            name: profile?.name,
            profilePicture: profile?.picture ?? null,
            provider: "Google",
            solWallet:{
              create:{
                publicKey:publicKey,
                privateKey: privateKey.toString(),
              }
            },
            inrWallet:{
              create:{
                balance:0
              }
            }
          },
        })
         return true;
      }
      return false;
    },
  },
})

export { handler as GET, handler as POST }