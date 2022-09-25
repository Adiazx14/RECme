import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
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
            <head1>Open Sessions</head1>
            <div className="floater">
                <img src={plus} alt="Plus Icon" align="left"/>
            </div>
            {sessions.map((session)=>{
                    console.log(session.data)
                    return <Session key={session.id} session={session.data}/>
            })}
        </>
    )
}

export default Main