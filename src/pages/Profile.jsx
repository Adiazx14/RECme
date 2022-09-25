import { getAuth, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore"
import { db } from "../firebase.config"

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [user, setUser] = useState(auth.currentUser)
    const [userData, setUserData] = useState({
        experience: "",
        phone: 0
    })
    const {experience, phone} = userData

    const onChange = ((e)=>{
        setUserData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    })

    const signOut = () => {
        auth.signOut()
        navigate("/sign-in")
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        try {
            const userRef = doc(db, "users", auth.currentUser.uid)
            await updateDoc(userRef, {
                experience,
                phone
            })
            await updateProfile(auth.currentUser,{
                phoneNumber:phone
            })
            alert("User Info Updated")
            navigate("/")
        } 
        catch (error) {
            alert(error)
        }
    }

    useEffect(()=> {
        const fetchUser = async() => {
            try {
            const userRef = doc(db, "users", auth.currentUser.uid)
            const userSnap = await getDoc(userRef)
            console.log(userSnap.data())
            setUserData(userSnap.data())
            }
            catch(err) {
                alert(err)
            }
        }
        fetchUser()     
    }, [])
    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Profile:</legend>
                <p>{user.name}</p>
                <label htmlFor="phone">Phone:{"\n"}</label>
                <input onChange={onChange} type="tel" id="phone" name="phone" value={phone}/>
                <label htmlFor="email">Email:{"\n"}</label>
                <input type="email" id="email" name="email" disabled value={user.email}/>
                <label htmlFor="level">Experience:</label>
            <select onChange={onChange} name="level" id="experience" value={experience}>
                <optgroup id="ogroup">
                    <option value="" disabled></option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </optgroup>
            </select>
            <div id="intype">
                <input type="submit" value="Submit" id="sub"></input>
            </div>
                <p onClick={signOut} id="logot">Log Out</p>
            </fieldset>
        </form>
    )
}

export default Profile