// 1.get followers count,follower list, 2. get followings

import { Op } from "sequelize";
import { User , Follow } from "../models/index_model.js"

export const getFollowers = async (req, res) => {
  try {

    const userId = req.user.userId;

    const followers = await Follow.findAll({
      where: {
        followingId: userId,
        status: "accepted"
      },
      include: [
        {
          model: User,
          as: "followerUser",  
          attributes: ["userId", "userName", "email"]
        }
      ]
    });

    res.json({
      followers
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to get followers",
      error: error.message
    });

  }
};



/* GET FOLLOWER COUNT */

export const getFollowerCount = async (req, res) => {

  try {

    const userId = req.user.userId;

    const count = await Follow.count({
      where: {
        followingId: userId,
        status: "accepted"
      }
    });

    res.status(200).json({
      count
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to get follower count",
      error: error.message
    });

  }

};



/* GET FOLLOWINGS LIST */

export const getFollowings = async (req, res) => {

  try {

    const userId = req.user.userId;

    const followings = await Follow.findAll({
      where: {
        followerId: userId,
        status: "accepted"
      },
      include: [
        {
          model: User,
          as: "followingUser",   // ✅ correct alias
          attributes: ["userId", "userName", "email"]
        }
      ]
    });

    res.json({
      followings
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to get followings",
      error: error.message
    });

  }

};



/* GET FOLLOWING COUNT */

export const getFollowingCount = async (req, res) => {

  try {

    const userId = req.user.userId;

    const count = await Follow.count({
      where: {
        followerId: userId,
        status: "accepted"
      }
    });

    res.status(200).json({
      count
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to get following count",
      error: error.message
    });

  }

};



/* GET ALL USERS */

export const getAllUser = async (req, res) => {

  try {

    const userId = req.user.userId;

    const users = await User.findAll({
      where: {
        userId: {
          [Op.ne]: userId
        }
      },
      attributes: {
        exclude: ["password"]
      }
    });

    res.status(200).json({
      users
    });

  } catch (error) {

    res.status(500).json({
      message: "Unable to get users",
      error: error.message
    });

  }

};