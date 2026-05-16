import { Routes , Route} from 'react-router-dom'
import Register from '../pages/Register'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import ProtectedRoutes from '../components/ProtectedRoutes'

export default function UserRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/chat' element={<ProtectedRoutes>
                <Chat/>
            </ProtectedRoutes>}/>
            <Route path='login' element={<Login/>}/>

        </Routes>
    )
}
