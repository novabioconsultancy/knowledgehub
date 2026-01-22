import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import HomePage from '@/pages/HomePage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticlePage from '@/pages/ArticlePage';
import EventsPage from '@/pages/EventsPage';
import ContributorsPage from '@/pages/ContributorsPage';
import ContributorPage from '@/pages/ContributorPage';
import SubmitArticlePage from '@/pages/SubmitArticlePage';
import AboutPage from '@/pages/AboutPage';
import GuidelinesPage from '@/pages/GuidelinesPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-novabio-light grain">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:slug" element={<ArticlePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contributors" element={<ContributorsPage />} />
              <Route path="/contributors/:slug" element={<ContributorPage />} />
              <Route path="/submit" element={<SubmitArticlePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
