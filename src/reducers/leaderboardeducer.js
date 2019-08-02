import * as types from "../actions";

const initialState = {
    leaderboardColumns: [],
    leaderBoardList: [],
}

export function leaderboard(state = initialState, action) {
    switch (action.type) {
        case types.LEADERBOARD_COLUMNS:
            return {...state, leaderboardColumns: action.leaderboardColumns};
        case types.LEADERBOARD_LIST:
            return {...state, leaderBoardList: action.leaderBoardList};
        default:
            return state;
    }
}
