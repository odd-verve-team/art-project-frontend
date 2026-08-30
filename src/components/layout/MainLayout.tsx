import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { GlobalModal } from "../modals/GlobalModal"

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <GlobalModal />
    </div>
  )
}