import {stakeRef} from '../config/firebase';
import {
    DATA_SOURCE,
    LAST_UPDATED_DATE, STAKE_EARNINGS_COLUMN, STAKE_EARNINGS_DATA,
    STAKED_SUPPLY,
    SUM_STAKE,
    TOTAL_STAKERS
} from "./index";
import { formatDate } from '../utils/utility'
import { setLeaderBoardList } from "./leaderboardaction";

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
            const totalStakers = countUnique(stakeModeList);

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
                    staked: resultValue[i].amount.toLocaleString(),
                    lastUpdated: formatDate(new Date(resultValue[i].date)),
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

export const saveStakeEaringsColumn = () => dispatch => {
    const columns = [
        {
            title: 'Week',
            dataIndex: 'week',
            key: 'week',
        },
        {
            title: 'Interest',
            dataIndex: 'interest',
            key: 'interest',
        },
        {
            title: 'Compounded Interest',
            dataIndex: 'compounded',
            key: 'compounded',
        },
    ];
    dispatch(setStakeEaringsColumn(columns));
}

export function countUnique(array) {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if(!map.has(item.address)){
            map.set(item.address, true);    // set any value to Map
            result.push({
                address: item.address
            });
        }
    }
    return result.length
}

export const saveStakeEaringsData = () => dispatch => {
    const dataSource = [
        {
            key: '1',
            week: '1',
            interest: '0.2%',
            compounded: '0.2%',
        },
        {
            key: '2',
            week: '2',
            interest: '0.4%',
            compounded: '0.6%',
        },
        {
            key: '3',
            week: '3',
            interest: '0.6%',
            compounded: '1.2%',
        },
        {
            key: '4',
            week: '4',
            interest: '0.8%',
            compounded: '2.0%',
        },
        {
            key: '5',
            week: '5',
            interest: '1.0%',
            compounded: '3.0%',
        },
        {
            key: '6',
            week: '6',
            interest: '1.2%',
            compounded: '4.3%',
        },
        {
            key: '7',
            week: '7',
            interest: '1.4%',
            compounded: '5.7%',
        },
        {
            key: '8',
            week: '8',
            interest: '1.6%',
            compounded: '7.4%',
        },
        {
            key: '9',
            week: '9',
            interest: '1.8%',
            compounded: '9.4%',
        },
        {
            key: '10',
            week: '10',
            interest: '2%',
            compounded: '11.5%',
        },
    ];
    dispatch(setStakeEaringsData(dataSource));
}

export const setStakeEaringsColumn = (stakeEarningsColumn) => {
    return {
        type: STAKE_EARNINGS_COLUMN,
        stakeEarningsColumn
    }
};

export const setStakeEaringsData = (stakeEarningsData) => {
    return {
        type: STAKE_EARNINGS_DATA,
        stakeEarningsData
    }
};

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


export const setDataSource = (dataSource) => {
    return {
        type: DATA_SOURCE,
        dataSource
    }
}
