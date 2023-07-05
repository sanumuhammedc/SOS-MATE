import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
    
            session.user.id = sessionUser._id.toString();
            session.user.type = sessionUser.type;
            session.user.username = sessionUser.username;
            session.user.image = sessionUser.image;
            session.user.phone = sessionUser.phone? sessionUser.phone : null;
            return session;
        },
        async signIn({ profile }) {
            await connectToDB();
    
            const userExists = await User.findOne({ email: profile.email });
            console.log(profile)

            const phone = profile.phone ? profile.phone : null;

    
            if(!userExists) {
                await User.create({
                    email: profile.email,
                    name: profile.name,
                    username: profile.name.replace(/ /g, '').toLowerCase(),
                    phone: phone,
                    image: profile.picture,
                });
            }
            return true
        }
    }
        
})

export { handler as GET, handler as POST };