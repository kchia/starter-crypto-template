import { Button } from "../../../common/core";
import styles from "./hero.module.css";
export default function Hero() {
  function handleConnectButtonClick() {}

  return (
    <section>
      Hero
      <Button text="connect" handleClick={handleConnectButtonClick} />
    </section>
  );
}
