import { createEffect } from "solid-js";
import { createResource } from "solid-js";
import { onMount } from "solid-js";
import { lazy } from "solid-js";
import Frame from "./components/Frame";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Project = lazy(() => import("./pages/Project"));
const About = lazy(() => import("./pages/About"));
const Network = lazy(() => import("./pages/Network"));

import { initRouter, Route } from "./libs/router/Router";

const fetchData = async (path) => {
  let data = await fetch(`http://localhost:3000/api/${path}`);
  data = await data.json();
  return data.docs;
};

const fetchProjects = () => fetchData("projects");
const fetchAbout = async () => fetchData("about");
const fetchNetwork = async () => fetchData("friends");

export default function App() {
  const [projects] = createResource(fetchProjects);
  const [about] = createResource(fetchAbout);
  const [network] = createResource(fetchNetwork);

  initRouter();

  return (
    <Frame visible={true}>
      <Route route="/" component={Home} />
      <Route route="/projects" component={Projects} projects={projects()} />
      {/*  <Route route="/projects/:id" component={Project} projects={projects()} />
      <Route route="/about" component={About} about={about()} />
      <Route route="/network" component={Network} network={network()} /> */}
    </Frame>
  );
}
