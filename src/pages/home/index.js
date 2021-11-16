import Hero from "./hero";
import { ProjectsList } from "../../features";
import HowItWorks from "./how-it-works";
import About from "./about";

export default function HomePage() {
  return (
    <section>
      <h2>Home Page</h2>
      <Hero />
      <ProjectsList />
      <HowItWorks />
      <About />
    </section>
  );
}
