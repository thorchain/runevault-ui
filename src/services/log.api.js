import axios from "axios";

export const saveLog = (logType, logMessage) => {

    try {
        axios.post("https://rune-log-api.herokuapp.com/log", {type: logType, message: logMessage},
            {
                headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
            })
            .then((response) => {
                console.log('response success ', response);
            }).catch(() => {
            console.log('Could not save in runevault log')
        });
    } catch (e) {
        console.log('Could not save in runevault log')
    }

}
