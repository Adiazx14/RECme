const UserPopUp = () => {
    return (
        <form id="fact">
        <fieldset>
            <legend>Add Workout Session</legend>
            <label for="startTime">Start Time:</label>
            <input type="time" id="startTime" name="startTime" min="08:00" max="20:00"/>
            <label for="endTime">End Time:</label>
            <input type="time" id="endTime" name="endTime" min="08:00" max="20:00"/>
            <label for="description">Description:</label>
            <input type="text" id="description" name="description"/>
            <div>
            <input type="submit" value="Submit" id ="i1"/>
            </div>
        </fieldset>
        </form>
    )
}

export default UserPopUp