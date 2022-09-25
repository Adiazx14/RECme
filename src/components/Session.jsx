import join from "../images/join.svg"

const Session = ({session}) => {
    return (
    <div className="container">
        <div className="div1">
            <span>{session["people"][0]}</span>
            <span>{Date(session.startTime)}</span>
            <p id="clp">{session.typeOfWorkout}</p>
        </div>
        <div className="div2" id="d2s">
            <p className="pie" id="pie1">{session.people.length}/{session.maxPeople}</p>
        </div>
    </div>
    )
}

export default Session