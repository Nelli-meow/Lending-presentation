import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Workflow } from './components/Workflow';
import { Cases } from './components/Cases';
import Contact from "./components/Contact.tsx";


export const App = () => (
  <>
    <Header />
    <main id="top">
      <About />
      <Workflow />
      <Cases />
      <Contact />
    </main>
    <Footer />
  </>
);
