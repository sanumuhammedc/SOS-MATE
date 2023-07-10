// api to fetch details of user booked ambulance
import User from "@models/user";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params  }) => {
    try {
        await connectToDB()

        const driver = await User.findOne({
            _id: params.id,
        })

        const user = await User.findOne({
            _id: driver.booking
        })

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch booking", {status: 500})
    }
}

export const PUT = async (request, { params  }) => {
    try {
        await connectToDB()

        const driver = await User.findOne({
            _id: params.id,
        })

        const user = await User.findOne({
            _id: driver.booking
        })

        driver.booking = null
        user.booking = null

        await driver.save()
        await user.save()

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch booking", {status: 500})
    }
}