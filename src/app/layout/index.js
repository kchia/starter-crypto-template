import {
  CoinsList,
  CoinView,
  CollectiblesList,
  CollectibleView,
  FavoritesList,
  FavoriteCreate,
  FavoriteEdit,
  NoMatch,
} from "../../features";

import { headerContainer, mainContainer } from "./layout.module.css";
import Navigation from "./navigation";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <div className={headerContainer}>
        <Header />
        <Navigation />
      </div>
      <main className={mainContainer}>
        <CoinsList />
        <CoinView />
        <CollectiblesList />
        <CollectibleView />
        <FavoritesList />
        <FavoriteCreate />
        <FavoriteEdit />
        <NoMatch />
      </main>
      <Footer />
    </>
  );
}
