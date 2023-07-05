import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    phone: {
        type: Number,
        match: [/^[0-9]{10}$/, "Phone number invalid, it should contain 10 digits!"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    type: {
        type: String,
        enum: ["admin", "user", "doctor", "driver"],
        default: "user",
    },
});

const User = models.User || model("User", UserSchema);

export default User;