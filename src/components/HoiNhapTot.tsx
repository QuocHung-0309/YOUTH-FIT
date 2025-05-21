import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Typography, Divider } from "antd";
import { GlobalOutlined, ToolOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function HoiNhapTot() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  // For debugging - watch all form values
  const formValues = watch();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <GlobalOutlined style={{ color: "#2563eb", fontSize: 20 }} />
        <Title level={4} style={{ margin: 0 }}>
          TIÊU CHUẨN "HỘI NHẬP TỐT"
        </Title>
      </div>
      <Divider />

      {/* Ngoại ngữ */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <GlobalOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Ngoại ngữ
          </Title>
        </div>
        <Divider />

        {[
          {
            name: "nangLucNgoaiNgu",
            label: "1. Năng lực ngoại ngữ của bạn như thế nào?",
            placeholder: "Mô tả khả năng ngoại ngữ của bạn (ngôn ngữ, trình độ, khả năng giao tiếp...)",
          },
          {
            name: "chungChiTiengAnh",
            label: "2. Bạn có chứng chỉ tiếng Anh hoặc ngoại ngữ khác không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên chứng chỉ, điểm số, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "giaiCuocThiNgoaiNgu",
            label: "3. Bạn có đạt giải trong các cuộc thi về ngoại ngữ không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên cuộc thi, giải thưởng, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "hoatDongGiaoLuuQuocTe",
            label: "4. Bạn có tham gia các hoạt động giao lưu quốc tế không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên hoạt động, thời gian, vai trò. Nếu không, vui lòng ghi 'Không'.",
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
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
                {errors[name] && (
                  <Text type="danger">{errors[name]?.message?.toString()}</Text>
                )}
              </div>
            )}
          />
        ))}
      </div>

      {/* Kỹ năng */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <ToolOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Kỹ năng
          </Title>
        </div>
        <Divider />

        {[
          {
            name: "kyNangThucHanhXaHoi",
            label: "5. Bạn có tham gia các lớp kỹ năng thực hành xã hội không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên lớp, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "hoiThaoGiaoLuuDoanhNghiep",
            label: "6. Bạn có tham gia các hội thảo, giao lưu với doanh nghiệp không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên hội thảo, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "chungNhanKyNang",
            label: "7. Bạn có chứng nhận về kỹ năng không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên chứng nhận, thời gian. Nếu không, vui lòng ghi 'Không'.",
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
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
                {errors[name] && (
                  <Text type="danger">{errors[name]?.message?.toString()}</Text>
                )}
              </div>
            )}
          />
        ))}
      </div>

      {/* Hoạt động */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <TrophyOutlined style={{ color: "#2563eb", fontSize: 20 }} />
          <Title level={5} style={{ margin: 0 }}>
            Hoạt động
          </Title>
        </div>
        <Divider />

        {[
          {
            name: "thanhVienCLB",
            label: "8. Bạn có là thành viên của CLB, đội, nhóm không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên CLB, thời gian tham gia. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "banChapHanh",
            label: "9. Bạn có là thành viên Ban Chấp hành Đoàn - Hội các cấp không?",
            placeholder: "Nếu có, vui lòng ghi rõ chức vụ, nhiệm kỳ. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "hoatDongDongDien",
            label: "10. Bạn có tham gia các hoạt động văn nghệ, đồng diễn không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên hoạt động, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "cuocThiKyNang",
            label: "11. Bạn có tham gia các cuộc thi về kỹ năng không?",
            placeholder: "Nếu có, vui lòng ghi rõ tên cuộc thi, thời gian. Nếu không, vui lòng ghi 'Không'.",
          },
          {
            name: "khenThuongDoanHoi",
            label: "12. Bạn có được khen thưởng trong công tác Đoàn - Hội không?",
            placeholder: "Nếu có, vui lòng ghi rõ hình thức khen thưởng, thời gian. Nếu không, vui lòng ghi 'Không'.",
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
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
                {errors[name] && (
                  <Text type="danger">{errors[name]?.message?.toString()}</Text>
                )}
              </div>
            )}
          />
        ))}
      </div>

      {/* For debugging - uncomment if needed */}
      {/* <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
        <h4>Debug Form Values:</h4>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </div> */}
    </div>
  );
}
