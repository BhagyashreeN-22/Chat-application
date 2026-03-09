/*
1. Send follow request
2. Accept follow request
3. Get pending requests
*/

import { User, Follow } from "../models/index_model.js";


/* SEND FOLLOW REQUEST */

export const sendReq = async (req, res) => {
  try {

    const userId = req.user.userId;
    const sentTo = req.params.id;

    if (!sentTo) {
      return res.status(400).json({
        message: "User ID required"
      });
    }

    if (userId === sentTo) {
      return res.status(400).json({
        message: "You cannot follow yourself"
      });
    }

    const existing = await Follow.findOne({
      where: {
        followerId: userId,
        followingId: sentTo
      }
    });

    if (existing) {
      return res.status(400).json({
        message: "Request already sent"
      });
    }

    const followRecord = await Follow.create({
      followerId: userId,
      followingId: sentTo,
      status: "pending"
    });

    return res.status(201).json({
      message: "Request sent successfully",
      followRecord
    });

  } catch (error) {

    return res.status(500).json({
      message: "Request Failed",
      error: error.message
    });

  }
};



/* ACCEPT FOLLOW REQUEST */

export const acceptReq = async (req, res) => {

  try {

    const userId = req.user.userId;
    const senderId = req.params.id;

    const request = await Follow.findOne({
      where: {
        followerId: senderId,
        followingId: userId,
        status: "pending"
      }
    });

    if (!request) {
      return res.status(404).json({
        message: "Follow request not found"
      });
    }

    await request.update({
      status: "accepted"
    });

    return res.status(200).json({
      message: "Request Accepted"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Request Failed",
      error: error.message
    });

  }

};



/* GET PENDING REQUESTS */

export const getPendingReq = async (req, res) => {

  try {

    const userId = req.user.userId;

    const requests = await Follow.findAll({
      where: {
        followingId: userId,
        status: "pending"
      },
      include: [
        {
          model: User,
          as: "followerUser",   // must match association alias
          attributes: ["userId", "userName"]
        }
      ]
    });
    console.log(requests)
    return res.status(200).json(requests);

  } catch (error) {

    return res.status(500).json({
      message: "Unable to fetch requests",
      error: error.message
    });

  }

};