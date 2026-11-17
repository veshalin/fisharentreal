import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EvidencePage } from './pages/EvidencePage';
import { AnatomyPage } from './pages/AnatomyPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { WitnessesPage } from './pages/WitnessesPage';
import { AgendaPage } from './pages/AgendaPage';
import { DemandsPage } from './pages/DemandsPage';
import { MerchandisePage } from './pages/MerchandisePage';
import { DatabasePage } from './pages/DatabasePage';
import { QuizPage } from './pages/QuizPage';
import { ReportPage } from './pages/ReportPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06141E] text-[#F5F3E9]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/anatomy" element={<AnatomyPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/witnesses" element={<WitnessesPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/demands" element={<DemandsPage />} />
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
