import { Link } from "react-router-dom";

import styles from "./navigation.module.css";
export default function Navigation() {
  return (
    <nav>
      <ul className={styles.navBar}>
        <li className={styles.navLinkContainer}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </li>
        <li className={styles.navLinkContainer}>
          <Link className={styles.navLink} to="/coins">
            Coins
          </Link>
        </li>
        <li className={styles.navLinkContainer}>
          <Link className={styles.navLink} to="/collectibles">
            Collectibles
          </Link>
        </li>
        <li className={styles.navLinkContainer}>
          <Link className={styles.navLink} to="/favorites">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}
