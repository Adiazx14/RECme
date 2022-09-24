import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getAuth } from "firebase/auth"
import { collection, getDoc, getDocs, query } from "firebase/firestore"
import { db } from "../firebase.config"
import useAuthStatus from "../hooks/useAuthStatus"
import Session from "../components/Session"

const Main = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [sessions, setSessions] = useState([])

    useEffect(()=>{
        const fetchSessions = async() => {
            const sessionsRef = collection(db, "sessions")
            const q = query(sessionsRef)
            const sessionsSnap = await getDocs(q)
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
            <ul className="sessions">
                {sessions.map((session)=>{
                    console.log(session.data)
                    return <Session key={session.id} session={session.data}/>
                })}
            </ul>
        </>
    )
}

export default Main