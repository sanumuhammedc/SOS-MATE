import Record from "../../../../models/record";
import { connectToDB } from "@utils/database";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { userId, name, document } = req.body;

    // Create a new instance of the Record model
    const newRecord = new Record({ creator: userId, name, document });

    // Save the new record to the database
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Failed to create a new record", error);
    res.status(500).json({ message: "Failed to create a new record" });
  }
}
