import { useState, useEffect } from "react";
import axios from "axios";

import { followerCount, followingCount } from "../helpers/count";
import { followersList, followingsList } from "../helpers/list";
import { sendMessageAPI } from "../helpers/message";
import { getAllUsersAPI } from "../helpers/user";
import { sendFollowRequestAPI } from "../helpers/follow";

import "../pages_css/profile_page_css.css";

const ProfilePage = () => {

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const [countFollowers, setCountFollowers] = useState(0);
  const [countFollowings, setCountFollowings] = useState(0);

  const [listFollowers, setListFollowers] = useState([]);
  const [listFollowings, setListFollowings] = useState([]);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const [messages, setMessages] = useState({});
  const [replyMsgs, setReplyMsgs] = useState({});

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [req, setReq] = useState(false);

  const [requests , setrequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  const [status,setStatus]=useState(false);

  const [msgs,setMsgs] = useState([]);
  const [showMsgs,setShowMsgs]  = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const followersCountData = await followerCount(token);
        const followingsCountData = await followingCount(token);

        setCountFollowers(followersCountData);
        setCountFollowings(followingsCountData);

        const followers = await followersList(token);
        const followings = await followingsList(token);

        setListFollowers(followers);
        setListFollowings(followings);

      } catch (error) {
        alert("Unable to fetch profile data");
      }

    };

    fetchData();

  }, [token]);


  const handleMessageChange = (receiverId, value) => {

    setMessages((prev) => ({
      ...prev,
      [receiverId]: value
    }));

  };

  const handleReplyChange = (senderId, value) => {

    setReplyMsgs((prev)=>({
      ...prev,
      [senderId]:value
    }));

  };

  const sendMessage = async (receiverId) => {

    try {

      const context = messages[receiverId] || replyMsgs[receiverId];

      if (!context) {
        alert("Please type a message first");
        return;
      }

      await sendMessageAPI(receiverId, context, token);

      alert("Message Sent");

      setMessages((prev) => ({
        ...prev,
        [receiverId]: ""
      }));

      setReplyMsgs((prev)=>({
        ...prev,
        [receiverId]:""
      }));

    } catch (error) {
      alert("Message failed");
    }

  };


  const getAllUsers = async () => {

    try {

      const data = await getAllUsersAPI(token);

      setUsers(data);
      setShowUsers(!showUsers);

    } catch (error) {
      alert("Unable to fetch users");
    }

  };


  const sendReq = async (followingId) => {

    try {

      await sendFollowRequestAPI(followingId, token);
      setReq(true);

    } catch (error) {
      alert("Request failed");
    }

  };
  

  const getAllPendingReq = async ()=>{

   try{

    const response = await axios.get(
      "http://localhost:5000/req/requests",
      {
        headers:{
          authorization:`Bearer ${token}`
        }
      }
    );

    setrequests(response.data);
    setShowRequests(!showRequests);

   }catch(error){

    alert("Unable to fetch requests");

   }

  };


  const accept = async (id)=>{

    try{

      await axios.put(
        `http://localhost:5000/req/acceptreq/${id}`,
        {},
        {
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );

      setStatus(true);

    }catch(error){

      alert("Unable to accept req");

    }

  };


  const getAllmsg = async()=>{

    try{

      const response = await axios.get(
        `http://localhost:5000/msg/getallmsg`,
        {
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );
      setMsgs(response.data);
      setShowMsgs(!showMsgs);

    }catch(error){

      alert("Unable to get Msgs");

    }

  };

  return (

  <div className="profile-page">

    <h1>Hi.. Welcome {userName}</h1>


    {/* Followers Count */}
    <div onClick={() => setShowFollowers(!showFollowers)}>
      Followers: {countFollowers}
    </div>


    {/* Followings Count */}
    <div onClick={() => setShowFollowings(!showFollowings)}>
      Followings: {countFollowings}
    </div>


    {/* Followers List */}
    {showFollowers && (

      <div>

        <h2>Followers</h2>

        {listFollowers?.map((follower) => {

          const receiverId = follower.followerUser?.userId;

          return (

            <div key={follower.uniqueId}>

              <span>{follower.followerUser?.userName}</span>

              <input
                type="text"
                placeholder="Type message"
                value={messages[receiverId] || ""}
                onChange={(e) =>
                  handleMessageChange(receiverId, e.target.value)
                }
              />

              <button onClick={() => sendMessage(receiverId)}>
                Send Message
              </button>

            </div>

          );

        })}

      </div>

    )}


    {/* Followings List */}
    {showFollowings && (

      <div>

        <h2>Followings</h2>

        {listFollowings?.map((following) => {
         
          const receiverId = following.followingUser?.userId;

          return (

            <div key={following.uniqueId}>

              <span>{following.followingUser?.userName}</span>

              <input
                type="text"
                placeholder="Type message"
                value={messages[receiverId] || ""}
                onChange={(e) =>
                  handleMessageChange(receiverId, e.target.value)
                }
              />

              <button onClick={() => sendMessage(receiverId)}>
                Send Message
              </button>

            </div>

          );

        })}

      </div>

    )}


    {/* All Users */}
    <button onClick={getAllUsers}>
      See All Users
    </button>

    {showUsers && users.map(user => (

      <div key={user.userId}>

        <h3>{user.userName}</h3>

        <input
          type="text"
          placeholder="type message"
          value={messages[user.userId] || ""}
          onChange={(e)=>handleMessageChange(user.userId,e.target.value)}
        />

        <button onClick={()=>sendMessage(user.userId)}>
          Send Message
        </button>

        <button onClick={()=>sendReq(user.userId)}>
          Send Request
        </button>

      </div>

    ))}


    {req && (
      <h3>Request sent successfully</h3>
    )}


    {/* Pending Requests */}
    <button className="see_req" onClick={getAllPendingReq}>
      View Requests
    </button>

    {showRequests && requests.map(req => (

      <div key={req.uniqueId}>
        <h3>{req.followerUser?.userName}</h3>

        <button onClick={()=>accept(req.followerUser?.userId)}>
          Accept
        </button>

      </div>

    ))}


    {status && (
      <h1>Request Accepted Successfully</h1>
    )}


    {/* Messages */}
    <button className="see_msg" onClick={getAllmsg}>
      View All Messages
    </button>


    {showMsgs && msgs?.length === 0 && (
      <p>No messages</p>
    )}


    {showMsgs && msgs.map((req)=>(

      <div key={req.msgId}>

        <h3>From: {req.sender?.userName}</h3>

        <p>Message: {req.context}</p>

        <input
          type="text"
          placeholder="Type reply..."
          value={replyMsgs[req.senderId] || ""}
          onChange={(e)=>handleReplyChange(req.senderId, e.target.value)}
        />

        <button onClick={()=>sendMessage(req.senderId)}>
          Reply
        </button>

      </div>

    ))}

  </div>

);

};

export default ProfilePage;


// import { useState, useEffect } from "react";

// import { followerCount, followingCount } from "../helpers/count";
// import { followersList, followingsList } from "../helpers/list";
// import { sendMessageAPI } from "../helpers/message";
// import { getAllUsersAPI } from "../helpers/user";
// import { sendFollowRequestAPI } from "../helpers/follow";
// import "../pages_css/profile_page_css.css"

// const ProfilePage = () => {

//   const token = localStorage.getItem("token");
//   const userName = localStorage.getItem("userName");

//   const [countFollowers, setCountFollowers] = useState(0);
//   const [countFollowings, setCountFollowings] = useState(0);

//   const [listFollowers, setListFollowers] = useState([]);
//   const [listFollowings, setListFollowings] = useState([]);

//   const [showFollowers, setShowFollowers] = useState(false);
//   const [showFollowings, setShowFollowings] = useState(false);

//   const [messages, setMessages] = useState({});

//   const [users, setUsers] = useState([]);
//   const [showUsers, setShowUsers] = useState(false);

//   const [req, setReq] = useState(false);

//   const [requests , setrequests] = useState([]);
//   const [showRequests, setShowRequests] = useState(false);

//   const [status,setStatus]=useState(false);

//   const [msg,setMsgs] = useState([]);
//   const [showMsgs,setShowMsgs]  = useState(false);
//   useEffect(() => {

//     const fetchData = async () => {

//       try {

//         const followersCountData = await followerCount(token);
//         const followingsCountData = await followingCount(token);

//         setCountFollowers(followersCountData);
//         setCountFollowings(followingsCountData);

//         const followers = await followersList(token);
//         const followings = await followingsList(token);

//         setListFollowers(followers);
//         setListFollowings(followings);

//       } catch (error) {
//         alert("Unable to fetch profile data");
//       }

//     };

//     fetchData();

//   }, [token]);



//   const handleMessageChange = (receiverId, value) => {

//     setMessages((prev) => ({
//       ...prev,
//       [receiverId]: value
//     }));

//   };



//   const sendMessage = async (receiverId) => {

//     try {

//       const context = messages[receiverId];

//       if (!context) {
//         alert("Please type a message first");
//         return;
//       }

//       await sendMessageAPI(receiverId, context, token);

//       alert("Message Sent");

//       setMessages((prev) => ({
//         ...prev,
//         [receiverId]: ""
//       }));

//     } catch (error) {
//       alert("Message failed");
//     }

//   };



//   const getAllUsers = async () => {

//     try {

//       const data = await getAllUsersAPI(token);

//       setUsers(data);
//       setShowUsers(!showUsers);

//     } catch (error) {
//       alert("Unable to fetch users");
//     }

//   };



//   const sendReq = async (followingId) => {

//     try {
//       console.log(followingId)
//       await sendFollowRequestAPI(followingId, token);

//       setReq(true);

//     } catch (error) {
//       alert("Request failed");
//     }

//   };
  
//   const getAllPendingReq = async ()=>{
//    try{
//     const response = await axios.get("http://localhost:5000/req/requests",{
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     });
//     setrequests(response.data);
//     setShowRequests(!showRequests);
//    }catch(error){
//     alert("Unable to fetch requests");
//    }
//   }

//   const accept = async (id)=>{
//     try{
//       const response = await axios.put(`http://localhost:5000/req/acceptreq/${id}`,{
//         headers:{
//           authorization:`Bearer ${token}`
//         }
//       })
//       setStatus(!status);
//     }catch(error){
//       alert("Unable to accept req ",error);
//     }
//   }

//   const getAllmsg = async()=>{
//     try{
//       const response = await axios.get(`http://localhost:5000/msg/getallmsg`,{
//         headers:{
//           authorization:`Bearer ${token}`
//         }
//       });
//       setMsgs(response);
//       setShowMsgs(!showMsgs);
//     }catch(error){
//       alert("Unable to get Msgs");
//     }
//   }



//   return (

//     <div className="profile-page">

//       <h1>Hi.. Welcome {userName}</h1>



//       <div onClick={() => setShowFollowers(!showFollowers)}>
//         Followers: {countFollowers}
//       </div>



//       <div onClick={() => setShowFollowings(!showFollowings)}>
//         Followings: {countFollowings}
//       </div>



// {/* Followers */}

//       {showFollowers && (

//         <div>

//           <h2>Followers</h2>

//           {listFollowers.map((follower) => {

//             const receiverId = follower.userFollowers?.userId;

//             return (

//               <div key={follower.uniqueId}>

//                 <span>{follower.userFollowers?.userName}</span>

//                 <input
//                   type="text"
//                   placeholder="Type message"
//                   value={messages[receiverId] || ""}
//                   onChange={(e) =>
//                     handleMessageChange(receiverId, e.target.value)
//                   }
//                 />

//                 <button onClick={() => sendMessage(receiverId)}>
//                   Send Message
//                 </button>

//               </div>

//             );

//           })}

//         </div>

//       )}



// {/* Followings */}

//       {showFollowings && (

//         <div>

//           <h2>Followings</h2>

//           {listFollowings.map((following) => {

//             const receiverId = following.userFollowings?.userId;

//             return (

//               <div key={following.uniqueId}>

//                 <span>{following.userFollowings?.userName}</span>

//                 <input
//                   type="text"
//                   placeholder="Type message"
//                   value={messages[receiverId] || ""}
//                   onChange={(e) =>
//                     handleMessageChange(receiverId, e.target.value)
//                   }
//                 />

//                 <button onClick={() => sendMessage(receiverId)}>
//                   Send Message
//                 </button>

//               </div>

//             );

//           })}

//         </div>

//       )}



// {/* All Users */}

//       <button onClick={getAllUsers}>
//         See All Users
//       </button>

//       {showUsers && users.map(user=>(

//         <div key={user.userId}>

//         <h3>{user.userName}</h3>

//         <input
//         type="text"
//         placeholder="type message"
//         value={messages[user.userId] || ""}
//         onChange={(e)=>handleMessageChange(user.userId,e.target.value)}
//         />

//         <button onClick={()=>sendMessage(user.userId)}>
//         Send Message
//         </button>

//         <button onClick={()=>sendReq(user.userId)}>
//         Send Request
//         </button>

//         </div>

//         ))}


//       {req && (
//         <h3>Request sent successfully</h3>
//       )}
      
//       <button className="see_req" onClick={getAllPendingReq}>View Requests</button>
//         {showRequests && requests.map(req => (

//             <div key={req.uniqueId}>

//               <h3>{req.userFollowings?.userName}</h3>

//               <button onClick={()=>accept(req.userFollowings.userId)}>
//                 Accept
//               </button>
//             </div>

//         ))}
//         {status ? <h1>Request Accepted Successfully</h1>: <h1>Failed to accept</h1>}

//        <button className="see_msg" onClick={getAllmsg}>
//           View All Messages
//           </button>

//           {showMsgs && msg.map((req)=>(

//             <div key={req.msgId}>

//               <h3>From: {req.msgSender?.userName}</h3>

//               <p>Message: {req.context}</p>

//               <input
//                 type="text"
//                 placeholder="Type reply..."
//                 value={replyMsgs[req.senderId] || ""}
//                 onChange={(e)=>handleReplyChange(req.senderId, e.target.value)}
//               />

//               <button onClick={()=>sendMessage(req.senderId)}>
//                 Reply
//               </button>

//             </div>

//           ))}
        

//     </div>
//   );

// };

// export default ProfilePage;
