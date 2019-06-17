import React from "react";
import About from "./pages/About";
import Home from "./pages/Home/Index";

interface Routes {
  title: string;
  url: string;
  component: () => JSX.Element;
}

const routes: Routes[] = [
  {
    title: "Day 1",
    url: "/",
    component: Home
  }
];

export default routes;
