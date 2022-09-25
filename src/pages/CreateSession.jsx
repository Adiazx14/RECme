import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"

const CreateSession = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        typeOfWorkout: "",
        maxPeople: "",
        startTime: "",
    })
    const {typeOfWorkout, maxPeople, startTime} = userData

    const onChange = ((e)=>{
        setUserData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    })
    const onSubmit = (async(e) => {
        e.preventDefault()
        try {
            const auth =  getAuth()
            const docRef = collection(db, "sessions")
            console.log(startTime)
            await addDoc(docRef, {typeOfWorkout, maxPeople, startTime, people:[auth.currentUser.uid]})
            alert("Session Created")
            navigate("/")
        }
        catch(err) {
            alert(err)
        }
        
    })
    return (
        <fieldset>
            <legend>New Workout:</legend>
            <div className={"centered"}>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Type of Workout" value={typeOfWorkout} id="typeOfWorkout" onChange={onChange}/>
                <input type="number" placeholder="Max People" value={maxPeople} id="maxPeople" onChange={onChange}/>
                <input type="datetime-local" min={new Date().toISOString().slice(0, 16)} placeholder="startTime" value={startTime} id="startTime" onChange={onChange}/>
                <input type="submit" value="Create"/>
            </form>
            </div>
        </fieldset>
    )
}

export default CreateSession