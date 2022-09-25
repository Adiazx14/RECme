import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { db } from "../firebase.config"

const CreateSession = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        startTime: "",
        endTime: "",
    })
    const {startTime, endTime} = userData
    const onChange = ((e)=>{

    })
    const onSubmit = (async(e) => {
        e.preventDefault()
        try {

        }
        catch(err) {
            alert(err)
        }

    })
    return (
        <form onSubmit={onSubmit}>

        <p id="timerange">I'm Free From</p>
            <div className="container">
                <input type="datetime-local" required min={new Date().toISOString().slice(0, 16)} placeholder="sTime" value={startTime} id="sTime" onChange={onChange}/>
            </div>
                <p id="lmaoxd">to</p>
            <div className="container">
                <input type="datetime-local" required min={new Date().toISOString().slice(0, 16)} placeholder="endTime" value={endTime} id="endTime" onChange={onChange}/>
            </div>
                <input type="submit" id="sbutton" value="RECme!"/>
            <Link to="/"><input type="submit" id="bbutton" value="Back"/></Link>
        </form>

    )
}

export default CreateSession