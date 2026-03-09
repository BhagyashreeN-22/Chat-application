// import { User } from "./user/user_model.js";
// import { Msg } from "./msg/msg_model.js";
// import { Follow } from "./follow/follow_model.js";

// User.hasMany(Follow,{
//     foreignKey:"followingId",
//     as:"Follower"
// });

// Follow.belongsTo(User,{
//     foreignKey:"followingId",
//     as:"userFollowers"
// })

// User.hasMany(Follow,{
//     foreignKey:"followerId",
//     as:"Following"
// });

// Follow.belongsTo(User,{
//     foreignKey:"followerId",
//     as:"userFollowings"
// })

// User.hasMany(Msg,{
//     foreignKey:"senderId",
//     as:"sends"
// });

// Msg.belongsTo(User,{
//     foreignKey:"senderId",
//     as:"msgSender"
// })

// User.hasMany(Msg,{
//     foreignKey:"receiverId",
//     as:"receives"
// });
// Msg.belongsTo(User,{
//     foreignKey:"receiverId",
//     as:"msgReceiver"
// });


// export {
//     User,
//     Msg,
//     Follow
// }

///===================================
import { User } from "./user/user_model.js";
import { Msg } from "./msg/msg_model.js";
import { Follow } from "./follow/follow_model.js";

/* FOLLOW RELATIONSHIPS */

// users who follow this user
User.hasMany(Follow, {
  foreignKey: "followingId",
  as: "followers"
});

Follow.belongsTo(User, {
  foreignKey: "followingId",
  as: "followingUser"
});

// users this user follows
User.hasMany(Follow, {
  foreignKey: "followerId",
  as: "followings"
});

Follow.belongsTo(User, {
  foreignKey: "followerId",
  as: "followerUser"
});


/* MESSAGE RELATIONSHIPS */

// messages sent
User.hasMany(Msg, {
  foreignKey: "senderId",
  as: "sentMessages"
});

Msg.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender"
});

// messages received
User.hasMany(Msg, {
  foreignKey: "receiverId",
  as: "receivedMessages"
});

Msg.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver"
});

export {
  User,
  Msg,
  Follow
};
