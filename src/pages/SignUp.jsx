import { useState } from "react"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {db} from "../firebase.config"
import { Link, useNavigate } from "react-router-dom"
import GoogleAuth from "../components/GoogleAuth"

const SignUp = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        phone: ""
    })
    const {name, email, password, experience, phone} = userData

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
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", credentials.user.uid), {name, email, experience, phone})
            await updateProfile(auth.currentUser, {
                displayName: name
            })
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
            <input type="text" placeholder="name" value={name} id="name" onChange={onChange}/>
            <input type="email" placeholder="email" value={email} id="email" onChange={onChange}/>
            <input type="password" placeholder="password" value={password} id="password" onChange={onChange}/>
            <input type="number" placeholder="phone" value={phone} id="phone" onChange={onChange}/>
            <select value={experience} id="experience" onChange={onChange}>
                <option value="" disabled>experience</option>
                <option value="begginer">begginer</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
            </select>
            <input type="submit" value="Register"/>
        </form>
        <Link to="/sign-up"> Sign up instead</Link>
        <GoogleAuth/>
        </>
    )
}

export default SignUp