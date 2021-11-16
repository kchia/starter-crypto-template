import { Link } from "react-router-dom";
import { Button } from "../../../common/core";
import styles from "./header.module.css";
import Navigation from "../navigation";

export default function Header() {
  function handleConnectButtonClick() {}
  return (
    <header className={styles.headerContainer}>
      <div>
        <Link className={styles.headerLink} to="/">
          <h1>MiamiStarter</h1>
        </Link>
        <Navigation />
      </div>
      <Button text="connect" handleClick={handleConnectButtonClick} />
    </header>
  );
}
