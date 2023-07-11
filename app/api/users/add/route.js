import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const user = await request.json();

    try {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return new Response("User already exists", { status: 422 });
        }
        const newUser = new User(user);

        await newUser.save();
        return new Response(JSON.stringify(newUser), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create user", { status: 500 });
    }
}