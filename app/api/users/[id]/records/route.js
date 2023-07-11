import Record from "@models/record";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { creator, name, document  } = await request.json();

    try {
        await connectToDB();
        const newRecord = new Record({ creator, name, document });

        await newRecord.save();
        return new Response(JSON.stringify(newRecord), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new record", { status: 500 });
    }
}

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const records = await Record.find({
            creator: params.id
        })

        return new Response(JSON.stringify(records), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch records", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    const {id} = await request.json();

    console.log(id);
  
    try {
      await connectToDB();
  
      await Record.findByIdAndRemove(id);
  
      return new Response("Successfully deleted document", { status: 200 });
    } catch (error) {
      return new Response("Failed to delete record", { status: 500 });
    }
  };
  