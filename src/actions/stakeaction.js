import {stakeRef} from '../config/firebase';
import {FETCH_STAKE, STAKED_SUPPLY, SUM_STAKE, TOTAL_STAKERS} from "./index";
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
            const stakedSuppy = (sumStake/82184069)*100

            console.log('STAKED SUPPLY ' + stakedSuppy.toFixed(1));

            dispatch(setSumStake(sumStake.toLocaleString()));
            dispatch(seTotalStakers(totalStakers));
            dispatch(setSakedSupply(stakedSuppy.toFixed(1)));
        }

    });
}

export const setSumStake = (sumStake) => {
    return {
        type: SUM_STAKE,
        sumStake
    }
};

export const seTotalStakers = (totalStakers) => {
    return {
        type: TOTAL_STAKERS,
        totalStakers
    }
};

export const setSakedSupply = (stakedSupply) => {
    return {
        type: STAKED_SUPPLY,
        stakedSupply
    }
};
