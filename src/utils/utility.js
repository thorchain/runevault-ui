import _ from 'lodash'
import {stakeRef} from "../config/firebase";

// replacement for .toLocaleString(). That func does rounding that I don't like.
const AmounttoString = (amount) => {
  // Converting to string with rounding to 8 digits
  var parts = amount.toPrecision(8).replace(/\.?0+$/, '').split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function formatDate(lastUpdatedDate){
    return lastUpdatedDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
}

function pushData(jsonData) {
    jsonData.forEach(a =>
    {
        stakeRef.push({address: a.Address, date: new Date(a.Date).getTime(), amount: parseInt(a.Amount, 10), mode: a.Mode });
    })
}

function countUniqueAddresses(array) {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if(!map.has(item.address)){
            map.set(item.address, true);
            result.push({
                address: item.address
            });
        }
    }
    return result.length
}

function getLeaderBoardDatasource(stakeList) {
    const leaderBoardStakers = getLeaderBoardStakers(stakeList);
    const sortedViewList = [];
    for (var i = 0; i < leaderBoardStakers.length; i++) {
        sortedViewList.push({
            address: leaderBoardStakers[i].address,
            amount: leaderBoardStakers[i].amount - leaderBoardStakers[i].withdrawAmount,
            lastUpdated: leaderBoardStakers[i].date
        });
    }

    sortedViewList.sort((a, b) => Number(b.amount) - Number(a.amount));

    const viewableLeaderBoardList = [];

    for (var i = 0; i < sortedViewList.length; i++) {
        viewableLeaderBoardList.push({
            key: i,
            avatar: sortedViewList[i].address,
            address: sortedViewList[i].address,
            staked: (sortedViewList[i].amount).toLocaleString(),
            lastUpdated: formatDate(new Date(sortedViewList[i].lastUpdated)),
        });
    }
    return viewableLeaderBoardList;
}

function getLeaderBoardStakers(stakeModeList) {
    var result = [];
    stakeModeList.reduce(function (res, value) {
        if (!res[value.address]) {
            res[value.address] = {address: value.address, amount: 0,  mode: value.mode, withdrawAmount: 0, date: new Date(value.date).toISOString()};
            result.push(res[value.address])
        }
        if(value.mode == 'Staked') {
            res[value.address].amount += value.amount;
        }
        if(value.mode == 'Withdraw') {
            res[value.address].withdrawAmount += value.amount;
        }
        return res;
    }, {});
    return result.sort((a, b) => Number(b.amount) - Number(a.amount));
}

export {
  AmounttoString,
    formatDate,
    countUniqueAddresses,
    getLeaderBoardDatasource
}
