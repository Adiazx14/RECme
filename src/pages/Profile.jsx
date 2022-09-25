import { getAuth, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where} from "firebase/firestore"
import { db } from "../firebase.config"
import Session from "../components/Session"

const Profile = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [user, setUser] = useState(auth.currentUser)
    const [sessions, setSessions] = useState([])
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
        const fetchSessions = async() => {
            const sessionsRef = collection(db, "sessions")
            const q = query(
                sessionsRef,
                where("peopleIds", "array-contains", auth.currentUser.uid),
                orderBy("startTime", "asc")
                )
            const sessionsSnap = await getDocs(q)
            const sessions = []
            sessionsSnap.forEach(doc=>{
                sessions.push({
                    id: doc.id,
                    data: doc.data()
                })
            setSessions(sessions)
            })
        }
        const unsubscribe = onSnapshot(
        collection(db, "sessions"), 
        (snapshot) => {
            if (snapshot)
            {
             fetchSessions()
            }
            else setSessions([])
            },
        (error) => {
            alert(error)
            
        });
        
    }, [])
    return (
        <>
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
        {sessions.length>0 &&
        <div className="">
            <span className="head1">My sessions</span>
            {sessions.map((session)=>{
                    return <Session key={session.id} session={session.data} id={session.id}/>
            })}
            <div id="rectangle"></div>
        </div>
        }
        </>
    )
}

export default Profile