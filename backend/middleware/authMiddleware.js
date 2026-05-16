import jwt from 'jsonwebtoken'

const protect = async (req , res , next) =>{
    try{
        const token = req.cookies.jwt   
        if(!token){
            return res.status(401).json({
                message : "no token"
            })
        }
        const verify = jwt.verify(token , process.env.JWT_SECRET)
        if(!verify){
            return res.status(401).json({
                message : "Invalid Token"
            })
        }
        req.user = verify
        
        next()
    }catch(err){
        console.log(err.message)
        return res.status(401).json({
            message : "Invalid token"
        })
    }

}
export default protect

