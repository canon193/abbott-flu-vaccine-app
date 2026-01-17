import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  'Vaccine cúm có tác dụng phụ gì?',
  'Ai nên tiêm vaccine cúm?',
  'Khi nào nên tiêm vaccine?',
  'Giá vaccine cúm bao nhiêu?',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là Khỏe, trợ lý AI của Abbott. Tôi có thể giúp gì cho bạn về vaccine cúm?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tác dụng phụ')) {
      return 'Vaccine cúm thường có các tác dụng phụ nhẹ như đau nhức tại chỗ tiêm, sốt nhẹ, mệt mỏi. Các triệu chứng này thường biến mất sau 1-2 ngày. Nếu có phản ứng bất thường, hãy liên hệ bác sĩ ngay.';
    }
    
    if (lowerMessage.includes('ai nên tiêm') || lowerMessage.includes('đối tượng')) {
      return 'Vaccine cúm được khuyến cáo cho: trẻ em từ 6 tháng tuổi, người cao tuổi trên 65 tuổi, phụ nữ mang thai, người có bệnh mãn tính, và những người thường xuyên tiếp xúc đám đông.';
    }
    
    if (lowerMessage.includes('khi nào') || lowerMessage.includes('thời điểm')) {
      return 'Thời điểm tốt nhất để tiêm vaccine cúm là trước mùa cúm, thường là từ tháng 9 đến tháng 11. Tuy nhiên, bạn có thể tiêm bất cứ lúc nào trong năm để được bảo vệ.';
    }
    
    if (lowerMessage.includes('giá') || lowerMessage.includes('chi phí')) {
      return 'Giá vaccine cúm dao động từ 200.000đ đến 500.000đ tùy loại vaccine (3 giá hoặc 4 giá). Bạn có thể kiểm tra giá cụ thể tại các trung tâm tiêm chủng gần bạn.';
    }
    
    return 'Cảm ơn câu hỏi của bạn! Để được tư vấn chi tiết hơn, bạn có thể đặt lịch hẹn với bác sĩ hoặc liên hệ hotline của chúng tôi. Bạn còn thắc mắc gì khác không?';
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="bg-gradient-primary px-6 py-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png" alt="Khoe mascot character" />
            <AvatarFallback className="bg-primary text-primary-foreground">K</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-h3 font-sans font-semibold text-white">
              Khỏe
            </h1>
            <p className="text-body-sm text-white/90">
              Trợ lý AI của bạn
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-body">{message.text}</p>
                <span className="text-caption opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-body-sm text-muted-foreground text-center mb-4">
              Câu hỏi gợi ý:
            </p>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="w-full text-left px-4 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-colors text-body-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-background border-t border-border">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Nhập câu hỏi của bạn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-muted text-foreground border-border"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
          >
            <Send className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="bg-background text-foreground border-border hover:bg-muted"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
