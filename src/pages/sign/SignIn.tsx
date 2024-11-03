import { useForm, useWatch, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bizLogo from "../../assets/images/biz-logo.png";
import { useSpinner } from "../../store/useSpinner";
import Spinner from "../../components/shared/Spinner";
import user from "../../services/api/user";
import { toast } from "react-toastify";
import bizCover from "../../assets/images/coverImg.jpg";

const SignIn = () => {
  const { control, handleSubmit } = useForm();
  const { isSpinnerOpen, setIsSpinner } = useSpinner();
  const navigate = useNavigate();

  const watchedId = useWatch({
    name: "id",
    control,
  });
  const watchedPw = useWatch({
    name: "pw",
    control,
  });

  const onSubmit = async () => {
    try {
      setIsSpinner(true);
      await user.signIn({
        email: watchedId,
        password: watchedPw,
      });
      setIsSpinner(false);
      console.log("도달");
      // navigate("/ticket");
    } catch (e) {
      toast(e.message);
    }
  };

  return (
    <main className="flex items-center justify-center h-[100dvh] relative">
      {isSpinnerOpen && <Spinner />}
      <div className="flex flex-col md:flex-row h-full w-full">
        <div className="flex-grow-[4] md:flex-grow-[6] bg-center bg-cover bg-no-repeat bg-coverImg" />
        <div className="flex-grow-[6] md:flex-grow-[4] overflow-hidden">
          <div className="h-full relative">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex flex-col gap-2">
                <img className="mb-4" src={bizLogo} />
                <Controller
                  control={control}
                  name="id"
                  render={({ field }) => (
                    <input
                      className="pl-2 pr-8 py-2 rounded-sm border border-neutral-300/50"
                      placeholder="아이디를 입력해주세요"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {watchedId}
                <Controller
                  control={control}
                  name="pw"
                  render={({ field }) => (
                    <input
                      className="pl-2 pr-8 py-2 border rounded-sm border-neutral-300/50"
                      placeholder="비밀번호를 입력해주세요"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {watchedPw}
                <button className="px-6 py-2 mt-3 bg-[#0099ff] text-white rounded-sm">
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
