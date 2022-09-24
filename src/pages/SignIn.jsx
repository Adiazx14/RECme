import { useState } from "react"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import GoogleAuth from "../components/GoogleAuth"

const SignIn = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const {email, password} = userData

    const onChange = ((e)=>{
        setUserData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    })
    const onSubmit = (async(e) => {
        e.preventDefault()
        try {
            const auth =  getAuth()
            const credentials = await signInWithEmailAndPassword(auth, email, password)
            
            if (credentials.user) {
                navigate("/profile")
            }
        }
        catch(err) {
            alert(err)
        }
    })
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="email" value={email} id="email" onChange={onChange}/>
            <input type="password" placeholder="password" value={password} id="password" onChange={onChange}/>
            <input type="submit" value="Sign in"/>

        </form>
        <Link to="/reset-password"> Forgot password?</Link>
        <Link to="/sign-up"> Sign up instead</Link>
        <GoogleAuth/>
        </>
    )
}

export default SignIn