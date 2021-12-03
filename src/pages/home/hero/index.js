import LazyHero from "react-lazy-hero";

import { Auth } from "../../../features";
import styles from "./hero.module.css";
export default function Hero() {
  return (
    <LazyHero
      opacity={0.1}
      isCentered={false}
      isFixed
      imageSrc="https://source.unsplash.com/2000x1000/?miami"
      minHeight="80vh"
      className={styles.heroContainer}
    >
      <h2>Invest in the Miami you believe in.</h2>
      <h3>Vote on highly vetted ideas and teams based in Miami.</h3>
      <h3>Or invest with $MIA.</h3>
      {/* <Auth /> */}
    </LazyHero>
  );
}
