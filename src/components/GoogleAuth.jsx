import googleIcon from "../images/googleIcon.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase.config"

const GoogleAuth = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const onSubmit = async() => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const creds = await signInWithPopup(auth, provider)

            const docRef = doc(db, "users", creds.user.uid)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                setDoc(docRef, {
                    name: creds.user.displayName,
                    email: creds.user.email
                })
                
            }
            navigate("/profile")
        }
        catch(err) {
            alert(err)
        }
    }

    return (
    <div className="socialDiv">
        <p>Sign {location.pathname === "/sign-up"? "up": "in"} with</p>
        <button className="socialBtn" onClick={onSubmit}>
            <img alt = "google icon" className="socialImg" src={googleIcon} />
        </button>
    </div>
    )
}

export default GoogleAuth