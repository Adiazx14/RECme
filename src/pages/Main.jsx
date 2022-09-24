import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getAuth } from "firebase/auth"

const Main = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [user, setUser] = useState(auth.currentUser)


    return (
        <>
            <p onClick={()=>{navigate("/sign-in")}}>Sign in</p>
        </>
    )
}

export default Main