// api to fetch details of user booked Doctor
import User from "@models/user";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params  }) => {
    try {
        await connectToDB()

        const doctor = await User.findOne({
            _id: params.id,
        })

        const user = await User.findOne({
            _id: doctor.booking
        })

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch booking", {status: 500})
    }
}

export const PUT = async (request, { params  }) => {
    try {
        await connectToDB()

        const doctor = await User.findOne({
            _id: params.id,
        })

        const user = await User.findOne({
            _id: doctor.booking
        })

        doctor.booking = null
        user.booking = null

        await driver.save()
        await user.save()

        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch booking", {status: 500})
    }
}