import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Select, Radio, DatePicker, Form } from "antd";
import { UserOutlined, TeamOutlined, PhoneOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

export default function ThongTinCaNhan() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <div className="flex items-center space-x-2">
        <UserOutlined className="text-blue-600" style={{ fontSize: 20 }} />
        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Họ tên */}
        <Form.Item
          label="1. Họ tên"
          validateStatus={errors.hoTen ? "error" : ""}
          help={errors.hoTen?.message as string}
          required
        >
          <Controller
            name="hoTen"
            control={control}
            render={({ field }) => <Input placeholder="Nhập họ tên" {...field} />}
          />
        </Form.Item>

        {/* 2. MSSV */}
        <Form.Item
          label="2. MSSV"
          validateStatus={errors.mssv ? "error" : ""}
          help={errors.mssv?.message as string}
          required
        >
          <Controller
            name="mssv"
            control={control}
            render={({ field }) => <Input placeholder="Nhập MSSV" {...field} />}
          />
        </Form.Item>

        {/* 3. Khoa */}
        <Form.Item
          label="3. Khoa"
          validateStatus={errors.khoa ? "error" : ""}
          help={errors.khoa?.message as string}
          required
        >
          <Controller
            name="khoa"
            control={control}
            render={({ field }) => <Input placeholder="Nhập khoa" {...field} />}
          />
        </Form.Item>

        {/* 4. Ngành */}
        <Form.Item
          label="4. Ngành"
          validateStatus={errors.nganh ? "error" : ""}
          help={errors.nganh?.message as string}
          required
        >
          <Controller
            name="nganh"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Chọn ngành" onChange={field.onChange} value={field.value}>
                <Option value="CNTT">Công nghệ thông tin</Option>
                <Option value="KTDL">Khoa học dữ liệu</Option>
                <Option value="ATTT">An toàn thông tin</Option>
              </Select>
            )}
          />
        </Form.Item>

        {/* 5. Lớp */}
        <Form.Item
          label="5. Lớp"
          validateStatus={errors.lop ? "error" : ""}
          help={errors.lop?.message as string}
          required
        >
          <Controller
            name="lop"
            control={control}
            render={({ field }) => <Input placeholder="Nhập lớp" {...field} />}
          />
        </Form.Item>

        {/* 6. Giới tính */}
        <Form.Item
          label="6. Giới tính"
          validateStatus={errors.gioiTinh ? "error" : ""}
          help={errors.gioiTinh?.message as string}
          required
        >
          <Controller
            name="gioiTinh"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field} onChange={e => field.onChange(e.target.value)}>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                <Radio value="Khác">Khác</Radio>
              </Radio.Group>
            )}
          />
        </Form.Item>

        {/* 7. Ngày sinh */}
        <Form.Item
          label="7. Ngày sinh"
          validateStatus={errors.ngaySinh ? "error" : ""}
          help={errors.ngaySinh?.message as string}
          required
        >
          <Controller
            name="ngaySinh"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? moment(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
              />
            )}
          />
        </Form.Item>

        {/* 8. Dân tộc */}
        <Form.Item
          label="8. Dân tộc"
          validateStatus={errors.danToc ? "error" : ""}
          help={errors.danToc?.message as string}
          required
        >
          <Controller
            name="danToc"
            control={control}
            render={({ field }) => <Input placeholder="Nhập dân tộc" {...field} />}
          />
        </Form.Item>
      </div>

      {/* Thông tin Đoàn - Đảng */}
      <div className="flex items-center space-x-2 pt-4">
        <TeamOutlined className="text-blue-600" style={{ fontSize: 20 }} />
        <h3 className="text-lg font-medium">Thông tin Đoàn - Đảng</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 9. Ngày vào Đảng (dự bị) */}
        <Form.Item label="9. Ngày vào Đảng (dự bị)" required={false}>
          <Controller
            name="ngayVaoDangDuBi"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? moment(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
                format="YYYY-MM-DD"
                placeholder="Nếu không có, xin để trống"
              />
            )}
          />
        </Form.Item>

        {/* 10. Ngày vào Đảng (chính thức) */}
        <Form.Item label="10. Ngày vào Đảng (chính thức)" required={false}>
          <Controller
            name="ngayVaoDangChinhThuc"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? moment(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
                format="YYYY-MM-DD"
                placeholder="Nếu không có, xin để trống"
              />
            )}
          />
        </Form.Item>

        {/* 11. Ngày vào Đoàn */}
        <Form.Item label="11. Ngày vào Đoàn" required={false}>
          <Controller
            name="ngayVaoDoan"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? moment(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
                format="YYYY-MM-DD"
                placeholder="Nếu không có, xin để trống"
              />
            )}
          />
        </Form.Item>
      </div>

      {/* Thông tin liên lạc */}
      <div className="flex items-center space-x-2 pt-4">
        <PhoneOutlined className="text-blue-600" style={{ fontSize: 20 }} />
        <h3 className="text-lg font-medium">Thông tin liên lạc</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 12. Số điện thoại */}
        <Form.Item
          label="12. Số điện thoại"
          validateStatus={errors.sdt ? "error" : ""}
          help={errors.sdt?.message as string}
          required
        >
          <Controller
            name="sdt"
            control={control}
            render={({ field }) => <Input placeholder="Nhập số điện thoại" {...field} />}
          />
        </Form.Item>

        {/* 13. Email */}
        <Form.Item
          label="13. Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message as string}
          required
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input placeholder="Nhập email" type="email" {...field} />}
          />
        </Form.Item>

        {/* 14. Facebook */}
        <Form.Item
          label="14. Facebook"
          validateStatus={errors.facebook ? "error" : ""}
          help={errors.facebook?.message as string}
          required={false}
        >
          <Controller
            name="facebook"
            control={control}
            render={({ field }) => <Input placeholder="Nhập link Facebook" {...field} />}
          />
        </Form.Item>

        {/* 15. Địa chỉ liên lạc */}
        <Form.Item
          label="15. Địa chỉ liên lạc"
          validateStatus={errors.diaChi ? "error" : ""}
          help={errors.diaChi?.message as string}
          required
        >
          <Controller
            name="diaChi"
            control={control}
            render={({ field }) => <Input placeholder="Nhập địa chỉ liên lạc" {...field} />}
          />
        </Form.Item>
      </div>
    </div>
  );
}
