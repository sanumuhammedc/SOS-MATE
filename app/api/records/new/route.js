import Record from "@models/record";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, name, document  } = await request.json();

    try {
        await connectToDB();
        const newRecord = new Record({ creator: userId, name, document });

        await newRecord.save();
        return new Response(JSON.stringify(newRecord), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}