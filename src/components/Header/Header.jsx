// import { useState } from "react";
import logo from "../../icons/logo.svg";
import styles from "./Header.module.css";
import { formatUserAcc } from "../../utils/utils";
import PropTypes from "prop-types";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const Header = ({ userAcc, balance, onConnect }) => {
  //   const [userAcc, setUserAcc] = useState(null);
  //   const [balance, setBalance] = useState(null);

  //   const onConnect = async () => {
  //     try {
  //       if (window.ethereum) {
  //         await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });
  //         setUserAcc(window.ethereum.selectedAddress);
  //         await getBalance(window.ethereum.selectedAddress);
  //       } else {
  //         toast.error("Install Metamask");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     toast.success("Connected success");
  //   };

  //   const getBalance = async (account) => {
  //     const balance = formatBalance(
  //       await window.ethereum.request({
  //         method: "eth_getBalance",
  //         params: [account, "latest"],
  //       })
  //     );
  //     setBalance(balance);
  //   };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        {userAcc ? (
          <div className={styles.wallet__info}>
            <div>{balance}</div>
            <div>{formatUserAcc(userAcc)}</div>
          </div>
        ) : (
          <>
            <button onClick={onConnect} className={styles.connect}>
              Connect wallet
            </button>
          </>
        )}
      </header>
    </>
  );
};

Header.propTypes = {
  userAcc: PropTypes.string,
  balance: PropTypes.string,
  onConnect: PropTypes.func,
};
