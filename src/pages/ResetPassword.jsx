import { useState } from "react"
import {getAuth, sendPasswordResetEmail} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
    })
    const {email} = userData

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
            await sendPasswordResetEmail(auth, email)
            
            alert("Password reset email sent")
        }
        catch(err) {
            alert(err)
        }
    })
    return (
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="email" value={email} id="email" onChange={onChange}/>
            <input type="submit" value="Send reset password email"/>
            <Link to="/sign-in"> Sign in</Link>
        </form>
    )
}

export default ResetPassword