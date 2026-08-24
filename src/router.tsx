import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Outlet 
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* Home Page */}
      <Route index element={<div>Головна сторінка (Шаблон)</div>} />
      
      {/* Future Pages */}
      <Route path="catalog" element={<div>Каталог</div>} />
      
      {/* Error 404 */}
      <Route path="*" element={<div>404 - Сторінку не знайдено</div>} />
    </Route>
  )
);