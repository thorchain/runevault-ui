import {stakeRef} from '../config/firebase';
import {FETCH_STAKE} from "./index";
import * as firebase from 'firebase'

export const saveStake = (stakeValue)  => async => {

    stakeRef.push({address: stakeValue.address, date: firebase.firestore.Timestamp.now(), amountStaked: stakeValue.amount });
};

export const fetchStake = () => async dispatch => {
    stakeRef.on("value", snapshot => {

        const stakeList = snapshotToArray(snapshot.val());

        var sortedStakeByAmountStaked = stakeList.slice(0);
        sortedStakeByAmountStaked.sort(function(a,b) {
            return a.amountStaked - b.amountStaked;
        });
        console.log('sorted stake ' + sortedStakeByAmountStaked);

        dispatch({
            type: FETCH_STAKE,
            fetchStake: snapshot.val()
        });
    });
};

const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));
