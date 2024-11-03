import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useSidebar } from "../../store/useSidebar";
import bizLogo from "../../assets/images/biz-logo.png";
import ArrowRight from "../../assets/ArrowRight";
import FaceFrown from "../../assets/FaceFrown";
import ArrowLeft from "../../assets/ArrowLeft";
import Accordion from "./Accordion";
import DropDown from "./DropDown";
import LogOutIcon from "../../assets/LogOutIcon";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  open: {
    width: "10rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const menuData = [
  {
    title: "정기권",
    content: [
      {
        title: "이용현황",
        content: "/ticket",
      },
      {
        title: "신청목록",
        content: "/ticket-request",
      },
      {
        title: "신청하기",
        content: "/ticket-request/new",
      },
    ],
  },
  {
    title: "결제 / 환불",
    content: [
      {
        title: "결제이력",
        content: "/payment",
        children: [
          {
            title: "결제상세",
            content: "/payment/detail",
          },
        ],
      },
    ],
  },
  {
    title: "파트너",
    content: [
      {
        title: "파트너상세",
        content: "/partner",
      },
      {
        title: "멤버목록",
        content: "/partner-user",
      },
    ],
  },
];

const dummyData = {
  data: {
    userName: "테스트",
  },
};

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const containerControls = useAnimationControls();
  const { data } = dummyData;
  useEffect(() => {
    if (isSidebarOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isSidebarOpen]);

  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      initial="open"
      className={`bg-white flex flex-col z-10 gap-5 p-5 absolute items-center top-0 left-0 h-full shadow`}
    >
      <div className={`flex w-full justify-center place-items-center`}>
        {isSidebarOpen ? (
          <img src={bizLogo} className="object-cover" />
        ) : (
          <FaceFrown />
        )}
      </div>
      <button
        className="p-1 rounded flex items-center justify-center"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
      </button>
      <div
        className={`w-full flex ${
          isSidebarOpen && "flex-col gap-0"
        }  items-center justify-center`}
      >
        <img
          className={`${
            isSidebarOpen ? "w-20 h-20" : "w-10 h-10"
          } border-none rounded-full`}
          src="https://img.freepik.com/free-psd/3d-illustration-bald-person_23-2149436183.jpg?t=st=1729943150~exp=1729946750~hmac=c8c0d8f36ed5fbf304c8e03da5ae93f6ade5b8a146220329f61306fa54534a4a&w=740"
        />
        {isSidebarOpen && (
          <div className="flex py-4 items-center w-full justify-center relative">
            <p>{data.userName}님</p>
            <button
              className="p-1 rounded absolute right-0 text-neutral-600"
              onClick={() => navigate("/")}
            >
              <LogOutIcon />
            </button>
          </div>
        )}
      </div>
      {isSidebarOpen ? (
        <Accordion data={menuData} />
      ) : (
        <DropDown data={menuData} />
      )}
    </motion.nav>
  );
};

export default Sidebar;
