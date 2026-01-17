import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, MessageCircle, Bell, AlertCircle, TrendingUp, Users, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Cảnh báo mùa cúm',
    message: 'Số ca nhiễm cúm tăng 30% trong tuần qua. Hãy tiêm vaccine ngay!',
    time: '2 giờ trước',
    icon: AlertCircle,
    color: 'warning',
  },
  {
    id: 2,
    type: 'info',
    title: 'Lịch tiêm sắp tới',
    message: 'Bạn có lịch tiêm vaccine vào ngày 15/12/2024',
    time: '5 giờ trước',
    icon: Calendar,
    color: 'info',
  },
  {
    id: 3,
    type: 'success',
    title: 'Bài viết mới',
    message: '5 cách tăng cường miễn dịch trong mùa đông',
    time: '1 ngày trước',
    icon: TrendingUp,
    color: 'success',
  },
];

export default function DashboardScreen() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  const handleDismissNotification = (id: number) => {
    setActiveNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowNotifications(false)}>
          <div 
            className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-h3 font-sans font-semibold text-foreground">
                Thông báo
              </h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activeNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-body text-muted-foreground">
                    Không có thông báo mới
                  </p>
                </div>
              ) : (
                activeNotifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Card key={notification.id} className="p-4 border-border">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full bg-${notification.color}/10 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-body font-semibold text-foreground">
                              {notification.title}
                            </h3>
                            <button
                              onClick={() => handleDismissNotification(notification.id)}
                              className="p-1 rounded-full hover:bg-muted transition-colors flex-shrink-0"
                            >
                              <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                          <p className="text-body-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <span className="text-caption text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-primary px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-h2 font-sans font-semibold text-white mb-2">
              Xin chào, Nguyễn Văn A
            </h1>
            <p className="text-body-sm text-white/90">
              Hôm nay bạn thế nào?
            </p>
          </div>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Bell className="w-6 h-6 text-white" />
            {activeNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeNotifications.length}
              </span>
            )}
          </button>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-1">
                Mức độ rủi ro
              </p>
              <div className="flex items-center gap-2">
                <span className="text-h2 font-sans font-bold text-warning">
                  45%
                </span>
                <Badge className="bg-warning/10 text-warning border-warning/20">
                  Trung bình
                </Badge>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
          </div>
          <p className="text-body-sm text-muted-foreground">
            Bạn nên cân nhắc tiêm vaccine cúm để bảo vệ sức khỏe
          </p>
        </Card>
      </div>

      <div className="px-6 py-8">
        <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
          Thao tác nhanh
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <button
            onClick={() => navigate('/calendar')}
            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-body-sm font-medium text-foreground text-center">
              Lịch tiêm
            </span>
          </button>

          <button
            onClick={() => navigate('/centers')}
            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center">
              <MapPin className="w-6 h-6 text-tertiary-foreground" />
            </div>
            <span className="text-body-sm font-medium text-foreground text-center">
              Tìm điểm
            </span>
          </button>

          <button
            onClick={() => navigate('/chat')}
            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-body-sm font-medium text-foreground text-center">
              Hỏi Khỏe
            </span>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h3 font-sans font-semibold text-foreground">
              Cập nhật mới nhất
            </h2>
            <button className="text-body-sm text-primary hover:text-primary-hover font-medium">
              Xem tất cả
            </button>
          </div>

          {/* Quick Health Alerts */}
          <div className="space-y-3 mb-6">
            <Card className="p-4 border-l-4 border-l-warning bg-warning/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-body font-semibold text-foreground mb-1">
                    Cảnh báo: Mùa cúm đang cao điểm
                  </h4>
                  <p className="text-body-sm text-muted-foreground">
                    Số ca nhiễm tăng 30% trong tuần qua tại Hà Nội. Khuyến cáo tiêm vaccine ngay.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-info bg-info/5">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-body font-semibold text-foreground mb-1">
                    Chương trình tiêm chủng miễn phí
                  </h4>
                  <p className="text-body-sm text-muted-foreground">
                    Dành cho người cao tuổi trên 65 tuổi từ 15-30/12/2024.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-h3 font-sans font-semibold text-foreground">
            Tin tức sức khỏe
          </h2>
        </div>

        <div className="space-y-4">
          <Card className="overflow-hidden border-border hover:shadow-lg transition-all">
            <img
              src="https://c.animaapp.com/mkfu2m19DTULFK/img/ai_5.png"
              alt="Vietnamese family health photo"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-info/10 text-info border-info/20">
                  Tin tức
                </Badge>
                <span className="text-caption text-muted-foreground">
                  2 giờ trước
                </span>
              </div>
              <h3 className="text-h4 font-sans font-semibold text-foreground mb-2">
                Tầm quan trọng của vaccine cúm mùa
              </h3>
              <p className="text-body-sm text-muted-foreground mb-4">
                Vaccine cúm giúp bảo vệ bạn và gia đình khỏi các biến chứng nguy hiểm của bệnh cúm...
              </p>
              <Button variant="ghost" className="bg-transparent text-primary hover:bg-primary/5 p-0">
                Đọc thêm
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-success/10 text-success border-success/20">
                    Thống kê
                  </Badge>
                  <span className="text-caption text-muted-foreground">
                    1 ngày trước
                  </span>
                </div>
                <h3 className="text-h4 font-sans font-semibold text-foreground mb-2">
                  Tỷ lệ tiêm chủng tăng 25% trong tháng qua
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Ngày càng nhiều người nhận thức được tầm quan trọng của việc tiêm vaccine...
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Cộng đồng
                  </Badge>
                  <span className="text-caption text-muted-foreground">
                    3 ngày trước
                  </span>
                </div>
                <h3 className="text-h4 font-sans font-semibold text-foreground mb-2">
                  Chia sẻ kinh nghiệm tiêm vaccine cho trẻ em
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Các bậc phụ huynh chia sẻ những lưu ý khi đưa con đi tiêm chủng...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
