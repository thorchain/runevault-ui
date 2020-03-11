import axios from "axios";

export const saveLog = (logType, logMessage) => {
    axios.post("/log", {type: logType, message: logMessage},
        {
            headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
        })
        .then((response) => {
            console.log('response success ', response);
        })
}
