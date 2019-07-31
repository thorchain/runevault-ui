import * as types from '../actions/index';

const initialState = {
    stakeValue: {},
    fetchStake: {},
    sumStake: '',
    totalStakers: 0
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
        default:
            return state;
    }
}
