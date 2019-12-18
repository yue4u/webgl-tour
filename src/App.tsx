import React, { Suspense } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Routes from "./Routes";

const Loading = () => <></>;

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Layout>
    </HashRouter>
  );
}
