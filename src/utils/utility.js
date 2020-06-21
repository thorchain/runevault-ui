// replacement for .toLocaleString(). That func does rounding that I don't like.
const AmounttoString = (amount) => {
  // Converting to string with rounding to 8 digits
  var parts = amount.toPrecision(8).replace(/\.?0+$/, '').split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const StringToAmount = (string) => {
  // Converting from string
  const number = string.replace(/,/g, "");
  const final = Number(number).toFixed(2)
  return final;
}

function formatDate(lastUpdatedDate){
    return lastUpdatedDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
}

export {
  AmounttoString, StringToAmount,
    formatDate
}
