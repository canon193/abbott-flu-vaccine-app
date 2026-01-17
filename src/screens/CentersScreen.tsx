import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const centers = [
  {
    id: 1,
    name: 'VNVC Hà Nội',
    address: '123 Đường Láng, Đống Đa, Hà Nội',
    phone: '024 1234 5678',
    distance: '2.5 km',
    openTime: '8:00 - 20:00',
    type: 'VNVC',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Long Châu Cầu Giấy',
    address: '456 Cầu Giấy, Hà Nội',
    phone: '024 8765 4321',
    distance: '3.2 km',
    openTime: '7:30 - 21:00',
    type: 'Long Châu',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'VNVC Hoàn Kiếm',
    address: '789 Hoàn Kiếm, Hà Nội',
    phone: '024 9876 5432',
    distance: '4.1 km',
    openTime: '8:00 - 19:00',
    type: 'VNVC',
    rating: 4.9,
  },
];

export default function CentersScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || center.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary px-6 pt-12 pb-6">
        <h1 className="text-h2 font-sans font-semibold text-white mb-2">
          Tìm điểm tiêm chủng
        </h1>
        <p className="text-body-sm text-white/90">
          Tìm trung tâm gần bạn nhất
        </p>
      </div>

      <div className="px-6 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-muted text-foreground border-border"
          />
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <Button
            onClick={() => setSelectedType(null)}
            variant={selectedType === null ? 'default' : 'outline'}
            className={
              selectedType === null
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover whitespace-nowrap'
                : 'bg-background text-foreground border-border hover:bg-muted whitespace-nowrap'
            }
          >
            Tất cả
          </Button>
          <Button
            onClick={() => setSelectedType('VNVC')}
            variant={selectedType === 'VNVC' ? 'default' : 'outline'}
            className={
              selectedType === 'VNVC'
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover whitespace-nowrap'
                : 'bg-background text-foreground border-border hover:bg-muted whitespace-nowrap'
            }
          >
            VNVC
          </Button>
          <Button
            onClick={() => setSelectedType('Long Châu')}
            variant={selectedType === 'Long Châu' ? 'default' : 'outline'}
            className={
              selectedType === 'Long Châu'
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover whitespace-nowrap'
                : 'bg-background text-foreground border-border hover:bg-muted whitespace-nowrap'
            }
          >
            Long Châu
          </Button>
        </div>

        <div className="mb-6 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969739876!2d105.8341598!3d21.0277644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s&key=YOUR_API_KEY"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <Card key={center.id} className="p-6 border-border hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-h4 font-sans font-semibold text-foreground">
                      {center.name}
                    </h3>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {center.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-h4 font-semibold text-warning">
                      {center.rating}
                    </span>
                    <span className="text-body-sm text-muted-foreground">
                      ⭐
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-body-sm font-medium text-primary">
                    {center.distance}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-body-sm text-foreground">
                    {center.address}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <a href={`tel:${center.phone}`} className="text-body-sm text-tertiary hover:underline">
                    {center.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-body-sm text-foreground">
                    {center.openTime}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/booking')}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  Đặt lịch
                </Button>
                <Button
                  variant="outline"
                  className="bg-background text-foreground border-border hover:bg-muted"
                >
                  Chi tiết
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
