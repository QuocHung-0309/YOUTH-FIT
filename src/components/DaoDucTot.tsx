"use client"

import { useFormContext, Controller } from "react-hook-form";
import { Form, Input } from "antd";
import { Heart, Award, BookOpen } from "lucide-react";

const { TextArea } = Input;

export default function DaoDucTot() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Heart className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">TIÊU CHUẨN "ĐẠO ĐỨC TỐT"</h3>
      </div>
      <hr className="border-gray-300 my-4" />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium">Điểm rèn luyện</h3>
        </div>

        <Form.Item
          label="1. Điểm rèn luyện: Điểm rèn luyện trung bình của năm học"
          validateStatus={errors.diemRenLuyen ? "error" : ""}
          help={errors.diemRenLuyen?.message as React.ReactNode}
        >
          <Controller
            name="diemRenLuyen"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Nhập điểm rèn luyện"
                min={0}
                max={100}
                step={0.01}
                {...field}
              />
            )}
          />
        </Form.Item>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium">Hoạt động học tập và làm theo tư tưởng Hồ Chí Minh</h3>
        </div>
        <hr className="border-gray-300 my-4" />

        <Form.Item
          label="2.1. Là thành viên chính thức của đội thi tìm hiểu về chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh từ cấp Trường trở lên"
          validateStatus={errors.thanhVienDoiThi ? "error" : ""}
          help={errors.thanhVienDoiThi?.message as React.ReactNode}
        >
          <Controller
            name="thanhVienDoiThi"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="Nếu có, vui lòng ghi rõ tên đội thi, cấp tổ chức, thời gian. Nếu không, vui lòng ghi 'Không'."
                rows={4}
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="2.2. Có tham luận, bài viết được trình bày tại các diễn đàn học thuật về các môn khoa học Mác - Lênin, tư tưởng Hồ Chí Minh từ cấp Trường trở lên"
          validateStatus={errors.thamLuanBaiViet ? "error" : ""}
          help={errors.thamLuanBaiViet?.message as React.ReactNode}
        >
          <Controller
            name="thamLuanBaiViet"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="Ghi rõ tên tham luận, diễn đàn nào, cấp tổ chức, thời gian tổ chức. Nếu không, vui lòng ghi 'Không'."
                rows={4}
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="2.3. Là thanh niên/ sinh viên tiêu biểu trong các lĩnh vực, thanh niên tiên tiến làm theo lời Bác, gương người tốt, việc tốt, có hành động dũng cảm cứu người được các cấp ghi nhận, biểu dương, khen thưởng hoặc nêu gương qua các phương tiện thông tin đại chúng"
          validateStatus={errors.thanhNienTieuBieu ? "error" : ""}
          help={errors.thanhNienTieuBieu?.message as React.ReactNode}
        >
          <Controller
            name="thanhNienTieuBieu"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="Ghi rõ danh hiệu, cấp tổ chức và thời gian tuyên dương hoặc đường dẫn đến phương tiện thông tin đại chúng đăng bài biểu dương. Nếu không, vui lòng ghi 'Không'."
                rows={4}
                {...field}
              />
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
}
