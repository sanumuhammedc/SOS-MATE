import User from "@models/user";
import { connectToDB } from "@utils/database";


export const POST = async (request, { params  }) => {
    try {
        await connectToDB()
        const id = params.id

        const user = await User.findOne({
            _id: id
        })


        const data = await request.json()
        user.location = data.location 
        user.booking = data.booking  
        console.log(user)     
        await user.save()

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to  add location", {status: 500})
    }
}