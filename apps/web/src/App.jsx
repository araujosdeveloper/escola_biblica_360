
import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.jsx';
import OfflineIndicator from '@/components/OfflineIndicator.jsx';
import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

// Public Pages
import HomePage from '@/pages/HomePage.jsx';
import EstudosBiblicoPage from '@/pages/EstudosBiblicoPage.jsx';
import LicoesEBDPage from '@/pages/LicoesEBDPage.jsx';
import ProfessoresPage from '@/pages/ProfessoresPage.jsx';
import EscatologiaPage from '@/pages/EscatologiaPage.jsx';
import SermoesPage from '@/pages/SermoesPage.jsx';
import InfantilPage from '@/pages/InfantilPage.jsx';
import DownloadsPage from '@/pages/DownloadsPage.jsx';
import SobrePage from '@/pages/SobrePage.jsx';
import ContatoPage from '@/pages/ContatoPage.jsx';
import PostDetailPage from '@/pages/PostDetailPage.jsx';
import CategoryPage from '@/pages/CategoryPage.jsx';
import SearchPage from '@/pages/SearchPage.jsx';
import AdminGuidePage from '@/pages/AdminGuidePage.jsx';
import { NotFoundPage, ServerErrorPage, ServiceUnavailablePage } from '@/pages/error/ErrorPages.jsx';

// Admin Context & Components
import { AdminAuthProvider } from '@/admin/context/AdminAuthContext.jsx';
import ProtectedAdminRoute from '@/admin/components/ProtectedAdminRoute.jsx';
import AdminLayout from '@/admin/components/AdminLayout.jsx';
import AdminLogin from '@/admin/pages/AdminLogin.jsx';

// Lazy Loaded Admin Pages
const AdminDashboard = lazy(() => import('@/admin/pages/AdminDashboard.jsx'));
const AdminPosts = lazy(() => import('@/admin/pages/AdminPosts.jsx'));
const AdminPostNew = lazy(() => import('@/admin/pages/AdminPostNew.jsx'));
const AdminPostEdit = lazy(() => import('@/admin/pages/AdminPostEdit.jsx'));
const AdminCategories = lazy(() => import('@/admin/pages/AdminCategories.jsx'));
const AdminDownloads = lazy(() => import('@/admin/pages/AdminDownloads.jsx'));
const AdminDownloadNew = lazy(() => import('@/admin/pages/AdminDownloadNew.jsx'));
const AdminDownloadEdit = lazy(() => import('@/admin/pages/AdminDownloadEdit.jsx'));
const AdminNewsletter = lazy(() => import('@/admin/pages/AdminNewsletter.jsx'));
const AdminMessages = lazy(() => import('@/admin/pages/AdminMessages.jsx'));
const AdminSettings = lazy(() => import('@/admin/pages/AdminSettings.jsx'));
const MediaLibraryPage = lazy(() => import('@/admin/pages/MediaLibraryPage.jsx'));
const AdminUsersPage = lazy(() => import('@/admin/pages/AdminUsersPage.jsx'));
const AdminLogsPage = lazy(() => import('@/admin/pages/AdminLogsPage.jsx'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-admin-dark" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <OfflineIndicator />
          <Toaster position="top-right" richColors />
          
          <AdminAuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/estudos-biblicos" element={<EstudosBiblicoPage />} />
              <Route path="/licoes-ebd" element={<LicoesEBDPage />} />
              <Route path="/escatologia" element={<EscatologiaPage />} />
              <Route path="/sermoes" element={<SermoesPage />} />
              <Route path="/infantil" element={<InfantilPage />} />
              <Route path="/professores" element={<ProfessoresPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/busca" element={<SearchPage />} />
              <Route path="/categoria/:slug" element={<CategoryPage />} />
              <Route path="/artigo/:slug" element={<PostDetailPage />} />
              <Route path="/guia-admin" element={<AdminGuidePage />} />

              {/* Error Routes */}
              <Route path="/500" element={<ServerErrorPage />} />
              <Route path="/503" element={<ServiceUnavailablePage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/admin/*" element={
                <ProtectedAdminRoute>
                  <AdminLayout>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        
                        <Route path="posts" element={<AdminPosts />} />
                        <Route path="posts/new" element={<AdminPostNew />} />
                        <Route path="posts/edit/:id" element={<AdminPostEdit />} />
                        
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="media" element={<MediaLibraryPage />} />
                        
                        <Route path="downloads" element={<AdminDownloads />} />
                        <Route path="downloads/new" element={<AdminDownloadNew />} />
                        <Route path="downloads/edit/:id" element={<AdminDownloadEdit />} />
                        
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="logs" element={<AdminLogsPage />} />
                        
                        <Route path="newsletter" element={<AdminNewsletter />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="settings" element={<AdminSettings />} />
                        
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </Suspense>
                  </AdminLayout>
                </ProtectedAdminRoute>
              } />

              {/* 404 Route Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AdminAuthProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
