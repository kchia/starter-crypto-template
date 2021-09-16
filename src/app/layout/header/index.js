import { Link } from "react-router-dom";

import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <Link className={styles.headerLink} to="/">
        <h1>MyCryptoTracker</h1>
      </Link>
    </header>
  );
}
