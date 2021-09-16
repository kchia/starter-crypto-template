import { Redirect, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "../../common/core";
import { logError } from "../../common/utils";

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

          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route exact path="/coins">
              <CoinsList />
            </Route>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route path="/coins/:id">
              <CoinView />
            </Route>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route exact path="/collectibles">
              <CollectiblesList />
            </Route>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route path="/collectibles/:id">
              <CollectibleView />
            </Route>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route exact path="/favorites">
              <FavoritesList />
            </Route>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route path="/favorites/new">
              <FavoriteCreate />
            </Route>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <Route path="/favorites/:id/edit">
              <FavoriteEdit />
            </Route>
          </ErrorBoundary>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
