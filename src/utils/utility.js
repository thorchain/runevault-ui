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

export {
  AmounttoString,
    formatDate,
}
