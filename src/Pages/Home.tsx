import React, {useRef, useState, useEffect} from 'react'

interface Message {
    _id: string;
    message: string;
    sender: string;
}

export default function Home() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [length, setLength] = useState<number>(0);
    const chatSectionRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState<string>("")
    const URL = "https://chat-jr.onrender.com"
    useEffect(() => {
     fetchMessage();
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            fetchMessage();
        }, 500);
        return () => clearInterval(interval);
    },[])

    useEffect(() => {
        if (chatSectionRef.current) {
          chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
        }
      },[length]);

    const fetchMessage = async() => {
        try{
            const response = await fetch(URL + "/message",{
                headers: {
                    "x-access-token": localStorage.getItem("token") || ""
                }
            });
            const result = await response.json(); 
            if(result.user){
                setMessages(result.data);
                setEmail(result.email)
                setLength(result.data.length);
            }else{
                window.location.href = '/';
            }
        }catch(err){
            console.log(err)
        }
    }

    const sendMessage = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch( URL + "/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token") || ""
                },
                body: JSON.stringify({message})
            });
            const result = await response.json();
            fetchMessage();
            setMessage("");
        }catch(err){
            console.log(err)
        }
    };

    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
  return (
    <div className='container'>
        <center><h1 className='st'> JR </h1></center>
        <h3 className='email'>{email}</h3>
        <button className='logout' onClick={logout}>Logout</button>
        <div className='chat-section' ref={chatSectionRef}>
            <div className='chat-bar'>{
                messages.map(msg => {
                    if(msg.sender === email)
                    {
                        return (
                            <div className='msg-bar r'>
                               <div className='msg' key={msg._id}>{msg.message}</div>
                               <div className='sender-r'>{msg.sender}</div>
                           </div>
                            )
                    }
                    else
                    {
                        return (
                            <div className='msg-bar s'>
                               <div className='msg' key={msg._id}>{msg.message}</div>
                               <div className='sender'>{msg.sender}</div>
                           </div>
                            )
                    }
                })}
            </div>
        </div>
        <div className='msg-section'>
            <form method="POST" onSubmit={sendMessage}>
                <input className='msg-box' placeholder="Message..." type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button className="button btn" type="submit">Boom</button>
            </form>      
        </div>
    </div>
    
  )
}
