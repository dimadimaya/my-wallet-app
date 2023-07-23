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
