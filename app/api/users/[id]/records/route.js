import Record from "@models/record";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params  }) => {
    try {
        await connectToDB()

        const records = await Record.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(records), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}