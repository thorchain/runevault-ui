import {combineReducers} from 'redux';
import { stake } from './stakereducer';
import { ledger } from "./ledgerreducer";

export default combineReducers({
    stake, ledger
});
