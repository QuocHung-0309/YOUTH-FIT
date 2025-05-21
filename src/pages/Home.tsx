import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { IconUsers, IconCode, IconDeviceLaptop } from '../utils/icons';
import { Link } from 'react-router-dom';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-12 h-12 bg-gray-200 animate-pulse rounded" />}>
    {children}
  </Suspense>
);

const bannerImages = [
  'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747088516/483829884_648353327843988_1679095834648551471_n_dhjps9.jpg',
  'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747085352/XTN2025_jfzarm.jpg',
  'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747086498/Slide.pptx_vgjo07.png',
  'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747086495/RA_M%E1%BA%AET_BAN_CH%E1%BA%A4P_H%C3%80NH_LI%C3%8AN_CHI_H%E1%BB%98I_KHOA_C%C3%94NG_NGH%E1%BB%86_TH%C3%94NG_TIN_KH%C3%93A_VIII_NHI%E1%BB%86M_K%E1%BB%B2_2025_-_2028_jlgg9g.png',
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Text */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  Chào mừng đến với
                  <br />
                  <span className="text-[#EA4335]">Đoàn - Hội khoa</span>
                  <br />
                  <span className="text-[#EA4335]">Công nghệ Thông tin</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Đây là nơi kết nối sinh viên Công nghệ Thông tin với các hoạt động Đoàn - Hội sôi nổi, sáng tạo và đầy ý nghĩa.
                  <br />
                  Tham gia để học tập, rèn luyện kỹ năng mềm, phát triển bản thân và đóng góp cho cộng đồng sinh viên.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    type="primary"
                    size="large"
                    icon={<IconUsers className="w-5 h-5" />}
                    className="flex items-center"
                    onClick={() => window.open('https://www.facebook.com/DoanHoiITUTE', '_blank')}
                  >
                    Tham gia
                  </Button>
                  <Button
                    size="large"
                    icon={<IconCode className="w-5 h-5" />}
                    className="flex items-center"
                  >
                    <Link to="/projects" onClick={() => window.scrollTo(0, 0)}>Dự án</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Banner Slider */}
            <div className="lg:w-1/2 relative h-[400px] w-full overflow-hidden rounded-2xl">
              {bannerImages.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentBanner === index ? 1 : 0,
                    x: currentBanner === index ? 0 : 100,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ display: currentBanner === index ? 'block' : 'none' }}
                >
                  <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${currentBanner === index ? 'bg-white w-4' : 'bg-white/50'}`}
                    onClick={() => setCurrentBanner(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <IconWrapper>
                <IconDeviceLaptop className="text-primary w-12 h-12 mb-4" />
              </IconWrapper>
              <h3 className="text-xl font-semibold mb-3">Hoạt động học thuật</h3>
              <p className="text-gray-600">
                Tham gia các buổi sinh hoạt chuyên đề, hội thảo và rèn luyện kỹ năng chuyên môn.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <IconWrapper>
                <IconCode className="text-secondary w-12 h-12 mb-4" />
              </IconWrapper>
              <h3 className="text-xl font-semibold mb-3">Hoạt động rèn luyện</h3>
              <p className="text-gray-600">
                Thử sức với tình nguyện, thể thao, văn nghệ để phát triển toàn diện.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <IconWrapper>
                <IconUsers className="text-accent w-12 h-12 mb-4" />
              </IconWrapper>
              <h3 className="text-xl font-semibold mb-3">Câu lạc bộ – Đội – Nhóm</h3>
              <p className="text-gray-600">
                Gắn kết sinh viên thông qua các CLB – đội – nhóm sôi nổi, sáng tạo.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlighted Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Các chương trình nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747085579/MASTERING_IT_2025_d0kodz.jpg"
                  alt="MIT"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cuộc thi học thuật truyền thông MasteringIT</h3>
                  <p className="text-gray-600 mb-4">
                    Trải qua hơn 18 mùa thi đấu, sự trở lại của MIT 2025 chắc chắn sẽ thật sự bùm nổ cho các bạn sinh viên.
                  </p>
                  <Button type="link">Xem chi tiết</Button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747085580/S%C3%93NG_IT_2025_uacxtx.jpg"
                  alt="SÓNG IT"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">SÓNG IT</h3>
                  <p className="text-gray-600 mb-4">
                    Tuyên dương các gương điển hình Khoa Công nghệ Thông tin trên tất cả các lĩnh vực như: Sinh viên 5T, Sinh viên có thành tích nổi bật trong học tập, NCKH, Tình nguyện
                  </p>
                  <Button type="link">Xem chi tiết</Button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747085582/M%C3%99A_H%C3%88_XANH_2024_n4zy93.jpg"
                  alt="Chiến dịch tình nguyện"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Chiến dịch tình nguyện</h3>
                  <p className="text-gray-600 mb-4">
                    Các chiến dịch tình nguyện Mùa hè xanh, Xuân tình nguyện, Hiến máu nhân đạo luôn là dấu ấn lớn của Đoàn – Hội ITUTE.
                  </p>
                  <Button type="link">Xem chi tiết</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn đã sẵn sàng đồng hành cùng Đoàn - Hội khoa CNTT chưa?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Hãy cùng nhau học tập, rèn luyện và lan toả năng lượng tích cực đến cộng đồng sinh viên.
            </p>
            <Button type="primary" size="large" onClick={() => window.open('https://www.facebook.com/DoanHoiITUTE', '_blank')}>
              Bắt đầu ngay hôm nay
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
