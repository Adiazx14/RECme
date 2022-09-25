import join from "../images/join.svg"

const Session = ({session}) => {
    return (
        <div className="container">
            <div1>
                <p>Ryan</p>
                <span>{new Date(session.startTime).toLocaleString() }</span>
                <p id="clp">{session.typeOfWorkout}</p>
            </div1>

            <div2 id="d2s">
                <p>{session.people.length}/{session.maxPeople}</p>
                <img src={join} id="img10"/>
            </div2>
        </div>
    )
}

export default Session