// About.tsx - Đã chuyển đổi theo nội dung của Văn phòng điện tử Đoàn - Hội khoa CNTT và bổ sung các kênh liên lạc

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { IconDeviceLaptop, IconCode, IconTrophy, IconBulb } from '../utils/icons';
import Section, { SectionHeader } from '../components/ui/Section';
import Grid from '../components/ui/Grid';
import useCountUp from '../hooks/useCountUp';
import BannerSlider from '../components/BannerSlider';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';

const features = [
  {
    icon: IconDeviceLaptop,
    title: 'Học tập',
    description: 'Tổ chức hội thảo, học thuật, cuộc thi chuyên môn giúp sinh viên nâng cao kiến thức.'
  },
  {
    icon: IconCode,
    title: 'Nghiên cứu - sáng tạo',
    description: 'Khuyến khích sinh viên nghiên cứu khoa học, phát triển ý tưởng và khởi nghiệp.'
  },
  {
    icon: IconTrophy,
    title: 'Rèn luyện',
    description: 'Thúc đẩy thể chất và tinh thần qua các hoạt động thể thao, kỹ năng mềm, thử thách bản thân.'
  },
  {
    icon: IconBulb,
    title: 'Tình nguyện & hội nhập',
    description: 'Tham gia phong trào tình nguyện, kết nối sinh viên và lan tỏa giá trị tốt đẹp trong cộng đồng.'
  }
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-12 h-12 bg-gray-200 animate-pulse rounded" />}>
    {children}
  </Suspense>
);

const bannerImages = [
  
  "https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747088516/483829884_648353327843988_1679095834648551471_n_dhjps9.jpg",
  "https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747085352/HACKATHON_e2z65j.jpg",
  "https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747087854/480913452_632037896142198_3988481439064926306_n_b6m0ft.jpg",
  
];

const StatCard = ({ number, label }: { number: string; label: string }) => {
  const endValue = parseInt(number);
  const count = useCountUp(endValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center p-8 bg-white rounded-xl shadow-lg"
    >
      <div className="text-4xl font-bold text-primary mb-2">{count}+</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
};

const About = () => {
  const channels = [
    { name: 'Website Khoa CNTT', url: 'https://fit.hcmute.edu.vn', icon: "https://res.cloudinary.com/yitute/image/upload/v1644160893/Logo/YIT_kegwop.png" },
    { name: 'Văn phòng điện tử Đoàn - Hội Khoa CNTT', url: 'https://youth-itute.vercel.app', icon: "https://res.cloudinary.com/yitute/image/upload/v1644160893/Logo/YIT_kegwop.png" },
    { name: 'Fanpage Đoàn - Hội Khoa CNTT', url: 'https://facebook.com/DoanHoiITUTE', icon: "https://res.cloudinary.com/yitute/image/upload/v1644160893/Logo/YIT_kegwop.png" },
    { name: 'Fanpage Khoa CNTT', url: 'https://www.facebook.com/fit.hcmute.edu.vn', icon: "https://res.cloudinary.com/yitute/image/upload/v1644160893/Logo/YIT_kegwop.png" },
    { name: 'Diễn đàn SV CNTT', url: 'https://facebook.com/groups/fitforum', icon: "https://img.icons8.com/color/480/000000/facebook-new.png" },
    { name: 'Group Sinh viên 5 tốt CNTT', url: 'https://www.facebook.com/groups/itute.sv5t/', icon: "https://img.icons8.com/color/480/000000/facebook-new.png"  },
    { name: 'Zalo SV 5 tốt - FIT', url: 'https://zalo.me/g/ncaoht371', icon: 'https://res.cloudinary.com/yitute/image/upload/v1648317647/Logo/zalo_dznmst.svg' },
    { name: 'Discord SV CNTT', url: 'https://discord.com/invite/pVCX6tyMXX', icon: 'https://img.icons8.com/color/480/000000/discord-new-logo.png' },
    { name: 'YouTube Đoàn - Hội', url: 'https://www.youtube.com/channel/UCGfDCrVFCmRTyQ5X8r0XZvw', icon: 'https://img.icons8.com/color/480/000000/youtube-play.png' },
    { name: 'TikTok Đoàn - Hội', url: 'https://www.tiktok.com/@yit_hcmute', icon: 'https://img.icons8.com/ios-filled/96/tiktok--v1.png' },
    { name: 'GitHub Đoàn - Hội', url: 'https://github.com/ITUTE', icon: 'https://img.icons8.com/fluency/96/github.png' },
    { name: 'Email Đoàn - Hội', url: 'mailto:yit@hcmute.edu.vn', icon: 'https://img.icons8.com/color/96/circled-envelope.png' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <Section className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Giới thiệu
              <br />
              <span className="text-primary">Đoàn - Hội khoa CNTT - HCMUTE</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Đoàn - Hội khoa Công nghệ Thông tin là nơi quy tụ những sinh viên năng động, sáng tạo, tích cực trong các hoạt động học thuật, kỹ năng, tình nguyện và phong trào. Với phương châm "Sinh viên ITUTE toàn diện", chúng tôi luôn đồng hành và phát triển sinh viên không chỉ về kiến thức mà còn về kỹ năng và đạo đức.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <BannerSlider images={bannerImages} />
          </motion.div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Giá trị cốt lõi"
          subtitle="Nền tảng định hướng cho mọi hoạt động của Đoàn - Hội"
        />
        <Grid cols={4} gap={8}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <IconWrapper>
                  <feature.icon size={32} />
                </IconWrapper>
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionHeader title="Các kênh thông tin liên lạc" subtitle="Liên hệ và theo dõi các hoạt động của Đoàn - Hội" />
        <Grid cols={4} gap={6}>
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center"
            >
              <img src={channel.icon} alt={channel.name} className="w-12 h-12 mb-3" />
              <p className="text-sm font-medium text-primary hover:underline">{channel.name}</p>
            </a>
          ))}
        </Grid>
      </Section>

      <Section className="bg-primary/5">
        <Grid cols={4} gap={8}>
          {[
            { number: '300', label: 'Sinh viên tham gia' },
            { number: '30', label: 'Sự kiện lớn nhỏ' },
            { number: '15', label: 'Chương trình thường niên' },
            { number: '10', label: 'CLB - Đội - Nhóm trực thuộc' },
          ].map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </Grid>
      </Section>
    </div>
  );
};

export default About;
