import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Card, Tag, Button, message, Modal } from 'antd';
import { IconCalendar, IconMapPin } from '../utils/icons';
import Section from '../components/ui/Section';
import Grid from '../components/ui/Grid';
import Tabs from '../components/ui/Tabs';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/image';
import { truncateHtml } from '../utils/text';
import './Events.css';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: string;
  image: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: string;
  googleFormUrl: string;
  registered_ips: string[];
  isHighlight: boolean;
}

const tabs = [
  { id: 'all', label: 'Tất cả', color: 'blue' },
  { id: 'upcoming', label: 'Sắp diễn ra', color: 'green' },
  { id: 'ongoing', label: 'Đang diễn ra', color: 'yellow' },
  { id: 'past', label: 'Đã kết thúc', color: 'red' },
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />}>
    {children}
  </Suspense>
);

const Events = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registering, setRegistering] = useState(false);
  const [userIp, setUserIp] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/events');
        const result = await response.json();
        setEvents(result); // json-server trả về mảng thẳng
      } catch (error) {
        console.error('Error fetching events:', error);
        message.error('Không thể tải danh sách sự kiện');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchUserIp();
  }, []);

  const filteredEvents = events.filter(
    event => activeTab === 'all' || event.status === activeTab
  );

  const highlightedEvents = events.filter(event => 
    event.isHighlight && event.status !== 'past'
  );

  const openRegisterModal = (event: Event) => {
    setSelectedEvent(event);
    setRegisterModalVisible(true);
  };

  const handleConfirmRegistration = async () => {
    if (!selectedEvent) return;

    try {
      setRegistering(true);
      // json-server không hỗ trợ POST tùy biến, bạn cần xử lý backend thật
      // Đây là ví dụ POST demo, bạn có thể bỏ qua hoặc sửa tùy backend
      const response = await fetch(`http://localhost:4000/events/${selectedEvent.id}`, {
        method: 'PATCH', // json-server hỗ trợ PATCH để cập nhật
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registered_ips: [...selectedEvent.registered_ips, userIp]
        }),
      });

      if (response.ok) {
        message.success('Đăng ký tham gia thành công!');
        // Cập nhật state local để phản ánh thay đổi
        setEvents(prev =>
          prev.map(ev =>
            ev.id === selectedEvent.id
              ? { ...ev, registered_ips: [...ev.registered_ips, userIp] }
              : ev
          )
        );
      } else {
        message.error('Đăng ký không thành công, vui lòng thử lại.');
      }
    } catch (error) {
      message.error('Lỗi khi đăng ký tham gia.');
    } finally {
      setRegistering(false);
      setRegisterModalVisible(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Section className="pt-24 pb-12" gradient="primary" pattern="dots">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto" />
          </div>
        </Section>
        <Section className="py-12">
          <Grid cols={3} gap={8}>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-24 pb-12" gradient="primary" pattern="dots">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sự Kiện</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tham gia các sự kiện hấp dẫn của{' '}
            <span className="text-primary">Đoàn - Hội khoa Công nghệ Thông tin</span> để học hỏi, chia sẻ và kết nối với cộng đồng công nghệ tại UTE.
          </p>
        </motion.div>
      </Section>

      {/* Highlighted Events Section */}
      {highlightedEvents.length > 0 && (
        <Section className="py-12" gradient="secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Sự kiện nổi bật</h2>
            <p className="text-gray-600">Đừng bỏ lỡ những sự kiện đặc biệt sắp diễn ra</p>
          </motion.div>

          <Grid cols={2} gap={8}>
            {highlightedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card
                  hoverable
                  cover={
                    <div className="relative h-64">
                      <img
                        alt={event.title}
                        src={getImageUrl(event.image)}
                        className="w-full h-full object-cover"
                      />
                      <Tag
                        color="orange"
                        className="absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full"
                      >
                        Nổi bật
                      </Tag>
                    </div>
                  }
                >
                  <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
                  <div
                    className="text-gray-600 mb-4 line-clamp-2 event-description-preview"
                    dangerouslySetInnerHTML={{ __html: truncateHtml(event.description, 150) }}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <IconCalendar size={18} className="mr-2 text-primary" />
                      <span>{event.date} | {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IconMapPin size={18} className="mr-2 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-4"
                    onClick={() => openRegisterModal(event)}
                  >
                    Đăng ký tham gia
                  </Button>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Section>
      )}

      {/* Regular Events List */}
      <Section className="py-12">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="justify-center mb-12" />

        <Grid cols={3} gap={8}>
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card
                hoverable
                cover={
                  <div className="relative h-48">
                    <img
                      alt={event.title}
                      src={getImageUrl(event.image)}
                      className="w-full h-full object-cover"
                    />
                    <Tag
                      color={
                        event.status === 'upcoming' ? 'green' :
                        event.status === 'ongoing' ? 'blue' :
                        'default'
                      }
                      className="absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full"
                    >
                      {event.status === 'upcoming' ? 'Sắp diễn ra' :
                       event.status === 'ongoing' ? 'Đang diễn ra' :
                       'Đã kết thúc'}
                    </Tag>
                  </div>
                }
              >
                <h3 className="text-xl font-semibold mb-4 line-clamp-2 flex-none">{event.title}</h3>
                <div className="space-y-3 mb-4 flex-none">
                  <div className="flex items-center text-gray-600">
                    <IconWrapper>
                      <IconCalendar size={18} className="mr-2 text-primary" />
                    </IconWrapper>
                    <span className="text-sm">{event.date} | {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <IconWrapper>
                      <IconMapPin size={18} className="mr-2 text-primary" />
                    </IconWrapper>
                    <span className="text-sm line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div
                  className="text-gray-600 mb-6 line-clamp-3 flex-1 event-description-preview"
                  dangerouslySetInnerHTML={{ __html: truncateHtml(event.description, 150) }}
                />
                <Button type="primary" block onClick={() => openRegisterModal(event)}>
                  Đăng ký tham gia
                </Button>
              </Card>
            </motion.div>
          ))}
        </Grid>

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Không có sự kiện nào {activeTab !== 'all' ? 'trong trạng thái này' : ''}.
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="py-20" gradient="secondary" pattern="grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn muốn tổ chức sự kiện cùng Đoàn - Hội khoa Công nghệ Thông tin?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hợp tác để tổ chức các sự kiện công nghệ bổ ích cho cộng đồng sinh viên UTE.
          </p>
          <Button type="primary" size="large">
            <Link to="/contact#top" onClick={() => window.scrollTo(0, 0)}>
              Liên hệ hợp tác
            </Link>
          </Button>
        </motion.div>
      </Section>

      {/* Modal đăng ký */}
      <Modal
        title="Đăng ký tham gia sự kiện"
        open={registerModalVisible}
        onCancel={() => setRegisterModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setRegisterModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={registering}
            onClick={handleConfirmRegistration}
            disabled={registering}
          >
            Xác nhận tham gia
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p>Vui lòng hoàn thành các bước sau để đăng ký tham gia sự kiện:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Đọc thông tin chi tiết và điền form đăng ký tại{' '}
              <a
                href={selectedEvent?.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                đây
              </a>
            </li>
            <li>Sau khi hoàn thành form, quay lại đây và nhấn "Xác nhận tham gia"</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">
              Lưu ý: Việc xác nhận tham gia sẽ giúp chúng tôi thống kê số lượng người tham dự chính xác hơn.
              Vui lòng chỉ xác nhận khi bạn đã điền form đăng ký.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Events;
