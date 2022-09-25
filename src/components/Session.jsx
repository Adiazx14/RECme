import { getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import join from "../images/join.svg"
import leave from "../images/leave.svg"

const Session = ({session, id}) => {
    const navigate = useNavigate()
    const auth = getAuth()
    const joinSession = async() => {
        console.log(session)
        try {
            if (session.peopleIds.length===session.maxPeople){
                alert("Session is full")
            }
            else if (session.peopleIds.includes(auth.currentUser.uid)) {
                const docRef = doc(db, "sessions", id)
                await updateDoc(docRef, {...session, 
                                        peopleNames: session.peopleNames.filter((name)=>name!==auth.currentUser.displayName),
                                        peopleIds: session.peopleIds.filter((id)=>id!==auth.currentUser.uid)
                                    })
                alert("You left the group")
            }
            else {
                const docRef = doc(db, "sessions", id)
                await updateDoc(docRef, {...session, 
                                        peopleNames:[...session.peopleNames, auth.currentUser.displayName],
                                        peopleIds:[...session.peopleIds, auth.currentUser.uid]
                                    })
                alert("Joined succesfully!")
            }

    }
    catch (err) {
        alert(err)
    }
}
    return (
        <div className="container">
            <div>
                <p>{session.peopleNames[0]}</p>
                <span>{new Date(session.startTime).toLocaleString() }</span>
                <p id="clp">{session.typeOfWorkout}</p>
            </div>

            <div id="d2s">
                <p>{session.peopleIds.length}/{session.maxPeople}</p>
                <img onClick={joinSession} alt="join" src={session.peopleIds.includes(auth.currentUser.uid)?leave:join} id="img10"/>
            </div>
        </div>
    )
}

export default Session