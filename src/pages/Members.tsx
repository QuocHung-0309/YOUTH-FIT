import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Card, Avatar, Tag, Divider, message } from 'antd';
import { IconBrandFacebook, IconBrandGithub, IconMail } from '../utils/icons';
import Section from '../components/ui/Section';
import { config } from '../config/env';

// Ảnh tập thể lấy từ public hoặc URL trực tiếp
const doanKhoaGroup = 'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747086498/Slide.pptx_vgjo07.png'; // hoặc URL nếu bạn dùng URL trực tiếp
const lchGroup = 'https://res.cloudinary.com/dp5xqgbsj/image/upload/v1747086495/RA_M%E1%BA%AET_BAN_CH%E1%BA%A4P_H%C3%80NH_LI%C3%8AN_CHI_H%E1%BB%98I_KHOA_C%C3%94NG_NGH%E1%BB%86_TH%C3%94NG_TIN_KH%C3%93A_VIII_NHI%E1%BB%86M_K%E1%BB%B2_2025_-_2028_jlgg9g.png';

interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  team: string;
  department: string;
  year?: string;
  skills: string[];
  links: {
    facebook: string;
    github: string;
    email: string;
  };
  isPinned?: boolean;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />}>
    {children}
  </Suspense>
);

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.apiUrl}${path}`;
};

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-12"
    >
      <Card
        className="bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
        bodyStyle={{ padding: '48px' }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-none">
            <Avatar
              src={getImageUrl(member.avatar)}
              alt={member.name}
              size={200}
              className="border-8 border-primary/10"
            />
          </div>

          <div className="flex-grow text-center md:text-left space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-primary text-lg font-semibold">{member.role}</p>
              <p className="text-gray-500">{member.department}</p>
              {member.year && <p className="text-gray-500 text-sm">Nhiệm kỳ {member.year}</p>}
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {member.skills.map((skill, i) => (
                <Tag key={i} className="m-0.5 text-sm">
                  {skill}
                </Tag>
              ))}
            </div>

            <div className="flex justify-center md:justify-start space-x-6">
              <a href={member.links.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                <IconWrapper>
                  <IconBrandFacebook className="w-6 h-6" />
                </IconWrapper>
              </a>
              <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                <IconWrapper>
                  <IconBrandGithub className="w-6 h-6" />
                </IconWrapper>
              </a>
              <a href={`mailto:${member.links.email}`} className="text-gray-600 hover:text-primary">
                <IconWrapper>
                  <IconMail className="w-6 h-6" />
                </IconWrapper>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const response = await fetch('https://apidoanhoi.andyanh.id.vn/members');
      if (!response.ok) {
        throw new Error('Lỗi tải danh sách thành viên');
      }
      const result = await response.json();
      setMembers(result); // json-server trả về mảng trực tiếp ở endpoint /members
    } catch (error) {
      console.error('Error fetching members:', error);
      message.error('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);

  if (loading) {
    return (
      <Section>
        <div className="space-y-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-[300px] rounded-lg mx-auto max-w-4xl"></div>
          </div>
        </div>
      </Section>
    );
  }

  // Giả sử JSON chỉ có 2 member: Bí thư Đoàn khoa và LCH trưởng
  const biThu = members.find(m => m.team === 'doankhoa' && m.role.toLowerCase().includes('bí thư'));
  const lchTruong = members.find(m => m.team === 'lch' && m.role.toLowerCase().includes('trưởng'));

  return (
    <Section>
      <div className="pt-8 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Thành viên</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gặp gỡ những thành viên chủ chốt của <span className="text-primary">Đoàn - Hội khoa CNTT</span>.
          </p>
        </motion.div>
      </div>

      {biThu && (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Bí thư Đoàn khoa</h2>
          <MemberCard member={biThu} />
        </>
      )}

      {lchTruong && (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Liên chi Hội trưởng</h2>
          <MemberCard member={lchTruong} />
        </>
      )}

      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Tập thể Đoàn khoa</h2>
        <img
          src={doanKhoaGroup}
          alt="Tập thể Đoàn khoa"
          className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      <div className="my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Tập thể Liên chi Hội khoa</h2>
        <img
          src={lchGroup}
          alt="Tập thể Liên chi Hội khoa"
          className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </Section>
  );
};

export default Members;
