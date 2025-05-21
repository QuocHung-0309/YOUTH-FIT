"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Form, Input, Divider } from "antd";
import {
  HeartOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function TinhNguyenTot() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Hàm lấy message lỗi an toàn
  const getErrorMessage = (field: string): string | undefined => {
    const error = errors[field];
    if (!error) return undefined;
    // error có thể là FieldError hoặc Merge
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    return undefined;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <HeartOutlined className="text-blue-600" />
        <h3 className="text-lg font-medium">TIÊU CHUẨN "TÌNH NGUYỆN TỐT"</h3>
      </div>
      <Divider />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <TrophyOutlined className="text-blue-600" />
          <h3 className="text-lg font-medium">Hoạt động tình nguyện</h3>
        </div>
        <Divider />

        {/* 4.1 */}
        <Form.Item
          label="4.1. Tham gia và nhận giấy chứng nhận hoàn thành đầy đủ một trong các chương trình, chiến dịch sau: Chiến dịch Xuân tình nguyện 2023, Chương trình Tiếp sức mùa thi 2023 và Chiến dịch Mùa hè xanh 2023"
          validateStatus={errors.chienDichTinhNguyen ? "error" : ""}
          help={getErrorMessage("chienDichTinhNguyen")}
        >
          <Controller
            control={control}
            name="chienDichTinhNguyen"
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="VD: Tham gia chiến dịch 'Xuân tình nguyện 2023' khoa Công nghệ Thông tin."
                rows={4}
              />
            )}
          />
        </Form.Item>

        {/* 4.2 */}
        <Form.Item
          label="4.2. Tham gia và đạt được ít nhất 25 điểm công tác xã hội/ năm học"
          validateStatus={errors.diemCTXH ? "error" : ""}
          help={getErrorMessage("diemCTXH")}
        >
          <Controller
            control={control}
            name="diemCTXH"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="VD: 30.0"
                min={0}
                step={0.5}
              />
            )}
          />
        </Form.Item>

        {/* 4.3 */}
        <Form.Item
          label="4.3. Được khen thưởng từ cấp khoa trở lên về hoạt động tình nguyện"
          validateStatus={errors.khenThuongTinhNguyen ? "error" : ""}
          help={getErrorMessage("khenThuongTinhNguyen")}
        >
          <Controller
            control={control}
            name="khenThuongTinhNguyen"
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="VD: Không."
                rows={4}
              />
            )}
          />
        </Form.Item>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2">
          <UsergroupAddOutlined className="text-blue-600" />
          <h3 className="text-lg font-medium">Tiêu chuẩn ưu tiên</h3>
        </div>
        <Divider />
        <p className="text-sm text-gray-500 italic">
          Ưu tiên cho những cá nhân đạt từ 20 điểm CTXH trở lên.
        </p>

        <Form.Item
          label="Tham gia và đạt giấy chứng nhận tham gia các hoạt động hỗ trợ cộng đồng tại khu địa bàn dân cư hoặc tại địa phương nơi sinh viên học tập và sinh hoạt"
          validateStatus={errors.hoatDongHoTroCongDong ? "error" : ""}
          help={getErrorMessage("hoatDongHoTroCongDong")}
        >
          <Controller
            control={control}
            name="hoatDongHoTroCongDong"
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Nếu có, vui lòng ghi rõ thông tin. Nếu không, vui lòng ghi 'Không'."
                rows={4}
              />
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
}
