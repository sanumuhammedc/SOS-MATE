import Record from "@models/record";
import { connectToDB } from "@utils/database";


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Record.findByIdAndRemove(params.doc);

        return new Response("Document deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Document", { status: 500 });
    }
};