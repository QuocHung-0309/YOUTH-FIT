import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Typography, Divider } from "antd";
import { TrophyOutlined, BulbOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function HocTapTot() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <BookOutlined style={{ color: "#2563eb", fontSize: 20 }} />
        <Title level={4} style={{ margin: 0 }}>
          TIÊU CHUẨN "HỌC TẬP TỐT"
        </Title>
      </div>
      <Divider />

      {/* Kết quả học tập */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <TrophyOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Kết quả học tập
          </Title>
        </div>

        <Controller
          name="diemHocKi1"
          control={control}
          render={({ field }) => (
            <div>
              <label>1. Điểm học tập Học kì I năm học 2024 - 2025</label>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.01}
                placeholder="Nhập điểm học kỳ 1"
                {...field}
              />
              {errors.diemHocKi1 && <Text type="danger">{errors.diemHocKi1.message}</Text>}
              <Text type="secondary">Nhập điểm trung bình học kỳ 1 (thang điểm 10)</Text>
            </div>
          )}
        />

        <Controller
          name="diemHocKi2"
          control={control}
          render={({ field }) => (
            <div>
              <label>2. Điểm học tập Học kì II năm học 2024 - 2025</label>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.01}
                placeholder="Nhập điểm học kỳ 2"
                {...field}
              />
              {errors.diemHocKi2 && <Text type="danger">{errors.diemHocKi2.message}</Text>}
              <Text type="secondary">Nhập điểm trung bình học kỳ 2 (thang điểm 10)</Text>
            </div>
          )}
        />
      </div>

      {/* Hoạt động nghiên cứu khoa học */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <BulbOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Hoạt động nghiên cứu khoa học
          </Title>
        </div>
        <Divider />

        {[
          {
            name: "thamGiaDeTaiNCKH",
            label:
              "3. Bạn có tham gia đề tài Nghiên cứu Khoa học (NCKH) các cấp với tư cách là thành viên nghiên cứu đề tài nào chưa?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên đề tài, cấp nghiên cứu, vai trò của bạn. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "thamGiaGiaiThuongEureka",
            label:
              "4. Bạn có tham gia Giải thưởng sinh viên nghiên cứu khoa học Euréka từ cấp Trường trở lên nào chưa?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên giải thưởng, cấp tổ chức, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "thamGiaCuocThi",
            label:
              "5. Bạn có tham gia dự thi hoặc tổ chức ít nhất 01 cuộc thi học thuật, sáng tạo, NCKH các cấp (từ cấp Liên Chi Hội trở lên và tương đương) chưa?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên cuộc thi, cấp tổ chức, thời gian, vai trò của bạn. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "thamGiaYTuongSangTao",
            label:
              '6. Bạn có tham gia dự thi hoặc tổ chức cuộc thi "Ý tưởng sáng tạo sinh viên toàn thành" hoặc các cuộc thi, hoạt động về khác Ý tưởng sáng tạo từ cấp Trường trở lên?',
            placeholder:
              "Nếu có, vui lòng ghi rõ tên cuộc thi, cấp tổ chức, thời gian, vai trò của bạn. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "thamGiaCLB",
            label:
              "7. Bạn có tham gia sinh hoạt định kỳ tại các Câu lạc bộ (CLB) học thuật, Nghiên cứu Khoa học (NCKH) từ cấp Liên Chi Hội trở lên và tương đương?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên CLB, thời gian tham gia. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "baiViet",
            label:
              "8. Bạn có bài viết đăng trên tạp chí chuyên ngành hoặc có bài tham luận tham gia các hội thảo khoa học chuyên ngành (được bảo trợ nội dung bởi các cơ quan chuyên môn) từ cấp trường trở lên không?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên bài viết, tên tạp chí/hội thảo, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "sanPhamSangTao",
            label:
              "9. Bạn có sản phẩm sáng tạo được cấp bằng sáng chế, cấp giấy phép xuất bản hoặc được các giải thưởng từ cấp tỉnh/ thành trực thuộc Trung ương trở lên?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên sản phẩm, loại giấy phép/giải thưởng, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "thamGiaDoiTuyen",
            label:
              "10. Bạn là thành viên các đội tuyển tham gia các kỳ thi học thuật cấp quốc gia, quốc tế?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên đội tuyển, kỳ thi tham gia, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "giaiThuongYTuong",
            label:
              "11. Bạn có đạt giải thưởng trong các cuộc thi ý tưởng sáng tạo từ cấp trường trở lên không?",
            placeholder:
              "Nếu có, vui lòng ghi rõ tên giải thưởng, cuộc thi, cấp tổ chức, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
        ].map(({ name, label, placeholder }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <div>
                <label>{label}</label>
                <TextArea
                  rows={4}
                  placeholder={placeholder}
                  {...field}
                  maxLength={1000}
                  showCount
                  style={{ marginBottom: 6 }}
                />
                {errors[name] && <Text type="danger">{errors[name]?.message}</Text>}
              </div>
            )}
          />
        ))}
      </div>

      {/* Kết quả học tập */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <ExclamationCircleOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Kết quả học tập
          </Title>
        </div>
        <Divider />
        <Controller
          name="rotMon"
          control={control}
          render={({ field }) => (
            <div>
              <label>12. Bạn có rớt môn trong năm học 2024 - 2025 không?</label>
              <TextArea
                rows={4}
                placeholder="Nếu có, vui lòng ghi rõ tên môn học, học kỳ. Nếu không, vui lòng ghi 'Không'."
                {...field}
                maxLength={1000}
                showCount
              />
              {errors.rotMon && <Text type="danger">{errors.rotMon.message}</Text>}
            </div>
          )}
        />
      </div>
    </div>
  );
}
