export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(3);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatUserAcc = (userAcc) => {
  const formatUserAcc = userAcc.slice(0, 5) + "..." + userAcc.slice(-4);
  return formatUserAcc;
};

export const convertEthToWei = (amountInEth) => {
  if (typeof amountInEth !== "number") {
    throw new Error("Invalid input. Amount should be a number.");
  }

  const decimals = 18; // Количество десятичных знаков в Ethereum
  const amountInWei = amountInEth * 10 ** decimals;

  return String(amountInWei);
};
