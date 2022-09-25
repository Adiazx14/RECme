import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { getAuth } from "firebase/auth"
import { collection, getDoc, getDocs, query } from "firebase/firestore"
import { db } from "../firebase.config"
import useAuthStatus from "../hooks/useAuthStatus"
import Session from "../components/Session"
import plus from "../images/plusicon.svg"

const Main = () => {
    const navigate = useNavigate()
    const [sessions, setSessions] = useState([])

    useEffect(()=>{
        const fetchSessions = async() => {
            const sessionsRef = collection(db, "sessions")
            const sessionsSnap = await getDocs(sessionsRef)
            const sessions = []
            sessionsSnap.forEach(doc=>{
                sessions.push({
                    id: doc.id,
                    data: doc.data()
                })
            setSessions(sessions)
            console.log(sessions)
            })
        }
        fetchSessions()
    }, [])

    return (
        <>
            <p className="head1">Open Sessions</p>
            <div className="floater">
                <Link to="/create-session"><img src={plus} alt="Plus Icon" align="left"/></Link>
            </div>
            {sessions.map((session)=>{
                    console.log(session.data)
                    return <Session key={session.id} session={session.data}/>
            })}
            <div id="rectangle"></div>
        </>
    )
}

export default Main