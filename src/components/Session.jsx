import join from "../images/join.svg"

const Session = ({session}) => {
    const joinSession = ()=>{

    }
    return (
        <div className="container">
            <div1>
                <p>{session.peopleNames[0]}</p>
                <span>{new Date(session.startTime).toLocaleString() }</span>
                <p id="clp">{session.typeOfWorkout}</p>
            </div1>

            <div2 id="d2s">
                <p>{session.peopleIds.length}/{session.maxPeople}</p>
                <img alt="join" src={join} id="img10"/>
            </div2>
        </div>
    )
}

export default Session