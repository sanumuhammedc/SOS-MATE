import { GitHub } from "@mui/icons-material";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers:[
        //google provider
        GoogleProvider({
            clientid:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        
    ],
    secret:process.env.JWT_SECRET
});