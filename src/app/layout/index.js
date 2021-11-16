import { Redirect, Route, Switch } from "react-router-dom";

import { ProjectsList, ProjectView } from "../../features";
import { HomePage, NoMatchPage } from "../../pages";

import { headerContainer, mainContainer } from "./layout.module.css";
import Header from "./header";
import Footer from "./footer";
import RouteWithErrorBoundary from "./route-with-error-boundary";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={mainContainer}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <RouteWithErrorBoundary path="/home">
            <HomePage />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary exact path="/projects">
            <ProjectsList />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/projects/:id">
            <ProjectView />
          </RouteWithErrorBoundary>

          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
