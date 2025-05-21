import React from 'react';
import { Form, InputNumber, Radio, Button, Space } from 'antd';

const HocTapTotPage = ({ onNext, formData, onFormChange }) => {
  const [form] = Form.useForm();

  // Nếu có dữ liệu trước đó, set initialValues
  React.useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const onFinish = (values) => {
    onFormChange(values);
    onNext();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      scrollToFirstError
      style={{ maxWidth: 700, margin: 'auto' }}
    >
      <h2>TIÊU CHUẨN "HỌC TẬP TỐT"</h2>

      <Form.Item
        label="1. Điểm học tập Học kì I năm học 2024 - 2025"
        name="diemHocKi1"
        rules={[
          { required: true, message: 'Vui lòng nhập điểm học kỳ 1' },
          { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' },
        ]}
      >
        <InputNumber
          placeholder="Nhập điểm học kỳ 1"
          min={0}
          max={10}
          step={0.01}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="2. Điểm học tập Học kì II năm học 2024 - 2025"
        name="diemHocKi2"
        rules={[
          { required: true, message: 'Vui lòng nhập điểm học kỳ 2' },
          { type: 'number', min: 0, max: 10, message: 'Điểm phải từ 0 đến 10' },
        ]}
      >
        <InputNumber
          placeholder="Nhập điểm học kỳ 2"
          min={0}
          max={10}
          step={0.01}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="3. Bạn có tham gia đề tài Nghiên cứu Khoa học (NCKH) các cấp với tư cách là thành viên nghiên cứu đề tài nào chưa?"
        name="thamGiaDeTaiNCKH"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="4. Bạn có tham gia Giải thưởng sinh viên nghiên cứu khoa học Euréka từ cấp Trường trở lên nào chưa?"
        name="thamGiaGiaiThuongEureka"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="5. Bạn có tham gia dự thi hoặc tổ chức ít nhất 01 cuộc thi học thuật, sáng tạo, NCKH các cấp (từ cấp Liên Chi Hội trở lên và tương đương) chưa?"
        name="thamGiaCuocThi"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="6. Bạn có tham gia dự thi hoặc tổ chức cuộc thi “Ý tưởng sáng tạo sinh viên toàn thành” hoặc các cuộc thi, hoạt động về khác Ý tưởng sáng tạo từ cấp Trường trở lên?"
        name="thamGiaYTuongSangTao"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="7. Bạn có tham gia sinh hoạt định kỳ tại các Câu lạc bộ (CLB) học thuật, Nghiên cứu Khoa học (NCKH) từ cấp Liên Chi Hội trở lên và tương đương?"
        name="thamGiaCLB"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="8. Bạn có bài viết đăng trên tạp chí chuyên ngành hoặc có bài tham luận tham gia các hội thảo khoa học chuyên ngành (được bảo trợ nội dung bởi các cơ quan chuyên môn) từ cấp trường trở lên không?"
        name="baiViet"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="9. Bạn có sản phẩm sáng tạo được cấp bằng sáng chế, cấp giấy phép xuất bản hoặc được các giải thưởng từ cấp tỉnh/ thành trực thuộc Trung ương trở lên?"
        name="sanPhamSangTao"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="10. Bạn là thành viên các đội tuyển tham gia các kỳ thi học thuật cấp quốc gia, quốc tế?"
        name="thamGiaDoiTuyen"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="11. Bạn có đạt giải thưởng trong các cuộc thi ý tưởng sáng tạo từ cấp trường trở lên không?"
        name="giaiThuongYTuong"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="12. Bạn có rớt môn trong năm học 2024 - 2025 không?"
        name="rotMon"
        rules={[{ required: true, message: 'Vui lòng chọn câu trả lời' }]}
      >
        <Radio.Group>
          <Radio value="yes">Có</Radio>
          <Radio value="no">Không</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">
            Tiếp theo
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default HocTapTotPage;
