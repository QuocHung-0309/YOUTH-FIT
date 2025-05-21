import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { User, School, Phone } from "lucide-react"

export default function ThongTinCaNhan() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      {/* Tiêu đề thông tin cá nhân */}
      <div className="flex items-center space-x-2">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Họ tên */}
        <FormField
          control={form.control}
          name="hoTen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Họ tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2. MSSV */}
        <FormField
          control={form.control}
          name="mssv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2. MSSV</FormLabel>
              <FormControl>
                <Input placeholder="Nhập MSSV" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 3. Khoa */}
        <FormField
          control={form.control}
          name="khoa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3. Khoa</FormLabel>
              <FormControl>
                <Input placeholder="Nhập khoa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 4. Ngành */}
        <FormField
          control={form.control}
          name="nganh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4. Ngành</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngành" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CNTT">Công nghệ thông tin</SelectItem>
                  <SelectItem value="KTDL">Khoa học dữ liệu</SelectItem>
                  <SelectItem value="ATTT">An toàn thông tin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 5. Lớp */}
        <FormField
          control={form.control}
          name="lop"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5. Lớp</FormLabel>
              <FormControl>
                <Input placeholder="Nhập lớp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 6. Giới tính */}
        <FormField
          control={form.control}
          name="gioiTinh"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>6. Giới tính</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-row space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Nam" />
                    </FormControl>
                    <FormLabel className="font-normal">Nam</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Nữ" />
                    </FormControl>
                    <FormLabel className="font-normal">Nữ</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Khác" />
                    </FormControl>
                    <FormLabel className="font-normal">Khác</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 7. Ngày sinh */}
        <FormField
          control={form.control}
          name="ngaySinh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>7. Ngày sinh</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 8. Dân tộc */}
        <FormField
          control={form.control}
          name="danToc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>8. Dân tộc</FormLabel>
              <FormControl>
                <Input placeholder="Nhập dân tộc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Thông tin Đoàn - Đảng */}
      <div className="flex items-center space-x-2 pt-4">
        <School className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Thông tin Đoàn - Đảng</h3>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 9. Ngày vào Đảng (dự bị) */}
        <FormField
          control={form.control}
          name="ngayVaoDangDuBi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>9. Ngày vào Đảng (dự bị)</FormLabel>
              <FormDescription>Nếu không có, xin để trống</FormDescription>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 10. Ngày vào Đảng (chính thức) */}
        <FormField
          control={form.control}
          name="ngayVaoDangChinhThuc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>10. Ngày vào Đảng (chính thức)</FormLabel>
              <FormDescription>Nếu không có, xin để trống</FormDescription>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 11. Ngày vào Đoàn */}
        <FormField
          control={form.control}
          name="ngayVaoDoan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>11. Ngày vào Đoàn</FormLabel>
              <FormDescription>Nếu không có, xin để trống</FormDescription>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Thông tin liên lạc */}
      <div className="flex items-center space-x-2 pt-4">
        <Phone className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Thông tin liên lạc</h3>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 12. Số điện thoại */}
        <FormField
          control={form.control}
          name="sdt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12. Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 13. Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>13. Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 14. Facebook */}
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>14. Facebook</FormLabel>
              <FormControl>
                <Input placeholder="Nhập link Facebook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 15. Địa chỉ liên lạc */}
        <FormField
          control={form.control}
          name="diaChi"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>15. Địa chỉ liên lạc</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ liên lạc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
