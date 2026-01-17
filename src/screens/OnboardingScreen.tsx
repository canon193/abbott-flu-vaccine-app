import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    image: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_2.png',
    title: 'Bảo vệ gia đình bạn',
    description: 'Theo dõi lịch tiêm chủng cho cả gia đình một cách dễ dàng và hiệu quả',
  },
  {
    image: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_3.png',
    title: 'Nhắc nhở thông minh',
    description: 'Không bao giờ bỏ lỡ lịch tiêm chủng với hệ thống nhắc nhở tự động',
  },
  {
    image: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png',
    title: 'Tư vấn với Khỏe',
    description: 'Trợ lý AI thông minh sẵn sàng giải đáp mọi thắc mắc về sức khỏe',
  },
  {
    image: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_5.png',
    title: 'Đặt lịch nhanh chóng',
    description: 'Tìm và đặt lịch tại các trung tâm tiêm chủng gần bạn',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <div className="mb-12">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full max-w-sm mx-auto h-auto object-contain"
                loading="lazy"
              />
            </div>
            
            <h2 className="text-h1 font-sans font-semibold text-foreground mb-4">
              {slides[currentSlide].title}
            </h2>
            
            <p className="text-body text-muted-foreground">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {currentSlide < slides.length - 1 && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="flex-1 bg-transparent text-muted-foreground hover:bg-muted"
            >
              Bỏ qua
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            className={`${currentSlide < slides.length - 1 ? 'flex-1' : 'w-full'} bg-primary text-primary-foreground hover:bg-primary-hover`}
          >
            {currentSlide < slides.length - 1 ? (
              <>
                Tiếp tục
                <ChevronRight className="ml-2 w-5 h-5" />
              </>
            ) : (
              'Bắt đầu ngay!'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
