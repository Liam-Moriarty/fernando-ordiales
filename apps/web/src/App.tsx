import { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Work } from './pages/Work';

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      // With AnimatePresence mode="wait" the target section only mounts once
      // the old page has finished exiting, so retry across frames until the
      // element exists. Instant, because a cross-page smooth sweep disorients.
      const id = hash.slice(1);
      let tries = 0;
      let frame = 0;
      const attempt = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        } else if (tries++ < 60) {
          frame = requestAnimationFrame(attempt);
        }
      };
      attempt();
      return () => cancelAnimationFrame(frame);
    }
    // Back/forward keeps the browser's own scroll restoration.
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return undefined;
  }, [pathname, hash, navigationType]);

  return null;
};

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:bg-elevated focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <ScrollManager />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
