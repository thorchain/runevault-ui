import {stakeRef} from '../config/firebase';
import {FETCH_STAKE} from "./index";
import * as firebase from 'firebase';
import { mapStakeValueWithAddress } from '../utils/utility'

export const saveStake = (stakeValue)  => async => {
    stakeRef.push({address: stakeValue.address, date: firebase.firestore.Timestamp.now(), amount: parseInt(stakeValue.amount, 10), mode: stakeValue.mode });
};

export const fetchStake = () => async dispatch => {

    const stakeList = [];
    stakeRef.on("value", snapshot => {

        snapshot.forEach(function(_child){
            var rowValue = _child.val();
            console.log(rowValue.date.getTime())
            stakeList.push(rowValue);
        });

        dispatch({
            type: FETCH_STAKE,
            fetchStake: mapStakeValueWithAddress(stakeList)
        });
    });
};
