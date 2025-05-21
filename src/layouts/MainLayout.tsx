import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex-grow"
      >
        {children}
      </motion.main>

      {/* Footer chỉnh sửa */}
      <footer className="bg-[#1b2431] text-white mt-auto">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Đoàn - Hội khoa Công nghệ Thông tin - HCMUTE. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/ITUTE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://facebook.com/DoanHoiITUTE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
