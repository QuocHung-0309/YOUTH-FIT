import { useState, useEffect, useCallback } from 'react';
import { Card, Input, Tree, Tag, Button, message, Spin, Breadcrumb, Pagination } from 'antd';
import { DownloadOutlined, SearchOutlined, HomeOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  downloads: number;
}

const API_URL = 'http://localhost:4000'; // Địa chỉ json-server

const CATEGORIES = [
  {
    title: 'Tất cả',
    key: 'all',
  },
  {
    title: 'Linux & DevOps',
    key: 'linux-devops',
    children: [
      { title: 'Hệ điều hành Linux', key: 'linux-os' },
      { title: 'Shell Script', key: 'shell-script' },
      { title: 'Command Line', key: 'command-line' },
      { title: 'System Administration', key: 'system-admin' },
      { title: 'Network Administration', key: 'network-admin' },
      { title: 'Security', key: 'security' },
    ],
  },
  {
    title: 'Container & Orchestration',
    key: 'container',
    children: [
      { title: 'Docker', key: 'docker' },
      { title: 'Kubernetes', key: 'kubernetes' },
      { title: 'Docker Compose', key: 'docker-compose' },
      { title: 'Container Security', key: 'container-security' },
    ],
  },
  {
    title: 'CI/CD & Version Control',
    key: 'cicd-vcs',
    children: [
      { title: 'Git', key: 'git' },
      { title: 'GitHub', key: 'github' },
      { title: 'GitLab CI/CD', key: 'gitlab-cicd' },
      { title: 'Jenkins', key: 'jenkins' },
      { title: 'GitHub Actions', key: 'github-actions' },
    ],
  },
  {
    title: 'Lập trình',
    key: 'programming',
    children: [
      { title: 'Web Development', key: 'web' },
      { title: 'Mobile Development', key: 'mobile' },
      { title: 'AI/ML', key: 'ai' },
      { title: 'Backend', key: 'backend' },
      { title: 'Frontend', key: 'frontend' },
    ],
  },
  {
    title: 'Cơ sở dữ liệu',
    key: 'database',
    children: [
      { title: 'SQL', key: 'sql' },
      { title: 'NoSQL', key: 'nosql' },
      { title: 'Data Modeling', key: 'data-modeling' },
    ],
  },
  {
    title: 'Tài liệu học tập',
    key: 'study',
    children: [
      { title: 'Slide', key: 'slides' },
      { title: 'Bài tập', key: 'exercises' },
      { title: 'Đề thi mẫu', key: 'exam-samples' },
    ],
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ title: string; path?: string }>>([{ title: 'Tài liệu' }]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${API_URL}/documents`);
        if (!response.ok) throw new Error('Lỗi tải danh sách tài liệu');
        const data = await response.json();
        setDocuments(data);
      } catch (error:unknown) {
        message.error('Không thể tải danh sách tài liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleDownload = async (document: Document) => {
    try {
      // Nếu backend có API cập nhật lượt tải
      await fetch(`${API_URL}/documents/${document.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloads: document.downloads + 1 }),
      });

      window.open(document.fileUrl, '_blank');
    } catch {
      message.error('Không thể tải tài liệu');
    }
  };

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const getFilteredDocuments = useCallback(() => {
    const filtered = documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || doc.category === selectedCategory || doc.subCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      total: filtered.length,
      items: filtered.slice(startIndex, endIndex),
    };
  }, [documents, searchText, selectedCategory, currentPage]);

  const { total, items: filteredDocs } = getFilteredDocuments();

  const updateBreadcrumbs = (selectedKey: string) => {
    const newBreadcrumbs = [{ title: 'Tài liệu' }];

    if (selectedKey !== 'all') {
      const mainCategory = CATEGORIES.find((cat) => cat.key === selectedKey);
      if (mainCategory) {
        newBreadcrumbs.push({ title: mainCategory.title });
      } else {
        for (const category of CATEGORIES) {
          const subCategory = category.children?.find((sub) => sub.key === selectedKey);
          if (subCategory) {
            newBreadcrumbs.push({ title: category.title }, { title: subCategory.title });
            break;
          }
        }
      }
    }

    setBreadcrumbs(newBreadcrumbs);
  };

  const handleCategorySelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const selectedKey = selectedKeys[0].toString();
      setSelectedCategory(selectedKey);
      updateBreadcrumbs(selectedKey);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: (document.querySelector('.documents-list')?.getBoundingClientRect().top ?? 0) + window.scrollY - 100,
      behavior: 'smooth',
    });
  };

  // Component hiển thị card tài liệu
  const DocumentCard = ({ doc }: { doc: Document }) => (
    <motion.div
      key={doc.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-xl transition-all transform hover:-translate-y-1 duration-200">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">{doc.title}</h3>
            <p className="text-gray-600 mb-4 text-lg">{doc.description}</p>
            <div className="flex items-center space-x-4">
              <Tag color="blue" className="px-3 py-1 text-base">
                {doc.fileType}
              </Tag>
              <span className="text-gray-500">{doc.fileSize}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{doc.downloads} lượt tải</span>
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(doc)}
            className="flex items-center"
          >
            Đọc sách
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  // Input tìm kiếm
  const SearchInput = () => (
    <Input
      placeholder="Tìm kiếm tài liệu..."
      prefix={<SearchOutlined className="text-gray-400 text-xl" />}
      allowClear
      size="large"
      value={searchText}
      onChange={handleSearch}
      className="rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg py-3"
      autoFocus
    />
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-16" gradient="primary" pattern="dots">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tài liệu</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Khám phá kho tài nguyên học tập và phát triển của{' '}
            <span className="text-primary">Đoàn Hội khoa CNTT</span>. Tất cả tài liệu được tuyển chọn
            và cập nhật thường xuyên.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchInput />
          </div>
        </motion.div>
      </Section>

      <Section className="py-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                    <HomeOutlined className="mr-2" />
                    Trang chủ
                  </Link>
                ),
              },
              ...breadcrumbs.map((item, index) => ({
                title:
                  index === breadcrumbs.length - 1 ? (
                    <span className="font-medium">
                      {index === 0 ? <FolderOutlined className="mr-2" /> : <FileOutlined className="mr-2" />}
                      {item.title}
                    </span>
                  ) : (
                    <Link to={item.path || '#'} className="text-gray-600 hover:text-primary transition-colors">
                      <FolderOutlined className="mr-2" />
                      {item.title}
                    </Link>
                  ),
              })),
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card title={<span className="text-lg font-bold">Danh mục</span>} className="shadow-lg hover:shadow-xl transition-shadow">
              <Tree treeData={CATEGORIES} defaultSelectedKeys={['all']} onSelect={handleCategorySelect} className="text-base" />
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid gap-6 documents-list">
              <AnimatePresence mode="wait">
                {total === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8 bg-gray-50 rounded-xl"
                  >
                    <div className="text-gray-400 text-xl">Không tìm thấy tài liệu nào</div>
                  </motion.div>
                ) : (
                  <>
                    {filteredDocs.map((doc) => (
                      <DocumentCard key={doc.id} doc={doc} />
                    ))}

                    <div className="flex justify-center mt-8">
                      <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        className="text-center"
                      />
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Documents;
