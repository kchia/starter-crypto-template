import { Redirect, Route, Switch } from "react-router-dom";

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
        <Switch>
          <Route exact path="/">
            <Redirect to="/coins" />
          </Route>

          <Route exact path="/coins">
            <CoinsList />
          </Route>
          <Route path="/coins/:id">
            <CoinView />
          </Route>

          <Route exact path="/collectibles">
            <CollectiblesList />
          </Route>
          <Route path="/collectibles/:address/:id">
            <CollectibleView />
          </Route>

          <Route exact path="/favorites">
            <FavoritesList />
          </Route>
          <Route path="/favorites/new">
            <FavoriteCreate />
          </Route>
          <Route path="/favorites/:id/edit">
            <FavoriteEdit />
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
