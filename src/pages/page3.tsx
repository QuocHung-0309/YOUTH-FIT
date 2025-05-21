import React from 'react';
import { Form, Input, Button, Space } from 'antd';

interface Page3Props {
  initialValues: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const Page3: React.FC<Page3Props> = ({ initialValues, onNext, onBack }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onNext(values);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        label="1. Điểm rèn luyện trung bình của năm học"
        name="diemRenLuyen"
        rules={[{ required: true, message: 'Vui lòng nhập điểm rèn luyện' }]}
      >
        <Input type="number" min={0} max={100} placeholder="Nhập điểm rèn luyện (0-100)" />
      </Form.Item>

      <Form.Item
        label="2.1 Là thành viên chính thức của đội thi tìm hiểu về chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh từ cấp Trường trở lên"
        name="thanhVienDoiThi"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
        tooltip="Nếu có, ghi rõ chi tiết; nếu không thì ghi 'Không'"
      >
        <Input.TextArea rows={3} placeholder="Ghi rõ chi tiết hoặc 'Không'" />
      </Form.Item>

      <Form.Item
        label="2.2 Có tham luận, bài viết được trình bày tại các diễn đàn học thuật về các môn khoa học Mác - Lênin, tư tưởng Hồ Chí Minh từ cấp Trường trở lên"
        name="thamLuanBaiViet"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
        tooltip="Ghi rõ tên tham luận, diễn đàn, cấp tổ chức, thời gian tổ chức hoặc 'Không'"
      >
        <Input.TextArea rows={3} placeholder="Ghi rõ chi tiết hoặc 'Không'" />
      </Form.Item>

      <Form.Item
        label="2.3 Là thanh niên/ sinh viên tiêu biểu trong các lĩnh vực, thanh niên tiên tiến làm theo lời Bác..."
        name="thanhNienTieuBieu"
        rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
        tooltip="Ghi rõ danh hiệu, cấp tổ chức, thời gian hoặc đường dẫn phương tiện thông tin hoặc 'Không'"
      >
        <Input.TextArea rows={3} placeholder="Ghi rõ chi tiết hoặc 'Không'" />
      </Form.Item>

    </Form>
  );
};

export default Page3;
