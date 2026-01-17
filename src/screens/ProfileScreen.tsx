import { useNavigate } from 'react-router-dom';
import { User, Users, FileText, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: User,
      label: 'Thông tin tài khoản',
      description: 'Xem và chỉnh sửa thông tin',
      action: () => navigate('/account-detail'),
    },
    {
      icon: Users,
      label: 'Quản lý gia đình',
      description: 'Thêm và quản lý thành viên',
      action: () => {},
    },
    {
      icon: FileText,
      label: 'Lịch sử tiêm chủng',
      description: 'Xem lịch sử và hồ sơ',
      action: () => {},
    },
    {
      icon: Settings,
      label: 'Cài đặt',
      description: 'Tùy chỉnh ứng dụng',
      action: () => {},
    },
    {
      icon: HelpCircle,
      label: 'Trợ giúp & Hỗ trợ',
      description: 'Câu hỏi thường gặp',
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary px-6 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-white/20">
            <AvatarImage src="https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png" alt="Khoe mascot character" />
            <AvatarFallback className="bg-primary text-primary-foreground text-h2">
              A
            </AvatarFallback>
          </Avatar>
          <h1 className="text-h2 font-sans font-semibold text-white mb-2">
            Nguyễn Văn A
          </h1>
          <p className="text-body-sm text-white/90">
            nguyenvana@email.com
          </p>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="p-6 mb-6 border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-h3 font-sans font-bold text-foreground mb-1">
                5
              </div>
              <div className="text-body-sm text-muted-foreground">
                Thành viên
              </div>
            </div>
            <div>
              <div className="text-h3 font-sans font-bold text-foreground mb-1">
                12
              </div>
              <div className="text-body-sm text-muted-foreground">
                Lịch hẹn
              </div>
            </div>
            <div>
              <div className="text-h3 font-sans font-bold text-foreground mb-1">
                8
              </div>
              <div className="text-body-sm text-muted-foreground">
                Đã tiêm
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full"
            >
              <Card className="p-4 border-border hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-body font-medium text-foreground mb-1">
                      {item.label}
                    </h3>
                    <p className="text-body-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            </button>
          ))}
        </div>

        <Separator className="my-6" />

        <button
          onClick={onLogout}
          className="w-full"
        >
          <Card className="p-4 border-error/20 hover:bg-error/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-error" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-body font-medium text-error">
                  Đăng xuất
                </h3>
              </div>
            </div>
          </Card>
        </button>

        <div className="mt-8 text-center">
          <p className="text-body-sm text-muted-foreground mb-2">
            Abbott Flu Vaccine App
          </p>
          <p className="text-caption text-muted-foreground">
            Phiên bản 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
