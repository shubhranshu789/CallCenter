import React, { useState, useContext } from 'react'
import './ModeratorSignIn.css'
import logo from "../img/logo2.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';
function ModeratorSignIn() {

    const { setUserLogin } = useContext(LoginContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const postData = () => {

        //checking Email
        if (!emailRegex.test(email)) {
            notifyA("Invalid Email")
            return
        }

        //sending data to server 
        fetch("http://localhost:5000/agentsignin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })


        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB("Signed In successfullly")
                    console.log(data)
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    setUserLogin(true)
                    navigate('/agentwork')
                }

                console.log(data)
            })
    }




    return (
        <div className='signIn'>
            <div className="form-container">
                <h1>Agent SignIn Page</h1>
                <br />
                
                <img className='signUpLogo' src={logo} alt="" />
                <div>
                    <input type="email" name="email" id="email" placeholder='Email'
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <input type="password" name="pass" id="pass" placeholder='Password'
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <input type="submit" value="Sign In" id='submit-btn' onClick={() => { postData() }} />


                <div className="form2" style={{marginTop: "20px"}}>
                    Dont't have an account ?

                    <Link to="/signUp">
                        <span style={{ color: "blue", cursor: "pointer" }}>User Sign Up</span>

                    </Link>
                    <br />

                    Admin login
                    <Link to="/admin">
                        <span style={{ color: "blue", cursor: "pointer" }}>Admin Login</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ModeratorSignIn