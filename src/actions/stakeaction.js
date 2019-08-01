import {stakeRef} from '../config/firebase';
import {
    DATA_SOURCE,
    LAST_UPDATED_DATE,
    LEADERBOARD_LIST,
    STAKED_SUPPLY,
    SUM_STAKE,
    TOTAL_STAKERS
} from "./index";
import { formatDate } from '../utils/utility'

export const saveStake = (stakeValue)  => async => {
    stakeRef.push({address: stakeValue.address, date: new Date().getTime(), amount: parseInt(stakeValue.amount, 10), mode: stakeValue.mode });
};

export const sumStake = () => dispatch => {
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

            const lastUpdatedDate = new Date(stakeList[stakeList.length - 1].date);

            var result = [];
            stakeModeList.reduce(function(res, value) {
                if (!res[value.address]) {
                    res[value.address] = { address: value.address, amount: 0, date: new Date(value.date).toISOString() };
                    result.push(res[value.address])
                }
                res[value.address].amount += value.amount;
                return res;
            }, {});

            const resultValue = result.sort((a, b) => Number(b.amount) - Number(a.amount));

            const viewableLeaderBoardList = [];
            for (var i = 0; i < resultValue.length; i++) {
                viewableLeaderBoardList.push({
                    key: i,
                    avatar: resultValue[i].address,
                    address: resultValue[i].address,
                    staked: resultValue[i].amount,
                    lastUpdated: resultValue[i].date,
                });
            }

            dispatch(setSumStake(sumStake.toLocaleString()));
            dispatch(seTotalStakers(totalStakers));
            dispatch(setSakedSupply(stakedSuppy.toFixed(1)));
            dispatch(setLastUpdatedDate(formatDate(lastUpdatedDate)));
            dispatch(setLeaderBoardList(viewableLeaderBoardList));
            dispatch(setDataSource(viewableLeaderBoardList.slice(0, 10)));
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


export const setLastUpdatedDate = (lastUpdatedDate) => {
    return {
        type: LAST_UPDATED_DATE,
        lastUpdatedDate
    }
};

export const setLeaderBoardList = (leaderBoardList) => {
    return {
        type: LEADERBOARD_LIST,
        leaderBoardList
    }
};

export const setDataSource = (dataSource) => {
    return {
        type: DATA_SOURCE,
        dataSource
    }
}
