import { useState } from "react";
import { formatBalance } from "./utils/utils";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";

function App() {
  const [userAcc, setUserAcc] = useState(null);
  const [balance, setBalance] = useState(null);

  const onConnect = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAcc(window.ethereum.selectedAddress);
        await getBalance(window.ethereum.selectedAddress);
      } else {
        toast.error("Install Metamask");
      }
    } catch (error) {
      console.log(error);
    }
    toast.success("Connected success");
  };

  const getBalance = async (account) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
    );
    setBalance(balance);
  };

  return (
    <>
      <Header userAcc={userAcc} balance={balance} onConnect={onConnect} />
      <Form userAcc={userAcc} />
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
