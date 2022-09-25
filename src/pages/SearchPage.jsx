import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import Session from "../components/Session"
import { db } from "../firebase.config"

const SearchPage = () => {
    const navigate = useNavigate()
    const [time, setTime] = useState({
        startTime: "",
        endTime: "",
    })
    const [looking, setLooking] = useState(true)
    const [sessions, setSessions] = useState()
    const {startTime, endTime} = time
    const fetchSessions = async()=> {
        try {
        const sessionsRef = collection(db, "sessions")
        const q = query(
            sessionsRef,
            where("startTime", ">", startTime),
            where("startTime", "<", endTime),
            orderBy("startTime", "asc")
            )
        const sessionsSnap = await getDocs(q)
        if (sessionsSnap.size>0) {
            const sessions = []
            sessionsSnap.forEach(doc=>{
                sessions.push({
                    id: doc.id,
                    data: doc.data()
                })
                setSessions(sessions)
                setLooking(false)     
            })
        }

       else  alert("No sessions found for those dates")
    }
    catch (err) {
        alert(err)
    }
    }

    const onChange = ((e)=>{
        setTime((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    })
    const onSubmit = (async(e) => {
        e.preventDefault()
        fetchSessions()
        
    })
    return (
        <>
        <form className={looking?"":"noShow"} onSubmit={onSubmit}>

        <p id="timerange">I'm Free From</p>
            <div className="container">
                <input type="datetime-local" required min={new Date().toISOString().slice(0, 16)} placeholder="sTime" value={startTime} id="startTime" onChange={onChange}/>
            </div>
                <p id="lmaoxd">to</p>
            <div className="container">
                <input type="datetime-local" required min={new Date().toISOString().slice(0, 16)} placeholder="endTime" value={endTime} id="endTime" onChange={onChange}/>
            </div>
                <input type="submit" id="sbutton" value="RECme!"/>
            
        </form>
        <Link to="/"><input type="submit" id="bbutton" value="Back"/></Link>
        {!looking &&
                     sessions.map((session)=>{
                    return <Session key={session.id} session={session.data} id={session.id}/>
            })}
        </>

    )
}

export default SearchPage