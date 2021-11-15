import { Redirect, Route, Switch } from "react-router-dom";

import { ProjectsList, ProjectView, NoMatch } from "../../features";

import { HomePage } from "../../pages";

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
            <Redirect to="/home" />
          </Route>

          <RouteWithErrorBoundary exact path="/home">
            <HomePage />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary exact path="/projects">
            <ProjectsList />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/projects/:id">
            <ProjectView />
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
