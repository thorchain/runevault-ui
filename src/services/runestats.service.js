import axios from 'axios';
import {
    setCirculatingSupply,
    setDataSource, setIsError,
    setIsLoading,
    setLastUpdatedDate,
    seTotalStakers,
    setSakedSupply,
    setSumStake
} from '../actions/stakeaction';
import {formatDate} from "../utils/utility";
import {setLeaderBoardList} from "../actions/leaderboardaction";

export const getCirculatingSupply = () => dispatch => {
    try {
        axios.get("https://api.coingecko.com/api/v3/coins/thorchain?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false", {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
            .then((response) => {
                dispatch(setCirculatingSupply(response.data.market_data.circulating_supply.toFixed(0)));
            })
            .catch(e => {
                dispatch(setIsError(true));
            })
    } catch (e) {
        dispatch(setIsError(true));
    }
}

export const getLeaderboardlist = () => dispatch => {
    dispatch(getCirculatingSupply());
    try {
        axios.get("https://frozenbalances.herokuapp.com/frozen/RUNE-B1A")
            .then((response) => {
                dispatch(setIsLoading(false));
                dispatch(setIsError(false));
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
                //dispatch(setSakedSupply((totalFrozen / 110052528 * 100).toLocaleString()));
                dispatch(setSakedSupply(totalFrozen));
                dispatch(seTotalStakers(viewableLeaderBoardList.length));
                dispatch(setLeaderBoardList(viewableLeaderBoardList));
                dispatch(setDataSource(viewableLeaderBoardList.slice(0, 10)));
                dispatch(setLastUpdatedDate(formatDate(new Date())));
                dispatch(setIsError(response.status === 404));

            })
            .catch(e => {
                dispatch(setIsLoading(false));
                dispatch(setIsError(true));
            })
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
    }
}
