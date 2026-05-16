import { useState, useEffect } from "react"
import { LoginApi } from "../service/Auth.api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/chat');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const data = await LoginApi({
                email,
                password
            })
            console.log(data)

            localStorage.setItem('user', JSON.stringify(data.user))
            setAlertMessage({ type: 'success', text: 'Login successful! Redirecting...' })
            
            setTimeout(() => {
                navigate('/chat')
            }, 1000)
        } catch (err) {
            console.log(err)
            setAlertMessage({ type: 'error', text: err.response?.data?.message || 'Login failed. Please check your credentials.' })
        }
    }
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden relative">

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
            <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

            {/* CARD */}
            <div className="relative z-10 w-full max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-[32px] shadow-2xl p-8">

                {/* TOP */}
                <div className="text-center mb-10">

                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center text-3xl font-bold shadow-2xl mb-5">
                        M
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="text-zinc-400 mt-3 text-sm">
                        Login to continue your realtime conversations 🚀
                    </p>

                </div>

                {/* ALERT */}
                {alertMessage.text && (
                    <div className={`mb-5 p-4 rounded-xl text-center text-sm font-semibold transition-all ${
                        alertMessage.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                        {alertMessage.text}
                    </div>
                )}

                {/* FORM */}
                <div className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm text-zinc-400 block mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* REMEMBER */}
                    <div className="flex items-center justify-between text-sm">

                        <div className="flex items-center gap-2 text-zinc-400">
                            <input type="checkbox" className="accent-blue-600" />
                            <span>Remember me</span>
                        </div>

                        <button className="text-blue-400 hover:text-blue-300 transition-all">
                            Forgot Password?
                        </button>

                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleLogin}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-lg hover:scale-[1.02] transition-all shadow-2xl mt-3">
                        Login
                    </button>

                </div>

                {/* FOOTER */}
                <div className="mt-8 text-center text-zinc-400 text-sm">
                    Don’t have an account?
                    <Link
                        to='/'
                        className='text-blue-400 ml-2 hover:text-blue-300 transition-all'
                    >
                        Register
                    </Link>
                </div>

            </div>

        </div>
    )
}
