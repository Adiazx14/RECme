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
            try {
            const userRef = doc(db, "users", auth.currentUser.uid)
            const userSnap = await getDoc(userRef)
            setUser(userSnap.data())
            }
            catch(err) {
                alert(err)
            }
        }

        fetchUser()
        
    }, [user])
    return (
        <>
            <fieldset>
                <legend>Profile:</legend>
                <p>{user.name}</p>
                <label htmlFor="phone">Phone:{"\n"}</label>
                <input type="number" id="phone" name="phone" value={user.phoneNumber}/>
                <label htmlFor="email">Email:{"\n"}</label>
                <input type="email" id="email" name="email" disabled value={user.email}/>
                <label htmlFor="level">Experience:</label>
            <select name="level" id="level">
                <optgroup id="ogroup">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </optgroup>
            </select>
            <div id="intype">
                <input type="submit" value="Submit" id="sub"></input>
            </div>
                <p onClick={signOut} id="logot">Log Out</p>
            </fieldset>
        </>
    )
}

export default Profile