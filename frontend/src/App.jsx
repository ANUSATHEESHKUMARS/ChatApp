import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import {io} from 'socket.io-client'



export default function App() {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  )
}