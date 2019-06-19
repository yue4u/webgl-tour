import Index from "./pages/Index";
import Triangle from "./pages/Triangle/Index";

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
  }
];

export default routes;
