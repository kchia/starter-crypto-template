import styles from "./how-it-works.module.css";

export default function HowItWorks() {
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>How it works</h2>
      <ol>
        <li>
          Install the <a href="https://www.hiro.so/wallet">Hiro Wallet</a>. The
          wallet allows you to connect with MiamiStarter using your digital
          assets and identity.
        </li>
        <li>Buy MiamiCoin ($MIA).</li>
        <li>Login to MiamiStarter with your wallet.</li>
        <li>Vote on projects or invest directly in teams with $MIA.</li>
      </ol>
    </article>
  );
}
