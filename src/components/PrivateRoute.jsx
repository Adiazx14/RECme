import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"

const PrivateRoute = ()=> {
    const {loading, loggedIn} = useAuthStatus()

    if (loading) {
        return <h3>Loading </h3>
    }
    return (
        loggedIn ? <Outlet/>: <Navigate to="/sign-in"/>
    )
}

export default PrivateRoute