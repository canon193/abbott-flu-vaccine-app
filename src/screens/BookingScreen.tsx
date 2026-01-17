import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import confetti from 'canvas-confetti';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const familyMembers = [
  { id: 1, name: 'Nguyễn Văn A', avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png' },
  { id: 2, name: 'Nguyễn Thị B', avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_2.png' },
  { id: 3, name: 'Nguyễn Văn C', avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_3.png' },
];

export default function BookingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleMemberToggle = (memberId: number) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2 && selectedMembers.length > 0) {
      setStep(3);
    }
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      navigate('/calendar');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-h2 font-sans font-semibold text-foreground mb-4">
            Đặt lịch thành công!
          </h2>
          <p className="text-body text-muted-foreground">
            Chúng tôi đã gửi xác nhận đến email của bạn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-h2 font-sans font-semibold text-white">
            Đặt lịch tiêm chủng
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-body-sm font-semibold ${
                  s <= step
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {step === 1 && (
          <div>
            <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
              Chọn ngày và giờ
            </h2>

            <Card className="p-6 mb-6 border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-h4 font-sans font-semibold text-foreground">
                  Chọn ngày
                </h3>
              </div>
              <input
                type="date"
                onChange={(e) => handleDateSelect(new Date(e.target.value))}
                className="w-full p-3 rounded-lg bg-muted text-foreground border border-border"
                min={new Date().toISOString().split('T')[0]}
              />
            </Card>

            {selectedDate && (
              <Card className="p-6 border-border">
                <h3 className="text-h4 font-sans font-semibold text-foreground mb-4">
                  Chọn giờ
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 rounded-lg text-body-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-secondary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </Card>
            )}

            <Button
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
              className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
            >
              Tiếp tục
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
              Chọn thành viên
            </h2>

            <div className="space-y-4 mb-6">
              {familyMembers.map((member) => (
                <Card
                  key={member.id}
                  className={`p-4 border-border cursor-pointer transition-all ${
                    selectedMembers.includes(member.id)
                      ? 'border-primary bg-secondary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleMemberToggle(member.id)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleMemberToggle(member.id)}
                    />
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Label className="flex-1 text-body font-medium text-foreground cursor-pointer">
                      {member.name}
                    </Label>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedMembers.length === 0}
              className="w-full bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-40"
            >
              Tiếp tục
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
              Xác nhận thông tin
            </h2>

            <Card className="p-6 mb-4 border-border">
              <h3 className="text-h4 font-sans font-semibold text-foreground mb-4">
                Thông tin đặt lịch
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-body-sm text-muted-foreground">Ngày:</span>
                  <span className="text-body-sm font-medium text-foreground">
                    {selectedDate?.toLocaleDateString('vi-VN')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-body-sm text-muted-foreground">Giờ:</span>
                  <span className="text-body-sm font-medium text-foreground">
                    {selectedTime}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-body-sm text-muted-foreground">Số người:</span>
                  <span className="text-body-sm font-medium text-foreground">
                    {selectedMembers.length} người
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6 border-border">
              <h3 className="text-h4 font-sans font-semibold text-foreground mb-4">
                Thành viên
              </h3>
              
              <div className="space-y-3">
                {familyMembers
                  .filter(m => selectedMembers.includes(m.id))
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-body text-foreground">
                        {member.name}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Xác nhận đặt lịch
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
