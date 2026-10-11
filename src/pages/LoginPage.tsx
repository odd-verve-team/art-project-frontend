import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { authApi } from "@/services/api";
import { useAuthStore } from "@/store/useAuthStore";

import { OtpInput } from "@/components/ui/OtpInput";

type Step = 'email' | 'code';

export const LoginPage = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.sendCode({ email });
      setStep('code');
      setTimer(60);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setCode('');

    try {
      await authApi.sendCode({ email });
      setTimer(60);
    } catch (error) {
      console.error('Failed to resend verification code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = async (newCode: string) => {
    setCode(newCode);

    if (newCode.length === 6) {
      setIsLoading(true);
      try {
        const tokens = await authApi.verifyCode({ email, code: newCode });
        setTokens(tokens.access, tokens.refresh);
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Authentication failed (invalid code):', error);
        setCode('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div
      className={`
        flex flex-col justify-center
        items-center h-[100vh] px-global
      `}
    >
      <h2
        className={`
          flex flex-col items-center gap-[25px] mb-[132px]
          text-primary text-[52px]/[70px] font-[700]
          `}
      >
        <span>LOG IN</span>
        <span>or</span>
        <span>SIGN UP</span>
      </h2>

      {step === 'email' && (
        <form
          className="w-full flex flex-col gap-[32px]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              w-full pb-[2px] border-b border-primary outline-none
              text-primary text-[20px] font-[400] uppercase 
              placeholder:text-border focus:border-primary/50
              transition-colors duration-300
            `}
          />
          <button
            type="submit"
            className={`
              text-background text-[16px]/[24px] tracking-[1px] uppercase
              bg-primary py-[10px] cursor-pointer outline-none
              transition-opacity duration-500 ease-in-out hover:opacity-70 focus:opacity-70
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
            disabled={!email || isLoading}
          >
            {isLoading ? 'sending...' : 'done'}
          </button>
        </form>
      )}

      {step === 'code' && (
        <div className="flex flex-col">
          <p className="mb-[8px] text-primary text-[20px] font-[400] uppercase text-center">
            enter code from email
          </p>
          <OtpInput value={code} onChange={handleCodeChange} />
          <button
            type="button"
            onClick={handleResendCode}
            className={`
              mt-[24px] uppercase text-center cursor-pointer
              text-border text-[12px] tracking-[1px] font-[500]
              transition-colors duration-500 ease-in-out
              hover:text-primary
              disabled:cursor-not-allowed disabled:hover:text-border
            `}
            disabled={timer > 0 || isLoading}
          >
            {timer > 0 ? `resend the code (${timer}s)` : 'resend the code'}
          </button>
        </div>
      )}
    </div>
  );
};
