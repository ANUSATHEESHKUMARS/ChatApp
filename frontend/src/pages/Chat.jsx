import { useEffect, useState, useRef } from "react"
import { io } from 'socket.io-client'
import { GetUser, GetMessages, LogoutApi } from "../service/Auth.api"
import { useNavigate } from "react-router-dom"

const socket = io('http://localhost:3000')

export default function Chat() {

  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])

  const [selectedUser, setSelectUser] = useState(null)

  const [users, setUsers] = useState([])

  const currentUser = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const selectedUserRef = useRef()
  const messagesEndRef = useRef(null)

  const formatTime = (msg) => {
    if (msg.timestamp) return new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (typeof msg.id === 'number') return new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (typeof msg.id === 'string' && msg.id.length === 24) return new Date(parseInt(msg.id.substring(0, 8), 16) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          setMessages([])
          const data = await GetMessages(selectedUser._id)
          const formattedMessages = data.message.map(msg => ({
            id: msg._id,
            sender: msg.sender,
            text: msg.text
          }));
          setMessages(formattedMessages);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const data = await GetUser()

        console.log(data)

        const filteredUsers = data.users.filter(u => u._id !== currentUser._id)

        setUsers(filteredUsers)

        if (filteredUsers.length > 0) {
          setSelectUser(filteredUsers[0])
        }

      }

      catch (err) {

        console.log(err)

      }

    }

    fetchUsers()

    const onConnect = () => {
      socket.emit('join', currentUser._id)
    }

    if (socket.connected) {
      onConnect()
    }
    socket.on('connect', onConnect)

    const onReceiveMessage = (data) => {
      if (selectedUserRef.current && data.sender === selectedUserRef.current._id) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.timestamp || Date.now(),
            sender: data.sender,
            text: data.text,
            timestamp: data.timestamp || Date.now()
          }
        ])
      }
    }

    socket.on('receiveMessage', onReceiveMessage)

    return () => {
      socket.off('connect', onConnect)
      socket.off('receiveMessage', onReceiveMessage)
    }

  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleLogout = async () => {
    try {
      await LogoutApi()
    } catch (err) {
      console.log(err)
    }
    localStorage.removeItem('user')
    navigate('/login')
  }

  const sendMessage = async () => {

    if (!message.trim() || !selectedUser) {
      return
    }

    const timestamp = Date.now()

    const newMessage = {
      id: timestamp,
      sender: currentUser._id,
      receiver: selectedUser._id,
      text: message,
      timestamp: timestamp
    }

    console.log('message saving')
    setMessages((prev) => [
      ...prev,
      newMessage
    ])

    socket.emit('sendMessage', {
      sender: currentUser._id,
      receiver: selectedUser._id,
      text: message,
      timestamp: timestamp
    })

    setMessage('')

  }

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-[320px] bg-zinc-950 border-r border-zinc-800 flex flex-col">

        {/* TOP */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">MiniChat</h1>
            <p className="text-sm text-zinc-400 mt-1">Realtime Messaging</p>
          </div>

          <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-all font-semibold px-3 py-1 bg-red-500/10 rounded-lg">Logout</button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600 transition-all"
          />
        </div>


        {/* USERS */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">

          {users.map((user) => (

            <div

              key={user._id}

              onClick={() => setSelectUser(user)}

              className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl cursor-pointer hover:bg-zinc-800 transition-all"
            >

              <div className="flex items-center gap-3">

                <div className="relative">

                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">

                    {user.username?.[0]}

                  </div>

                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></div>

                </div>

                <div className="flex-1">

                  <h2 className="font-semibold">

                    {user.username}

                  </h2>

                </div>

              </div>

            </div>

          ))}

        </div>



      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-zinc-950 to-black">

        {/* HEADER */}
        <div className="h-[80px] border-b border-zinc-800 px-6 flex items-center justify-between backdrop-blur-xl bg-black/40">

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
                {selectedUser?.username?.[0]}
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
            </div>

            <div>
              <h2 className="text-xl font-bold">{selectedUser?.username}</h2>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>

          {/* <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-white transition-all text-xl">📞</button>
            <button className="hover:text-white transition-all text-xl">🎥</button>
            <button className="hover:text-white transition-all text-xl">⋮</button>
          </div> */}

        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === currentUser._id ? 'justify-end' : 'justify-start'}`}
            >

              <div
                className={`
                  max-w-[380px]
                  px-5 py-4
                  rounded-3xl
                  text-sm
                  leading-relaxed
                  shadow-2xl
                  ${msg.sender === currentUser._id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-br-md'
                    : 'bg-zinc-900 border border-zinc-800 rounded-bl-md'}
                `}
              >
                <p>{msg.text}</p>

                <div className="flex justify-end mt-2">
                  <span className="text-[10px] text-zinc-300">
                    {formatTime(msg)}
                  </span>
                </div>
              </div>

            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-5 border-t border-zinc-800 bg-black/40 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <button className="w-12 h-12 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all text-xl flex items-center justify-center">
              +
            </button>

            <input
              type="text"
              value={message}
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all"

            />

            <button onClick={sendMessage} className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all font-semibold shadow-2xl">
              Send
            </button>

          </div>

        </div>

      </div>

    </div >
  )
}
