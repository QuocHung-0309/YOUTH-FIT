import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Card, Progress } from "antd";
import { SendOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { message } from "antd";
import ThongTinCaNhan from "../components/ThongTinCaNhan";
import HocTapTot from "../components/HocTapTot";
import DaoDucTot from "../components/DaoDucTot";
import TheLucTot from "../components/TheLucTot";
import HoiNhapTot from "../components/HoiNhapTot";
import TinhNguyenTot from "../components/TinhNguyenTot";

// Define Zod schema
const nonEmptyString = z
  .string()
  .min(1, "Vui lòng nhập thông tin")
  .transform((val) => val.trim());

const nonNegativeNumber = z.preprocess(
  (val) => {
    if (typeof val === "string") {
      const parsed = parseFloat(val.trim());
      return isNaN(parsed) ? val : parsed;
    }
    return val;
  },
  z.number().min(0, "Giá trị phải lớn hơn hoặc bằng 0")
);

const formSchema = z.object({
  hoTen: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự").transform((val) => val.trim()),
  mssv: z.string().min(7, "MSSV không hợp lệ").transform((val) => val.trim()),
  khoa: z.string().min(2, "Vui lòng nhập khoa").transform((val) => val.trim()),
  nganh: z.enum(["CNTT", "KTDL", "ATTT"], { errorMap: () => ({ message: "Vui lòng chọn ngành" }) }),
  lop: z.string().min(2, "Vui lòng nhập lớp").transform((val) => val.trim()),
  gioiTinh: z.enum(["Nam", "Nữ", "Khác"], { errorMap: () => ({ message: "Vui lòng chọn giới tính" }) }),
  ngaySinh: nonEmptyString,
  danToc: nonEmptyString,
  ngayVaoDangDuBi: z.string().optional(),
  ngayVaoDangChinhThuc: z.string().optional(),
  ngayVaoDoan: z.string().optional(),
  sdt: z.string().min(10, "Số điện thoại không hợp lệ").transform((val) => val.trim()),
  email: z.string().email("Email không hợp lệ").transform((val) => val.trim()),
  facebook: z.string().optional(),
  diaChi: z.string().min(5, "Vui lòng nhập địa chỉ liên lạc").transform((val) => val.trim()),

  diemHocKi1: nonEmptyString,
  diemHocKi2: nonEmptyString,
  thamGiaDeTaiNCKH: nonEmptyString,
  thamGiaGiaiThuongEureka: nonEmptyString,
  thamGiaCuocThi: nonEmptyString,
  thamGiaYTuongSangTao: nonEmptyString,
  thamGiaCLB: nonEmptyString,
  baiViet: nonEmptyString,
  sanPhamSangTao: nonEmptyString,
  thamGiaDoiTuyen: nonEmptyString,
  giaiThuongYTuong: nonEmptyString,
  rotMon: nonEmptyString,

  diemRenLuyen: nonEmptyString,
  thanhVienDoiThi: nonEmptyString,
  thamLuanBaiViet: nonEmptyString,
  thanhNienTieuBieu: nonEmptyString,

  danhHieuThanhNienKhoe: nonEmptyString,
  thamGiaHoatDongTheThao: nonEmptyString,
  thanhVienDoiTuyenTheThao: nonEmptyString,
  sinhVienKhuyetTat: nonEmptyString,

  nangLucNgoaiNgu: nonEmptyString,
  chungChiTiengAnh: nonEmptyString,
  giaiCuocThiNgoaiNgu: nonEmptyString,
  hoatDongGiaoLuuQuocTe: nonEmptyString,
  kyNangThucHanhXaHoi: nonEmptyString,
  hoiThaoGiaoLuuDoanhNghiep: nonEmptyString,
  chungNhanKyNang: nonEmptyString,
  thanhVienCLB: nonEmptyString,
  banChapHanh: nonEmptyString,
  hoatDongDongDien: nonEmptyString,
  cuocThiKyNang: nonEmptyString,
  khenThuongDoanHoi: nonEmptyString,

  chienDichTinhNguyen: nonEmptyString,
  diemCTXH: nonNegativeNumber,
  khenThuongTinhNguyen: nonEmptyString,
  hoatDongHoTroCongDong: nonEmptyString,
});

type FormData = z.infer<typeof formSchema>;

// Cast zodResolver đúng kiểu Resolver<FormData>
const resolver: Resolver<FormData> = zodResolver(formSchema) as Resolver<FormData>;

const defaultValues: FormData = {
  hoTen: "",
  mssv: "",
  khoa: "",
  nganh: "CNTT",
  lop: "",
  gioiTinh: "Nam",
  ngaySinh: "",
  danToc: "",
  ngayVaoDangDuBi: undefined,
  ngayVaoDangChinhThuc: undefined,
  ngayVaoDoan: undefined,
  sdt: "",
  email: "",
  facebook: undefined,
  diaChi: "",

  diemHocKi1: "",
  diemHocKi2: "",
  thamGiaDeTaiNCKH: "",
  thamGiaGiaiThuongEureka: "",
  thamGiaCuocThi: "",
  thamGiaYTuongSangTao: "",
  thamGiaCLB: "",
  baiViet: "",
  sanPhamSangTao: "",
  thamGiaDoiTuyen: "",
  giaiThuongYTuong: "",
  rotMon: "",

  diemRenLuyen: "",
  thanhVienDoiThi: "",
  thamLuanBaiViet: "",
  thanhNienTieuBieu: "",

  danhHieuThanhNienKhoe: "",
  thamGiaHoatDongTheThao: "",
  thanhVienDoiTuyenTheThao: "",
  sinhVienKhuyetTat: "",

  nangLucNgoaiNgu: "",
  chungChiTiengAnh: "",
  giaiCuocThiNgoaiNgu: "",
  hoatDongGiaoLuuQuocTe: "",
  kyNangThucHanhXaHoi: "",
  hoiThaoGiaoLuuDoanhNghiep: "",
  chungNhanKyNang: "",
  thanhVienCLB: "",
  banChapHanh: "",
  hoatDongDongDien: "",
  cuocThiKyNang: "",
  khenThuongDoanHoi: "",

  chienDichTinhNguyen: "",
  diemCTXH: 0,
  khenThuongTinhNguyen: "",
  hoatDongHoTroCongDong: "",
};

export default function RegisterSV5T() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  const fieldsByTab: Record<number, (keyof FormData)[]> = {
    0: [
      "hoTen",
      "mssv",
      "khoa",
      "nganh",
      "lop",
      "gioiTinh",
      "ngaySinh",
      "danToc",
      "ngayVaoDangDuBi",
      "ngayVaoDangChinhThuc",
      "ngayVaoDoan",
      "sdt",
      "email",
      "facebook",
      "diaChi",
    ],
    1: [
      "diemHocKi1",
      "diemHocKi2",
      "thamGiaDeTaiNCKH",
      "thamGiaGiaiThuongEureka",
      "thamGiaCuocThi",
      "thamGiaYTuongSangTao",
      "thamGiaCLB",
      "baiViet",
      "sanPhamSangTao",
      "thamGiaDoiTuyen",
      "giaiThuongYTuong",
      "rotMon",
    ],
    2: [
      "diemRenLuyen",
      "thanhVienDoiThi",
      "thamLuanBaiViet",
      "thanhNienTieuBieu",
    ],
    3: [
      "danhHieuThanhNienKhoe",
      "thamGiaHoatDongTheThao",
      "thanhVienDoiTuyenTheThao",
      "sinhVienKhuyetTat",
    ],
    4: [
      "nangLucNgoaiNgu",
      "chungChiTiengAnh",
      "giaiCuocThiNgoaiNgu",
      "hoatDongGiaoLuuQuocTe",
      "kyNangThucHanhXaHoi",
      "hoiThaoGiaoLuuDoanhNghiep",
      "chungNhanKyNang",
      "thanhVienCLB",
      "banChapHanh",
      "hoatDongDongDien",
      "cuocThiKyNang",
      "khenThuongDoanHoi",
    ],
    5: [
      "chienDichTinhNguyen",
      "diemCTXH",
      "khenThuongTinhNguyen",
      "hoatDongHoTroCongDong",
    ],
  };

  const form = useForm<FormData>({
    resolver,
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
  try {
    const res = await fetch("https://formspree.io/f/mvgaydyl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      message.success("🎉 Đăng ký thành công! Cảm ơn bạn đã tham gia.");
      form.reset();
      setActiveTab(0);
      setProgress(0);
    } else {
      message.error("Gửi thất bại, vui lòng thử lại.");
    }
  } catch {
    message.error("Gửi thất bại, vui lòng thử lại.");
  }
};

  const handleNext = async () => {
    const fieldsToValidate = fieldsByTab[activeTab];
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    if (activeTab < Object.keys(fieldsByTab).length - 1) {
      setActiveTab((prev) => prev + 1);
      setProgress(((activeTab + 1) / (Object.keys(fieldsByTab).length - 1)) * 100);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab((prev) => prev - 1);
      setProgress(((activeTab - 1) / (Object.keys(fieldsByTab).length - 1)) * 100);
    }
  };

  const tabs = [
    { id: 0, title: "Thông tin cá nhân", component: <ThongTinCaNhan /> },
    { id: 1, title: "Học tập tốt", component: <HocTapTot /> },
    { id: 2, title: "Đạo đức tốt", component: <DaoDucTot /> },
    { id: 3, title: "Thể lực tốt", component: <TheLucTot /> },
    { id: 4, title: "Hội nhập tốt", component: <HoiNhapTot /> },
    { id: 5, title: "Tình nguyện tốt", component: <TinhNguyenTot /> },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-5xl mx-auto border-t-4 border-blue-600 shadow-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-blue-700">
                ĐĂNG KÝ BÌNH XÉT DANH HIỆU SINH VIÊN 5 TỐT
              </h1>
              <p className="text-gray-600">
                Vui lòng điền đầy đủ thông tin theo từng bước
              </p>
            </div>

            <Progress percent={progress} showInfo className="mb-6" />

            <FormProvider {...form}>{tabs[activeTab].component}</FormProvider>

            <div className="flex justify-between mt-6">
              <Button disabled={activeTab === 0} onClick={handlePrevious}>
                <LeftOutlined /> Quay lại
              </Button>

              {activeTab === tabs.length - 1 ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center gap-2"
                >
                  Hoàn tất đăng ký <SendOutlined />
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Tiếp theo <RightOutlined />
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
