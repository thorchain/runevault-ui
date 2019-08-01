import * as types from '../actions/index';

const initialState = {
    stakeValue: {},
    fetchStake: {},
    sumStake: '',
    totalStakers: 0,
    stakedSupply: '',
    lastUpdatedDate: '',
    leaderBoardList: [],
    dataSource: []
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
        case types.LEADERBOARD_LIST:
            return {...state, leaderBoardList: action.leaderBoardList};
        case types.DATA_SOURCE:
            return {...state, dataSource: action.dataSource};
        default:
            return state;
    }
}
