import User from "@models/user";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params  }) => {
    try {
        await connectToDB()

        const users = await User.find({
            type: "doctor",
            isOnline: true
        })

        return new Response(JSON.stringify(users), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch Doctors", {status: 500})
    }
}