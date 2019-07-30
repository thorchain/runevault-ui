import _ from 'lodash'

// replacement for .toLocaleString(). That func does rounding that I don't like.
const AmounttoString = (amount) => {
  // Converting to string with rounding to 8 digits
  var parts = amount.toPrecision(8).replace(/\.?0+$/, '').split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function mapStakeValueWithAddress(stakeList) {
    var groups = _.groupBy(stakeList, 'address');
    var adressByHighestStake = _.map(groups, function (value, key) {
        return {
            address: key,
            amount: _.reduce(value, function (total, o) {
                return total + parseInt(o.amount);
            }, 0)
        };
    });

    adressByHighestStake.sort((a, b) => Number(b.amount) - Number(a.amount));

    return adressByHighestStake;
}

export {
  AmounttoString,
  mapStakeValueWithAddress
}
