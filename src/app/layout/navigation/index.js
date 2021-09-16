import styles from "./navigation.module.css";
export default function Navigation() {
  return (
    <nav>
      <ul className={styles.navBar}>
        <li className={styles.navLinkContainer}>Home</li>
        <li className={styles.navLinkContainer}>Coins</li>
        <li className={styles.navLinkContainer}>Collectibles</li>
        <li className={styles.navLinkContainer}>Favorites</li>
      </ul>
    </nav>
  );
}
