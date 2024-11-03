import { ReactNode } from "react";
import Sidebar from "../../components/shared/Sidebar";
import { useSidebar } from "../../store/useSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpinner } from "../../store/useSpinner";
import Spinner from "./Spinner";

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen } = useSidebar();
  const { isSpinnerOpen } = useSpinner();

  return (
    <main className="w-full h-[100dvh] flex flex-row relative">
      {isSpinnerOpen && <Spinner />}
      <ToastContainer />
      <Sidebar />
      <section
        className={`flex-1 flex-col ${
          isSidebarOpen ? "ml-40" : "ml-20"
        } w-full transition-all duration-300 px-6 py-3`}
      >
        {children}
      </section>
    </main>
  );
};

export default MainWrapper;
