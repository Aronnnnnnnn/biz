import { toast } from "react-toastify";
import BaseTitle from "../../components/shared/BaseTitle";
import MainWrapper from "../../components/shared/MainWrapper";
import { useSpinner } from "../../store/useSpinner";

const Ticket = () => {
  const { setIsSpinner } = useSpinner();
  const handle = () => {
    setIsSpinner(true);
  };
  return (
    <MainWrapper>
      <BaseTitle text="이용현황" />
      <div className="w-full border border-neutral-200/50 rounded px-4 py-4">
        <div className="flex flex-col gap-5">
          <p className="text-sm">검색어</p>
          <hr className="border-neutral-200/40 " />
          <p className="text-sm">상세조건</p>
        </div>
      </div>
      <button onClick={handle}>1</button>
      {/* <div className="w-full h-80 border border-neutral-500/50 rounded " /> */}
    </MainWrapper>
  );
};

export default Ticket;
