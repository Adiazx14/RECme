import join from "../images/join.svg"

const Session = ({session}) => {
    const joinSession = async() => {
        try {
            if (session.peopleIds===session.maxPeople)
            {
                alert("Session is full")
            }

    }
    catch (err) {
        console.log(err)
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
                <img alt="join" src={join} id="img10"/>
            </div>
        </div>
    )
}

export default Session