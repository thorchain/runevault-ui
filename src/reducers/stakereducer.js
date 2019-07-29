import * as types from '../actions/index';

const initialState = {
    stakeValue: {},
    fetchStake: {}
}

export function stake(state = initialState, action) {

    switch (action.type) {
        case types.FETCH_STAKE:
            return {...state, fetchStake: action.fetchStake};
        case types.STAKE_VALUE:
            return {...state, stakeValue: action.stakeValue};
        default:
            return state;
    }
}
