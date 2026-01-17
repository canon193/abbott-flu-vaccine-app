import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function AccountDetailScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '+84 912 345 678',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    city: 'hanoi',
    address: '123 Đường Láng, Đống Đa',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin tài khoản đã được cập nhật",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-h2 font-sans font-semibold text-white">
            Thông tin tài khoản
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Edit2 className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src="https://c.animaapp.com/mkfu2m19DTULFK/img/ai_4.png" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground text-h2">
                A
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
            Thông tin cá nhân
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-body-sm text-foreground font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Họ và tên
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!isEditing}
                className="bg-muted text-foreground border-border disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-body-sm text-foreground font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="bg-muted text-foreground border-border disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-body-sm text-foreground font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Số điện thoại
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="bg-muted text-foreground border-border disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-body-sm text-foreground font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Ngày sinh
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className="bg-muted text-foreground border-border disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-body-sm text-foreground font-medium">
                Giới tính
              </Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                disabled={!isEditing}
              >
                <SelectTrigger id="gender" className="bg-muted text-foreground border-border disabled:opacity-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6 border-border">
          <h2 className="text-h3 font-sans font-semibold text-foreground mb-6">
            Địa chỉ
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-body-sm text-foreground font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Thành phố
              </Label>
              <Select 
                value={formData.city} 
                onValueChange={(value) => setFormData({ ...formData, city: value })}
                disabled={!isEditing}
              >
                <SelectTrigger id="city" className="bg-muted text-foreground border-border disabled:opacity-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                  <SelectItem value="danang">Đà Nẵng</SelectItem>
                  <SelectItem value="haiphong">Hải Phòng</SelectItem>
                  <SelectItem value="cantho">Cần Thơ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-body-sm text-foreground font-medium">
                Địa chỉ chi tiết
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                className="bg-muted text-foreground border-border disabled:opacity-100"
              />
            </div>
          </div>
        </Card>

        {isEditing && (
          <div className="flex gap-4">
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1 bg-background text-foreground border-border hover:bg-muted"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Lưu thay đổi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
