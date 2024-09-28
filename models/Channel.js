import mongoose from "mongoose";


const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{type: mongoose.Schema.ObjectId, ref: "User", required: true}],
    admin: [{type: mongoose.Schema.ObjectId, ref: "User", required: true}],
    messages: [
        {type:mongoose.Schema.ObjectId, ref: "Message", required: false}
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}) 

channelSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

channelSchema.pre("findOneAndUpdate", function (next) { //TODO: Revisar codigo.
    this.set({updatedAt : Date.now()})
    next()
})

export const Channel = mongoose.model("Channel", channelSchema)