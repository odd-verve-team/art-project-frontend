import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { MainLayout } from '@/components/layout/MainLayout';
import { ProfileLayout } from '@/components/layout/ProfileLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ArtworkPage } from '@/pages/ArtworkPage';
import { ArtistProfilePage } from '@/pages/ArtistProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminPage } from '@/pages/AdminPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfileSettings } from '@/components/features/Profile/ProfileSettings';
import { ProfileFavorites } from '@/components/features/Profile/ProfileFavorites';
import { ProfileNotifications } from '@/components/features/Profile/ProfileNotifications';
import { ProfileMyArts } from '@/components/features/Profile/ProfileMyArts';
import { ProfileNewArt } from '@/components/features/Profile/ProfileNewArt';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Standalone Auth Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main Layout Routes */}
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:id" element={<ArtworkPage />} />
        <Route path="artists/:id" element={<ArtistProfilePage />} />

        {/* Protected Profile & Admin Routes */}
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'artist', 'admin']}>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="settings" replace />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="favorites" element={<ProfileFavorites />} />
          <Route path="notifications" element={<ProfileNotifications />} />

          {/* Artist Only Routes */}
          <Route
            path="arts"
            element={
              <ProtectedRoute allowedRoles={['artist']}>
                <ProfileMyArts />
              </ProtectedRoute>
            }
          />
          <Route
            path="arts/new"
            element={
              <ProtectedRoute allowedRoles={['artist']}>
                <ProfileNewArt />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Route */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>,
  ),
);
