import React, {useState} from 'react'
//import { useNavigate } from 'react-router-dom'
import "./Login.css"
export default function Login() {
    //const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const URL = "https://chat-jr.onrender.com"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("clicked")
        const data = await fetch(URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                pass: pass
            })
        })
        const res = await data.json();
        console.log(res)
        if(res.user){
            localStorage.setItem('token',res.user)
            window.location.href = '/home'
        }else{
            window.alert("Yaraaa nee Boomer👴🏻, Olunga type panraa...")
          window.location.href = '/'
        }
}

  return (
    <div className='body'>
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <center><h1>Login👽</h1></center><br/>
            <input type='text' placeholder='Username' value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
            <input type='password' placeholder='Password' value={pass} onChange={(e)=> setPass(e.target.value)}/><br/>
            <center><button type='submit' className='login'>Login</button></center>
        </form>
    </div>
    </div>
  )
}
