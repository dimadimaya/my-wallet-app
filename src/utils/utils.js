export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(3);
  return balance;
};

export const formatUserAcc = (userAcc) => {
  const formatUserAcc = userAcc.slice(0, 5) + "..." + userAcc.slice(-4);
  return formatUserAcc;
};

export const isValidEthereumAddress = (address) => {
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethereumAddressRegex.test(address);
};

export const isValidAmountRange = (amount) => {
  return amount >= 0.000001 && amount <= 100000;
};

export const isValidAmountMultipleOfTen = (amount) => {
  const parts = amount.toString().split(".");
  if (parts.length === 1) {
    return true;
  } else if (parts.length === 2) {
    return parts[1].length <= 10;
  }
  return false;
};
