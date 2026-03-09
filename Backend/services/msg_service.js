// 1. Send Message
// 2. Get All Messages

import { Msg } from "../models/msg/msg_model.js";
import { User } from "../models/user/user_model.js";


export const sendMsg = async (req, res) => {

  try {

    const { context } = req.body;
    const senderId = req.user.userId;
    const receiverId = req.params.id;

    if (!context) {
      return res.status(400).json({
        message: "Message required"
      });
    }

    const msgRecord = await Msg.create({
      senderId,
      receiverId,
      context
    });

    res.status(200).json({
      message: "Message sent successfully",
      msgRecord
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to send message",
      error: error.message
    });

  }

};


export const getAllMsg = async (req, res) => {

  try {

    const userId = req.user.userId;

    const userMsg = await Msg.findAll({

      where: {
        receiverId: userId
      },

      include: [
        {
          model: User,
          as: "sender",      
          attributes: ["userId", "userName"]
        }
      ],

      order: [["createdAt", "DESC"]]

    });

    res.status(200).json(userMsg);

  } catch (error) {

    res.status(500).json({
      message: "Unable to get messages",
      error: error.message
    });

  }

};