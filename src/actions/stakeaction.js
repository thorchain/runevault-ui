import {stakeRef} from '../config/firebase';
import {FETCH_STAKE} from "./index";
import * as firebase from 'firebase'

export const addStake = (stakeValue)  => async => {

    stakeRef.push({address: stakeValue.address, date: firebase.firestore.Timestamp.now(), amountStaked: stakeValue.amount });
};

export const fetchStake = () => async dispatch => {
    stakeRef.on("value", snapshot => {
        dispatch({
            type: FETCH_STAKE,
            fetchStake: snapshot.val()
        });
    });
};
