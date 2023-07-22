import { useState } from "react";
// import { ethers } from "ethers";
import { formatBalance, formatUserAcc } from "./utils/utils";
import "./App.css";
import Web3 from "web3";

function App() {
  const [userAcc, setUserAcc] = useState(null);
  const [balance, setBalance] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const provider = new ethers.providers.Web3Provider(ethereum);

  const onConnect = async () => {
    try {
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAcc(account[0]);
        await getBalance(account[0]);
      } else {
        alert("Install Metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getBalance = (account) => {
  //   window.ethereum
  //     .request({
  //       method: "eth_getBalance",
  //       params: [account, "latest"],
  //     })
  //     .then((balance) => {
  //       console.log(balance);
  //       setBalance(ethers.utils.formatEther(balance));
  //     })
  //     .catch((error) => console.log(error));
  // };

  const getBalance = async (account) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
    );
    setBalance(balance);
  };

  const send = () => {
    const web3 = new Web3();
    setIsLoading(true);
    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAcc,
            to: recipientAddress,
            value: web3.utils.toWei(amount.toString(), "ether"),
            // gasLimit: "0",
            // maxPriorityFeePerGas: "0",
            // maxFeePerGas: "0",
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <div className="container">
      <div className="header">
        <div>Logo</div>
        {userAcc ? (
          <div className="wallet__info">
            <div>{balance}</div>
            <div>{formatUserAcc(userAcc)}</div>
          </div>
        ) : (
          <>
            <button onClick={onConnect}>Connect wallet</button>
          </>
        )}
      </div>
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Введите адрес получателя"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
