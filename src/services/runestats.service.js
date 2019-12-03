import axios from 'axios';
import {
    setDataSource, setIsError,
    setIsLoading,
    setLastUpdatedDate,
    seTotalStakers,
    setSakedSupply,
    setSumStake
} from '../actions/stakeaction';
import {formatDate} from "../utils/utility";
import {setLeaderBoardList} from "../actions/leaderboardaction";

export const getLeaderboardlist = () => dispatch => {
    axios.get("https://frozenbalances.herokuapp.com/frozen/RUNE-B1A")
        .then((response) => {
            dispatch(setIsLoading(false));
            const viewableLeaderBoardList = [];
            const runeAddressList = response.data;

            const sortedRuneAddressList = runeAddressList.sort((a, b) => Number(b.frozen) - Number(a.frozen));

            for (var i = 0; i < sortedRuneAddressList.length; i++) {
                viewableLeaderBoardList.push({
                    key: i,
                    avatar: sortedRuneAddressList[i].address,
                    address: sortedRuneAddressList[i].address,
                    staked: (sortedRuneAddressList[i].frozen.toLocaleString()),
                });
            }

            let totalFrozen = sortedRuneAddressList.reduce((acc,address) => { return address.frozen+acc},0);

            dispatch(setSumStake(totalFrozen.toLocaleString()));
            dispatch(setSakedSupply((totalFrozen/110052528*100).toLocaleString()));
            dispatch(seTotalStakers(viewableLeaderBoardList.length));
            dispatch(setLeaderBoardList(viewableLeaderBoardList));
            dispatch(setDataSource(viewableLeaderBoardList.slice(0, 10)));
            dispatch(setLastUpdatedDate(formatDate(new Date())));
            dispatch(setIsError(response.status === 404));

        })
}

export const saveStakeAddress = (stakeValue) => dispatch => {
    axios.post("https://thorchain-microservice.herokuapp.com/api/saveStake", {stakeValue})
        .then((response) => {
            console.log("saved ", response.data.status);
        })
}
