import { getAuth } from "firebase/auth"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import join from "../images/join.svg"
import leave from "../images/leave.svg"
import React from 'react';
const Session = ({session, id}) => {
    const navigate = useNavigate()
    const auth = getAuth()
    const joinSession = async() => {
        try {
            const docRef = doc(db, "sessions", id)
            if (session.peopleIds.length===session.maxPeople){
                alert("Session is full")
            }
            else if (session.peopleIds.includes(auth.currentUser.uid) && session.peopleIds.length===1) {
                await deleteDoc(docRef)
            }
            else if (session.peopleIds.includes(auth.currentUser.uid)) {
                await updateDoc(docRef, {...session, 
                                        peopleNames: session.peopleNames.filter((name)=>name!==auth.currentUser.displayName),
                                        peopleIds: session.peopleIds.filter((id)=>id!==auth.currentUser.uid)
                                    })
            }
            
            else {
                await updateDoc(docRef, {...session, 
                                        peopleNames:[...session.peopleNames, auth.currentUser.displayName],
                                        peopleIds:[...session.peopleIds, auth.currentUser.uid]
                                    })
            }

    }
    catch (err) {
        alert(err)
    }
}
    return (
        <div className="container">
            <div>
                <p id="clp">{session.typeOfWorkout}</p>
                <span>{new Date(session.startTime).toLocaleString() }</span>
                <p><a href={"mailto:"+auth.currentUser.email}>{session.peopleNames[0]}</a></p>
            </div>

            <div id="d2s">
                <p className={"pie"+Math.ceil(session.peopleIds.length*10/session.maxPeople)} >{session.peopleIds.length}/{session.maxPeople}</p>
                <img onClick={joinSession} alt="join" src={session.peopleIds.includes(auth.currentUser.uid)?leave:join} id="img10"/>
            </div>
        </div>
    )
}

export default Session