
import React, { Suspense, lazy } from 'react';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import ScrollToTop from '@/components/ScrollToTop.jsx';
import SEO from '@/components/SEO.jsx';

import { ErrorBoundary } from '@/components/ErrorBoundary.jsx';
import OfflineIndicator from '@/components/OfflineIndicator.jsx';

import { Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

/* =========================
   PUBLIC PAGES
========================= */

const HomePage = lazy(() => import('@/pages/HomePage.jsx'));
const EstudosBiblicoPage = lazy(() => import('@/pages/EstudosBiblicoPage.jsx'));
const LicoesEBDPage = lazy(() => import('@/pages/LicoesEBDPage.jsx'));
const ProfessoresPage = lazy(() => import('@/pages/ProfessoresPage.jsx'));
const EscatologiaPage = lazy(() => import('@/pages/EscatologiaPage.jsx'));
const SermoesPage = lazy(() => import('@/pages/SermoesPage.jsx'));
const InfantilPage = lazy(() => import('@/pages/InfantilPage.jsx'));
const DownloadsPage = lazy(() => import('@/pages/DownloadsPage.jsx'));
const SobrePage = lazy(() => import('@/pages/SobrePage.jsx'));
const ContatoPage = lazy(() => import('@/pages/ContatoPage.jsx'));
const PostDetailPage = lazy(() => import('@/pages/PostDetailPage.jsx'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage.jsx'));
const SearchPage = lazy(() => import('@/pages/SearchPage.jsx'));
const AdminGuidePage = lazy(() => import('@/pages/AdminGuidePage.jsx'));

const {
  NotFoundPage,
  ServerErrorPage,
  ServiceUnavailablePage,
} = lazy(() =>
  import('@/pages/error/ErrorPages.jsx')
);

/* =========================
   ADMIN
========================= */

import { AdminAuthProvider } from '@/admin/context/AdminAuthContext.jsx';

import ProtectedAdminRoute from '@/admin/components/ProtectedAdminRoute.jsx';

import AdminLayout from '@/admin/components/AdminLayout.jsx';

const AdminLogin = lazy(() => import('@/admin/pages/AdminLogin.jsx'));

const AdminDashboard = lazy(() =>
  import('@/admin/pages/AdminDashboard.jsx')
);

const AdminPosts = lazy(() =>
  import('@/admin/pages/AdminPosts.jsx')
);

const AdminPostNew = lazy(() =>
  import('@/admin/pages/AdminPostNew.jsx')
);

const AdminPostEdit = lazy(() =>
  import('@/admin/pages/AdminPostEdit.jsx')
);

const AdminCategories = lazy(() =>
  import('@/admin/pages/AdminCategories.jsx')
);

const AdminDownloads = lazy(() =>
  import('@/admin/pages/AdminDownloads.jsx')
);

const AdminDownloadNew = lazy(() =>
  import('@/admin/pages/AdminDownloadNew.jsx')
);

const AdminDownloadEdit = lazy(() =>
  import('@/admin/pages/AdminDownloadEdit.jsx')
);

const AdminNewsletter = lazy(() =>
  import('@/admin/pages/AdminNewsletter.jsx')
);

const AdminMessages = lazy(() =>
  import('@/admin/pages/AdminMessages.jsx')
);

const AdminSettings = lazy(() =>
  import('@/admin/pages/AdminSettings.jsx')
);

const MediaLibraryPage = lazy(() =>
  import('@/admin/pages/MediaLibraryPage.jsx')
);

const AdminUsersPage = lazy(() =>
  import('@/admin/pages/AdminUsersPage.jsx')
);

const AdminLogsPage = lazy(() =>
  import('@/admin/pages/AdminLogsPage.jsx')
);

/* =========================
   LOADER
========================= */

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-admin-gold" />

        <p className="text-sm font-medium text-muted-foreground">
          Carregando conteúdo...
        </p>
      </div>
    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SEO />

        <ScrollToTop />

        <OfflineIndicator />

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3500}
        />

        <AdminAuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* =========================
                  PUBLIC ROUTES
              ========================= */}

              <Route path="/" element={<HomePage />} />

              <Route
                path="/estudos-biblicos"
                element={<EstudosBiblicoPage />}
              />

              <Route
                path="/licoes-ebd"
                element={<LicoesEBDPage />}
              />

              <Route
                path="/escatologia"
                element={<EscatologiaPage />}
              />

              <Route
                path="/sermoes"
                element={<SermoesPage />}
              />

              <Route
                path="/infantil"
                element={<InfantilPage />}
              />

              <Route
                path="/professores"
                element={<ProfessoresPage />}
              />

              <Route
                path="/downloads"
                element={<DownloadsPage />}
              />

              <Route
                path="/sobre"
                element={<SobrePage />}
              />

              <Route
                path="/contato"
                element={<ContatoPage />}
              />

              <Route
                path="/busca"
                element={<SearchPage />}
              />

              <Route
                path="/categoria/:slug"
                element={<CategoryPage />}
              />

              <Route
                path="/artigo/:slug"
                element={<PostDetailPage />}
              />

              <Route
                path="/guia-admin"
                element={<AdminGuidePage />}
              />

              {/* =========================
                  ERROR PAGES
              ========================= */}

              <Route
                path="/500"
                element={<ServerErrorPage />}
              />

              <Route
                path="/503"
                element={<ServiceUnavailablePage />}
              />

              {/* =========================
                  ADMIN LOGIN
              ========================= */}

              <Route
                path="/admin/login"
                element={<AdminLogin />}
              />

              {/* =========================
                  ADMIN ROUTES
              ========================= */}

              <Route
                path="/admin/*"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Navigate
                              to="dashboard"
                              replace
                            />
                          }
                        />

                        <Route
                          path="dashboard"
                          element={<AdminDashboard />}
                        />

                        {/* POSTS */}

                        <Route
                          path="posts"
                          element={<AdminPosts />}
                        />

                        <Route
                          path="posts/new"
                          element={<AdminPostNew />}
                        />

                        <Route
                          path="posts/edit/:id"
                          element={<AdminPostEdit />}
                        />

                        {/* CATEGORIES */}

                        <Route
                          path="categories"
                          element={<AdminCategories />}
                        />

                        {/* MEDIA */}

                        <Route
                          path="media"
                          element={<MediaLibraryPage />}
                        />

                        {/* DOWNLOADS */}

                        <Route
                          path="downloads"
                          element={<AdminDownloads />}
                        />

                        <Route
                          path="downloads/new"
                          element={<AdminDownloadNew />}
                        />

                        <Route
                          path="downloads/edit/:id"
                          element={<AdminDownloadEdit />}
                        />

                        {/* USERS */}

                        <Route
                          path="users"
                          element={<AdminUsersPage />}
                        />

                        {/* LOGS */}

                        <Route
                          path="logs"
                          element={<AdminLogsPage />}
                        />

                        {/* NEWSLETTER */}

                        <Route
                          path="newsletter"
                          element={<AdminNewsletter />}
                        />

                        {/* MESSAGES */}

                        <Route
                          path="messages"
                          element={<AdminMessages />}
                        />

                        {/* SETTINGS */}

                        <Route
                          path="settings"
                          element={<AdminSettings />}
                        />

                        {/* FALLBACK */}

                        <Route
                          path="*"
                          element={
                            <Navigate
                              to="dashboard"
                              replace
                            />
                          }
                        />
                      </Routes>
                    </AdminLayout>
                  </ProtectedAdminRoute>
                }
              />

              {/* =========================
                  404
              ========================= */}

              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </Suspense>
        </AdminAuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;