import { useState } from "react";
import Web3 from "web3";
import {
  isValidAmountMultipleOfTen,
  isValidAmountRange,
  isValidEthereumAddress,
} from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Form.module.css";
import PropTypes from "prop-types";
import { SpinnerCircular } from "spinners-react";

export const Form = ({ userAcc }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);

  const sendTransaction = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      setIsLoading(true);

      const isValid = isValidEthereumAddress(recipientAddress);
      if (!isValid) {
        setIsValidAddress(false);
        return;
      }

      if (!isValidAmountRange(amount)) {
        toast.error(
          "The number of tokens must be in the range from 0.000001 to 100000"
        );
        setIsLoading(false);
        return;
      }

      if (!isValidAmountMultipleOfTen(amount)) {
        toast.error("The number of tokens must be a multiple of 10");
        setIsLoading(false);
        return;
      }

      const weiAmount = web3.utils.toWei(amount.toString(), "ether");

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAcc,
            to: recipientAddress,
            value: weiAmount,
          },
        ],
      });
      toast.success("Transaction success");
      setRecipientAddress("");
      setAmount("");
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValidAddress(true);
    const isValid = isValidEthereumAddress(recipientAddress);
    if (!isValid) {
      setIsValidAddress(false);
    } else {
      sendTransaction();
    }
  };

  const handleRecipientAddressChange = (e) => {
    const address = e.target.value;
    setRecipientAddress(address);
    setIsValidAddress(isValidEthereumAddress(address));
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter eth address"
          value={recipientAddress}
          onChange={handleRecipientAddressChange}
        />
        {!isValidAddress && recipientAddress.trim() !== "" && (
          <div className={styles.error}>Wrong address</div>
        )}
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          disabled={!isValidAddress}
          className={styles.send}
        >
          {isLoading ? (
            <SpinnerCircular
              size={20}
              thickness={100}
              speed={100}
              color="#FFFFFF"
              secondaryColor="#3E85F3"
            />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  userAcc: PropTypes.string,
};
