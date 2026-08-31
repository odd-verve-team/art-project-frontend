import { Outlet } from "react-router-dom"
import { Header } from "./Header/Header"
import { PreFooter } from "./Footer/PreFooter"
import { Footer } from "./Footer/Footer"
import { GlobalModal } from "../modals/GlobalModal"

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-[48px]">
        <Outlet />
      </main>
      <PreFooter />
      <Footer />

      <GlobalModal />
    </div>
  );
}