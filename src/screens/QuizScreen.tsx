import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const questions = [
  {
    id: 1,
    question: 'Bạn có thuộc nhóm tuổi nào sau đây?',
    options: [
      { id: 'a', text: 'Dưới 5 tuổi', risk: 3 },
      { id: 'b', text: '5-18 tuổi', risk: 1 },
      { id: 'c', text: '19-64 tuổi', risk: 1 },
      { id: 'd', text: 'Trên 65 tuổi', risk: 3 },
    ],
  },
  {
    id: 2,
    question: 'Bạn có bệnh mãn tính nào không?',
    options: [
      { id: 'a', text: 'Không có', risk: 0 },
      { id: 'b', text: 'Bệnh tim mạch', risk: 3 },
      { id: 'c', text: 'Bệnh hô hấp', risk: 3 },
      { id: 'd', text: 'Tiểu đường', risk: 2 },
    ],
  },
  {
    id: 3,
    question: 'Bạn có tiếp xúc thường xuyên với đám đông?',
    options: [
      { id: 'a', text: 'Không', risk: 0 },
      { id: 'b', text: 'Thỉnh thoảng', risk: 1 },
      { id: 'c', text: 'Thường xuyên', risk: 2 },
      { id: 'd', text: 'Hàng ngày', risk: 3 },
    ],
  },
  {
    id: 4,
    question: 'Bạn đã tiêm vaccine cúm trong năm nay chưa?',
    options: [
      { id: 'a', text: 'Đã tiêm', risk: -2 },
      { id: 'b', text: 'Chưa tiêm', risk: 2 },
      { id: 'c', text: 'Không nhớ', risk: 1 },
    ],
  },
];

export default function QuizScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string, risk: number) => {
    setSelectedOption(optionId);
    setTimeout(() => {
      const newAnswers = [...answers, risk];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const calculateRiskScore = () => {
    const totalRisk = answers.reduce((sum, risk) => sum + risk, 0);
    const maxRisk = 11;
    return Math.max(0, Math.min(100, (totalRisk / maxRisk) * 100));
  };

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Thấp', color: 'success', message: 'Nguy cơ nhiễm cúm của bạn ở mức thấp' };
    if (score < 60) return { level: 'Trung bình', color: 'warning', message: 'Bạn nên cân nhắc tiêm vaccine cúm' };
    return { level: 'Cao', color: 'error', message: 'Bạn nên tiêm vaccine cúm ngay' };
  };

  if (showResult) {
    const riskScore = calculateRiskScore();
    const riskInfo = getRiskLevel(riskScore);

    return (
      <div className="min-h-screen bg-background flex flex-col pb-24">
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto text-center"
          >
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="hsl(0, 0%, 90%)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={`hsl(var(--color-${riskInfo.color}))`}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 552' }}
                    animate={{ strokeDasharray: `${(riskScore / 100) * 552} 552` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-h1 font-sans font-bold text-foreground"
                    >
                      {Math.round(riskScore)}%
                    </motion.div>
                    <div className={`text-body-sm font-medium text-${riskInfo.color}`}>
                      {riskInfo.level}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-h2 font-sans font-semibold text-foreground mb-4">
              Kết quả đánh giá
            </h2>
            
            <p className="text-body text-muted-foreground mb-8">
              {riskInfo.message}
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => navigate('/centers')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                Tìm điểm tiêm chủng
              </Button>
              
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="w-full bg-background text-foreground border-border hover:bg-muted"
              >
                Về trang chủ
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 py-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-body-sm text-muted-foreground">
              Câu hỏi {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-body-sm font-medium text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-h2 font-sans font-semibold text-foreground mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <Card
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id, option.risk)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    selectedOption === option.id
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-body text-foreground">{option.text}</span>
                    {selectedOption === option.id && (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
