import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Typography, Divider } from "antd";
import { Dumbbell } from "lucide-react";

const { Text, Title } = Typography;
const { TextArea } = Input;

function renderErrorMessage(error?: any) {
  if (error?.message && typeof error.message === "string") {
    return <Text type="danger">{error.message}</Text>;
  }
  return null;
}

export default function TheLucTot() {
  const { control, formState } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Dumbbell className="h-5 w-5 text-blue-600" />
        <Title level={4} style={{ margin: 0 }}>
          TIÊU CHUẨN "THỂ LỰC TỐT"
        </Title>
      </div>
      <Divider />

      <div className="space-y-8">
        {/* 3.1 */}
        <Controller
          control={control}
          name="danhHieuThanhNienKhoe"
          render={({ field }) => (
            <div>
              <label className="font-semibold block mb-1">
                3.1. Đạt danh hiệu "Thanh niên khỏe" trong năm học 2022 - 2023
              </label>
              <TextArea
                {...field}
                placeholder="Ghi rõ thời gian nhận chứng nhận. Nếu không có, vui lòng ghi 'Không'."
                rows={4}
              />
              {renderErrorMessage(formState.errors.danhHieuThanhNienKhoe)}
            </div>
          )}
        />

        {/* 3.2 */}
        <Controller
          control={control}
          name="thamGiaHoatDongTheThao"
          render={({ field }) => (
            <div>
              <label className="font-semibold block mb-1">
                3.2. Tham gia các hoạt động thể dục thể thao, giải chạy, hội thao sinh viên (trừ thể thao điện tử) từ cấp Trường trở lên và đạt giấy chứng nhận
              </label>
              <TextArea
                {...field}
                placeholder="Ghi rõ thời gian nhận chứng nhận. Nếu không có, vui lòng ghi 'Không'."
                rows={4}
              />
              {renderErrorMessage(formState.errors.thamGiaHoatDongTheThao)}
            </div>
          )}
        />

        {/* 3.3 */}
        <Controller
          control={control}
          name="thanhVienDoiTuyenTheThao"
          render={({ field }) => (
            <div>
              <label className="font-semibold block mb-1">
                3.3. Là thành viên đội tuyển cấp trường, thành phố các môn thể dục thể thao
              </label>
              <Text type="secondary" className="block mb-1">
                Ưu tiên những sinh viên là vận động viên đạt huy chương trong các giải thi đấu cấp quốc gia, khu vực và quốc tế.
              </Text>
              <TextArea
                {...field}
                placeholder="Nếu có, vui lòng ghi rõ tên đội tuyển, cấp đội tuyển, thời gian tham gia. Nếu không, vui lòng ghi 'Không'."
                rows={4}
              />
              {renderErrorMessage(formState.errors.thanhVienDoiTuyenTheThao)}
            </div>
          )}
        />

        {/* 3.4 */}
        <Controller
          control={control}
          name="sinhVienKhuyetTat"
          render={({ field }) => (
            <div>
              <label className="font-semibold block mb-1">
                3.4. Đối với những sinh viên khuyết tật có giấy xác nhận được miễn tiêu chuẩn này
              </label>
              <TextArea
                {...field}
                placeholder="Nếu có, vui lòng ghi rõ thông tin giấy xác nhận. Nếu không, vui lòng ghi 'Không'."
                rows={4}
              />
              {renderErrorMessage(formState.errors.sinhVienKhuyetTat)}
            </div>
          )}
        />
      </div>
    </div>
  );
}
