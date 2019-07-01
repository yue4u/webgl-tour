import Color from "./pages/Color/Index";
import Index from "./pages/Index";
import RandomRectangle from "./pages/RandomRectangle";
import Triangle from "./pages/Triangle/Index";
import Triangle2 from "./pages/Triangle2/Index";
import Triangle3 from "./pages/Triangle3/Index";

interface Routes {
  title: string;
  url: string;
  component: () => JSX.Element;
}

const routes: Routes[] = [
  {
    title: "Home",
    url: "/",
    component: Index,
  },
  {
    title: "Triangle",
    url: "/triangle",
    component: Triangle,
  },
  {
    title: "Triangle-2",
    url: "/triangle-2",
    component: Triangle2,
  },
  { title: "Triangle-3", url: "/triangle-3", component: Triangle3 },
  {
    title: "Color",
    url: "/color",
    component: Color,
  },
  {
    title: "Random Rectangle",
    url: "/random-rectangle",
    component: RandomRectangle,
  },
];

export default routes;
