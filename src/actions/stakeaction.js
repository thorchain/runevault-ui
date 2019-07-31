import {stakeRef} from '../config/firebase';
import {FETCH_STAKE, SUM_STAKE, TOTAL_STAKERS} from "./index";
import { mapStakeValueWithAddress } from '../utils/utility'

export const saveStake = (stakeValue)  => async => {
    stakeRef.push({address: stakeValue.address, date: new Date().getTime(), amount: parseInt(stakeValue.amount, 10), mode: stakeValue.mode });
};

export const fetchStake = () => async dispatch => {

    const stakeList = [];
    stakeRef.on("value", snapshot => {

        snapshot.forEach(function(_child){
            var rowValue = _child.val();
            stakeList.push(rowValue);
        });

        dispatch({
            type: FETCH_STAKE,
            fetchStake: mapStakeValueWithAddress(stakeList)
        });
    });
};

export const sumStake = () => async dispatch => {
    const stakeList = [];
    stakeRef.on("value", snapshot => {

        snapshot.forEach(function(_child){
            var rowValue = _child.val();
            stakeList.push(rowValue);
        });

        if(stakeList.length > 0) {
            const stakeModeList = stakeList.filter(stake => stake.mode === 'Staked');
            const totalStakers = stakeModeList.length;

            const sumStake = stakeModeList.map(item => item.amount).reduce((prev, next) => prev + next);

            dispatch(setSumStake(sumStake.toLocaleString()));
            dispatch(seTtotalStakers(totalStakers));
        }

    });
}

export const setSumStake = (sumStake) => {
    return {
        type: SUM_STAKE,
        sumStake
    }
};

export const seTtotalStakers = (totalStakers) => {
    return {
        type: TOTAL_STAKERS,
        totalStakers
    }
};
