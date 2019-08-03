import * as types from "../actions";

const initialState = {
    ledgerColumns: [],
    leaderBoardList: [],
}

export function ledger(state = initialState, action) {
    switch (action.type) {
        case types.LEDGER_COLUMNS:
            return {...state, ledgerColumns: action.ledgerColumns};
        case types.LEADERBOARD_LIST:
            return {...state, leaderBoardList: action.leaderBoardList};
        default:
            return state;
    }
}
