import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Routes from "./Routes";
export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          {Routes.map((route, key) => (
            <Route
              exact
              key={`route-${key}`}
              path={process.env.PUBLIC_URL + route.url}
              component={route.component}
            />
          ))}
        </Switch>
      </Layout>
    </HashRouter>
  );
}
