import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      Created by{" "}
      <a
        href="https://github.com/dimadimaya/my-wallet-app"
        target="_blank"
        rel="noreferrer"
      >
        Dima Samoilik
      </a>
    </footer>
  );
};
