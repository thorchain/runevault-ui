import {combineReducers} from 'redux';
import { stake } from './stakereducer';
import { leaderboard } from "./leaderboardeducer";

export default combineReducers({
    stake, leaderboard
});
