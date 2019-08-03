import * as types from '../actions/index';

const initialState = {
    stakeValue: {},
    fetchStake: {},
    sumStake: '',
    totalStakers: 0,
    stakedSupply: '',
    lastUpdatedDate: '',
    dataSource: [],
    stakeEarningsColumn: [],
    stakeEarningsData: []
}

export function stake(state = initialState, action) {

    switch (action.type) {
        case types.FETCH_STAKE:
            return {...state, fetchStake: action.fetchStake};
        case types.STAKE_VALUE:
            return {...state, stakeValue: action.stakeValue};
        case types.SUM_STAKE:
            return {...state, sumStake: action.sumStake};
        case types.TOTAL_STAKERS:
            return {...state, totalStakers: action.totalStakers};
        case types.STAKED_SUPPLY:
            return {...state, stakedSupply: action.stakedSupply};
        case types.LAST_UPDATED_DATE:
            return {...state, lastUpdatedDate: action.lastUpdatedDate};
        case types.STAKE_EARNINGS_COLUMN:
            return {...state, stakeEarningsColumn: action.stakeEarningsColumn};
        case types.STAKE_EARNINGS_DATA:
            return {...state, stakeEarningsData: action.stakeEarningsData}
        case types.DATA_SOURCE:
            return {...state, dataSource: action.dataSource};
        default:
            return state;
    }
}
