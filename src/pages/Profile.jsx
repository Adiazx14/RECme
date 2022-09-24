import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc} from "firebase/firestore"
import { db } from "../firebase.config"

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [user, setUser] = useState(auth.currentUser)

    const signOut = () => {
        auth.signOut()
        navigate("/")
    }

    useEffect(()=> {
        const fetchUser = async() => {
            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)
            setUser(userSnap.data())
        }

        fetchUser()
        
    }, [user])
    return (
        <>
         
            <p>Welcome {user.name}</p>
            <p>Phone: {user.phone}</p>
            <p>Experience: {user.experience}</p>
            <p onClick={signOut}>Log Out</p>
        
        </>
    )
}

export default Profile