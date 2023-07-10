import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params  }) => {   

    try {
        await connectToDB();
        const existingUser = await User.findOne({ _id: params.id });
        if (!existingUser) {
            return new Response("User does not exist", { status: 422 });
        }
        existingUser.isOnline = false;
        await existingUser.save();
        return new Response(JSON.stringify(existingUser), { status: 201 })

    } catch (error) {
        return new Response("Failed to create user", { status: 500 });
    }
}

export const GET = async (request, { params  }) => {   

    try {
        await connectToDB();
        const existingUser = await User.findOne({ _id: params.id });
        if (!existingUser) {
            return new Response("User does not exist", { status: 422 });
        }
        existingUser.isOnline = true;
        await existingUser.save();
        return new Response(JSON.stringify(existingUser), { status: 201 })

    } catch (error) {
        return new Response("Failed to create user", { status: 500 });
    }
}