import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const familyMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png',
    nextVaccine: '15/12/2024',
    vaccineName: 'Vaccine cúm mùa',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Nguyễn Thị B',
    avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_2.png',
    nextVaccine: '20/12/2024',
    vaccineName: 'Vaccine cúm 4 giá',
    status: 'upcoming',
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    avatar: 'https://c.animaapp.com/mkfu2m19DTULFK/img/ai_3.png',
    nextVaccine: '10/01/2025',
    vaccineName: 'Vaccine cúm mùa',
    status: 'scheduled',
  },
];

export default function CalendarScreen() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary px-6 pt-12 pb-6">
        <h1 className="text-h2 font-sans font-semibold text-white mb-2">
          Lịch tiêm chủng
        </h1>
        <p className="text-body-sm text-white/90">
          Quản lý lịch tiêm cho cả gia đình
        </p>
      </div>

      <div className="px-6 py-6">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 font-sans font-semibold text-foreground">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-body-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday = day === new Date().getDate() && 
                             currentMonth.getMonth() === new Date().getMonth() &&
                             currentMonth.getFullYear() === new Date().getFullYear();
              const hasEvent = day === 15 || day === 20;

              return (
                <button
                  key={day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-body-sm font-medium transition-colors ${
                    isToday
                      ? 'bg-primary text-primary-foreground'
                      : hasEvent
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-h3 font-sans font-semibold text-foreground">
            Thành viên gia đình
          </h2>
          <Button
            onClick={() => navigate('/profile')}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm
          </Button>
        </div>

        <div className="space-y-4">
          {familyMembers.map((member) => (
            <Card key={member.id} className="p-6 border-border hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-h4 font-sans font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-body-sm text-muted-foreground">
                      Lịch tiêm tiếp theo: {member.nextVaccine}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={
                      member.status === 'upcoming'
                        ? 'bg-warning/10 text-warning border-warning/20'
                        : 'bg-info/10 text-info border-info/20'
                    }>
                      {member.vaccineName}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => navigate('/booking')}
                className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary-hover"
              >
                Đặt lịch ngay
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
