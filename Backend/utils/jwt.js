import jwt from "jsonwebtoken"

export const createJWT=(User)=>{
  return (
    jwt.sign(
        {
            userId : User.userId,
            email : User.email
        },
        process.env.SECRET,
        {
            expiresIn:"1d"
        }
    )
  )
};
