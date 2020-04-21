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
import { formatDate } from "../utils/utility";
import { setLeaderBoardList } from "../actions/leaderboardaction";
import { config } from "../env";

export const getCirculatingSupply = () => dispatch => {
    axios.get(`${config.coingeckoApi}`, {
        headers: {"Access-Control-Allow-Origin": "*"}
    })
        .then((response) => {
            dispatch(setCirculatingSupply(response.data.market_data.circulating_supply.toFixed(0)));
        })
}

export const getLeaderboardlist = () => dispatch => {
    try {
        dispatch(getCirculatingSupply());
        axios.get(`${config.frozenApi}/frozen/RUNE-B1A`)
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

                let totalFrozen = sortedRuneAddressList.reduce((acc, address) => {
                    return address.frozen + acc
                }, 0);

                dispatch(setSumStake(totalFrozen.toLocaleString()));
                dispatch(setSakedSupply(totalFrozen));
                dispatch(seTotalStakers(viewableLeaderBoardList.length));
                dispatch(setLeaderBoardList(viewableLeaderBoardList));
                dispatch(setDataSource(viewableLeaderBoardList.slice(0, 10)));
                dispatch(setLastUpdatedDate(formatDate(new Date())));
                dispatch(setIsError(response.status === 404));

            })
            .catch(() => {
                dispatch(setIsLoading(false));
                dispatch(setIsError(true));
            })
    } catch (e) {
        dispatch(setIsLoading(false));
        dispatch(setIsError(true));
    }
}
