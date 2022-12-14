import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { getAuth } from "firebase/auth"
import { collection, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase.config"
import useAuthStatus from "../hooks/useAuthStatus"
import Session from "../components/Session"
import plus from "../images/plusicon.svg"
import search from "../images/searchicon.svg"
import usericon from "../images/usericon.svg"

const Main = () => {
    const navigate = useNavigate()
    const [sessions, setSessions] = useState([])

    useEffect(()=>{
        const fetchSessions = async() => {
            const sessionsRef = collection(db, "sessions")
            const q = query(
                sessionsRef,
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
            fetchSessions()
            },
        (error) => {
            alert(error)
            
        });
        
    }, [])

    return (
        <>
            <span className="head1">Sessions</span>

            <Link to="/profile"><img src={usericon} alt="Profile" className="uicon" align="right"/></Link>
            <Link to="/search-page"><img src={search} alt="Search" id="search" className="uicon" align="right"/></Link>
            <div className="floater">
                <Link to="/create-session"><img src={plus} alt="Plus Icon" align="left"/></Link>
            </div>
            {sessions.map((session)=>{
                    return <Session key={session.id} session={session.data} id={session.id}/>
            })}
            <div id="rectangle"></div>
        </>
    )
}

export default Main