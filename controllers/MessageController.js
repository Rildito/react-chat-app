import { response } from "express"
import { Message } from "../models/Message.js"
import { mkdirSync, renameSync } from "fs"

export const getMessages = async (req, res) => {
    try {
        const userOne = req.userId
        const userTwo = req.body.id

        if (!userOne || !userTwo) {
            return response.status(400).send("Both user ID's are required.")
        }

        const messages = await Message.find({ //TODO: Revisar codigo
            $or: [
                { sender: userOne, recipient: userTwo },
                { sender: userTwo, recipient: userOne },
            ]
        }).sort({ timestamp: 1 })

        return res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
        return response.status(500).send("Internal server error")
    }
}

export const uploadFile = async (req, res) => {//TODO revisar codigo
    try {
        if (!req.file) {
            return response.status(400).send("File is required")
        }
        const date = Date.now()
        let fileDir = `uploads/files/${date}`
        let fileName = `${fileDir}/${req.file.originalname}`
        mkdirSync(fileDir, {recursive:true})
        renameSync(req.file.path, fileName)
        return res.status(200).json({ filePath: fileName })
    } catch (error) {
        console.log(error)
        return response.status(500).send("Internal server error")
    }
}