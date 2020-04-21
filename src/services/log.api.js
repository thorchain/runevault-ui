import axios from "axios";
import { config } from "../env";

export const saveLog = (logType, logMessage) => {

    try {
        axios.post(`${config.logApi}/log`, {type: logType, message: logMessage},
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
