import axios from 'axios';
import {
    setDataSource,
    setIsLoading,
    setLastUpdatedDate,
    seTotalStakers,
    setSakedSupply,
    setSumStake
} from '../actions/stakeaction';
import {formatDate} from "../utils/utility";
import {setLeaderBoardList} from "../actions/leaderboardaction";

export const getLastUpdatedDate = () => dispatch => {
    axios.get("https://thorchain-microservice.herokuapp.com/api/runeLastUpdatedDate")
        .then((response) => {
            dispatch(setLastUpdatedDate(formatDate(new Date(response.data.lastUpdatedDate))));
        })
}

export const getTotalSupply = () => dispatch => {
    axios.get("https://thorchain-microservice.herokuapp.com/api/totalSupply")
        .then((response) => {
            dispatch(setSakedSupply(response.data.totalSupply.toFixed(1)));
        })
}

export const getTotalStakedRune = () => dispatch => {
    axios.get("https://thorchain-microservice.herokuapp.com/api/totalAmountStaked")
        .then((response) => {
            dispatch(setSumStake(response.data.totalAmountStaked.toLocaleString()));
        })
}

export const getTotalRuneStakers = () => dispatch => {
    axios.get("https://thorchain-microservice.herokuapp.com/api/uniqueStakers")
        .then((response) => {
            dispatch(seTotalStakers(response.data.totalStakers));
        })
}


export const getLeaderboardlist = () => dispatch => {
    axios.get("https://thorchain-microservice.herokuapp.com/api/addresses")
        .then((response) => {
            const viewableLeaderBoardList = [];
            const runeAddressList = response.data.runeAddressList;

            for (var i = 0; i < runeAddressList.length; i++) {
                viewableLeaderBoardList.push({
                    key: i,
                    avatar: runeAddressList[i].address,
                    address: runeAddressList[i].address,
                    staked: (runeAddressList[i].amount).toLocaleString(),
                    lastUpdated: formatDate(new Date(runeAddressList[i].date)),
                });
            }
            dispatch(setLeaderBoardList(viewableLeaderBoardList));
            dispatch(setDataSource(viewableLeaderBoardList.slice(0, 10)));
            dispatch(setIsLoading(false));
        })
}

export const saveStakeAddress = (stakeValue) => dispatch => {
    axios.post("https://thorchain-microservice.herokuapp.com/api/saveStake", {stakeValue})
        .then((response) => {
            console.log("saved ", response.data.status);
        })
}
