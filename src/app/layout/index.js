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
import RouteWithErrorBoundary from "./route-with-error-boundary";

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

          <RouteWithErrorBoundary exact path="/coins">
            <CoinsList />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/coins/:id">
            <CoinView />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary exact path="/collectibles">
            <CollectiblesList />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/collectibles/:id">
            <CollectibleView />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary exact path="/favorites">
            <FavoritesList />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/favorites/new">
            <FavoriteCreate />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/favorites/:id/edit">
            <FavoriteEdit />
          </RouteWithErrorBoundary>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
