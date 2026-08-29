import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
} from 'react-router-dom'

import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ArtworkDetailsPage } from '@/pages/ArtworkDetailsPage';
import { ArtistProfilePage } from '@/pages/ArtistProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AdminPage } from '@/pages/AdminPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Публічні маршрути*/}
      <Route index element={<HomePage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="artworks/:id" element={<ArtworkDetailsPage />} />
      <Route path="artists/:id" element={<ArtistProfilePage />} />

      {/* Авторизація */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Особистий кабінет та панель керування */}
      <Route path="profile" element={<ProfilePage />} />
      <Route path="admin" element={<AdminPage />} />

      {/* Сторінка не знайдена */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);