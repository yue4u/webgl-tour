import Index from "./pages/Index";
import Triangle from "./pages/Triangle/Index";
import Triangle2 from "./pages/Triangle2/Index";
import Color from "./pages/Color/Index";

interface Routes {
  title: string;
  url: string;
  component: () => JSX.Element;
}

const routes: Routes[] = [
  {
    title: "Home",
    url: "/",
    component: Index
  },
  {
    title: "Triangle",
    url: "/triangle",
    component: Triangle
  },
  {
    title: "Triangle-2",
    url: "/triangle-2",
    component: Triangle2
  },
  {
    title: "Color",
    url: "/color",
    component: Color
  }
];

export default routes;
