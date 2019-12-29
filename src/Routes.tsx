import { lazy, LazyExoticComponent } from "react";

interface Routes {
  title: string;
  url: string;
  component?: LazyExoticComponent<() => JSX.Element>;
}

const routes: Routes[] = [
  {
    title: "Home",
    url: "/",
    component: lazy(() => import("./pages"))
  },
  {
    title: "Triangle",
    url: "/triangle",
    component: lazy(() => import("./pages/Triangle"))
  },
  {
    title: "Triangle 2",
    url: "/triangle-2",
    component: lazy(() => import("./pages/Triangle2"))
  },
  {
    title: "Triangle 3",
    url: "/triangle-3",
    component: lazy(() => import("./pages/Triangle3"))
  },
  {
    title: "Triangle 4",
    url: "/triangle-4",
    component: lazy(() => import("./pages/Triangle4"))
  },
  {
    title: "Random Rectangle",
    url: "/random-rectangle",
    component: lazy(() => import("./pages/RandomRectangle"))
  },
  {
    title: "Master Xiang",
    url: "/master-xiang",
    component: lazy(() => import("./pages/MasterXiang"))
  },
  {
    title: "Cube",
    url: "/cube",
    component: lazy(() => import("./pages/Cube"))
  },
  {
    title: "Cube Yama",
    url: "/cube-yama",
    component: lazy(() => import("./pages/CubeYama"))
  },
  {
    title: "Three",
    url: "/three",
    component: lazy(() => import("./pages/Three"))
  },
  {
    title: "React Three Fiber Test",
    url: "/react-three-fiber-test",
    component: lazy(() => import("./pages/ReactThreeFiberTest"))
  },
  {
    title: "Shader Stars",
    url: "/shader-stars",
    component: lazy(() => import("./pages/ShaderStars"))
  },
  {
    title: "Noise",
    url: "/shader-noise",
    component: lazy(() => import("./pages/Noise"))
  }
];

export default routes;
