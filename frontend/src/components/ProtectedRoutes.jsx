import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children}){
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        return <Navigate to='/'/>
    }
    return children
}


