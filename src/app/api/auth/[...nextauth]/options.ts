import dbConnect from '@/lib/dbconnect';
import UserModel from '@/model/User';
import  bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions : NextAuthOptions ={
    providers: [
        CredentialsProvider({
          id: "credentials",
          name: "Credentials",

          credentials: {
            username: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any, req): Promise<any> {
            dbConnect()
            try {
                const user = await UserModel.findOne({
                    $or: [
                        {email : credentials.identifier.email},
                        {usernme : credentials.identifier.username}
                    ]
                })
                if (!user) {
                    throw new Error("Invalid credential!")
                }
                if (!user.isVerified) {
                    throw new Error("Please verify your account!")
                }

                const isValidPassword = await bcrypt.compare(credentials.password , user.password)

                if (isValidPassword) {
                    return user;
                }else{
                    throw new Error("Please verify your account!")
                }

            } catch (error: any) {
                throw new Error(error)
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user}) {
              if(user){
                  token._id = user._id?.toString();
                  token.isVerified = user.isVerified;
                  token.username = user.username;
                }
                return token
            },
        async session({ session,token }) {
            if(token){
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user._id = token._id;
            }
            return session
          },
      },
     pages: {
        signIn: '/signin'
     },
     session: {
        strategy:'jwt'
     },
     secret: process.env.NEXTAUTH_SECRET,
}