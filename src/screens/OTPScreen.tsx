import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OTPScreenProps {
  onComplete: () => void;
}

export default function OTPScreen({ onComplete }: OTPScreenProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every(digit => digit !== '')) {
      onComplete();
      navigate('/profile-setup');
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-h1 font-sans font-semibold text-foreground mb-4">
              Xác thực OTP
            </h1>
            <p className="text-body text-muted-foreground">
              Nhập mã OTP đã được gửi đến số điện thoại của bạn
            </p>
            <p className="text-body-sm text-primary mt-4 font-medium">
              💡 Nhập bất kỳ 6 số nào để tiếp tục (Demo mode)
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-h3 font-semibold bg-muted text-foreground border-border focus:border-primary"
              />
            ))}
          </div>

          <div className="text-center mb-8">
            {countdown > 0 ? (
              <p className="text-body-sm text-muted-foreground">
                Gửi lại mã sau {countdown}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-body-sm text-primary hover:text-primary-hover font-medium"
              >
                Gửi lại mã OTP
              </button>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={otp.some(digit => digit === '')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
