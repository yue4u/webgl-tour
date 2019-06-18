import Index from "./pages/Index";
import D1 from "./pages/day-1/Index";
import D2 from "./pages/day-2/Index";

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
    title: "Day 1",
    url: "/day-1",
    component: D1
  },
  {
    title: "Day 2",
    url: "/day-2",
    component: D2
  }
];

export default routes;
