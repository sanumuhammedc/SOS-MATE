import { Schema, model, models } from "mongoose";

const RecordSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    document: {
        type: String,
        required: [true, 'Document is required.'],
    }
})

const Record = models.Record || model('Prompt', RecordSchema)
export default Record