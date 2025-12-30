import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TuViChart } from "@/components/ui/TuViChart"
import { lapLaSo, type LasoResult } from "@/lib/tuvi"
import { Star, Calendar, User } from "lucide-react"

function App() {
  const [formData, setFormData] = useState({
    ten: "",
    ngay: 1,
    thang: 1,
    nam: 1990,
    gio: 1,
    gioiTinh: 1
  })
  const [laSo, setLaSo] = useState<LasoResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const gioSinhOptions = [
    { value: 1, label: "Tý (23h-1h)" },
    { value: 2, label: "Sửu (1h-3h)" },
    { value: 3, label: "Dần (3h-5h)" },
    { value: 4, label: "Mão (5h-7h)" },
    { value: 5, label: "Thìn (7h-9h)" },
    { value: 6, label: "Tỵ (9h-11h)" },
    { value: 7, label: "Ngọ (11h-13h)" },
    { value: 8, label: "Mùi (13h-15h)" },
    { value: 9, label: "Thân (15h-17h)" },
    { value: 10, label: "Dậu (17h-19h)" },
    { value: 11, label: "Tuất (19h-21h)" },
    { value: 12, label: "Hợi (21h-23h)" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const result = lapLaSo(
        formData.ngay,
        formData.thang,
        formData.nam,
        formData.gio,
        formData.gioiTinh,
        formData.ten || "Chưa có tên",
        true, // dương lịch
        7 // timezone Vietnam
      )
      setLaSo(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra khi tính lá số")
      console.error(err)
    }
  }

  const handleReset = () => {
    setLaSo(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Tử Vi Online
            </span>
          </div>
          {laSo && (
            <Button onClick={handleReset} variant="outline">
              Lập Lá Số Mới
            </Button>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-6 pb-12">
        {!laSo ? (
          /* Form nhập thông tin */
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Lập Lá Số Tử Vi
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Nhập thông tin ngày sinh dương lịch để xem lá số tử vi của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
              {/* Họ tên */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4" />
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.ten}
                  onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  placeholder="Nhập họ tên"
                />
              </div>

              {/* Ngày tháng năm */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="h-4 w-4" />
                  Ngày sinh dương lịch
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <select
                      value={formData.ngay}
                      onChange={(e) => setFormData({ ...formData, ngay: Number(e.target.value) })}
                      className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Ngày {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.thang}
                      onChange={(e) => setFormData({ ...formData, thang: Number(e.target.value) })}
                      className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.nam}
                      onChange={(e) => setFormData({ ...formData, nam: Number(e.target.value) })}
                      className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = 2024 - i
                        return <option key={year} value={year}>{year}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Giờ sinh */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Giờ sinh
                </label>
                <select
                  value={formData.gio}
                  onChange={(e) => setFormData({ ...formData, gio: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                >
                  {gioSinhOptions.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>

              {/* Giới tính */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Giới tính
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gioiTinh"
                      value={1}
                      checked={formData.gioiTinh === 1}
                      onChange={() => setFormData({ ...formData, gioiTinh: 1 })}
                      className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Nam</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gioiTinh"
                      value={0}
                      checked={formData.gioiTinh === 0}
                      onChange={() => setFormData({ ...formData, gioiTinh: 0 })}
                      className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Nữ</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white shadow-lg"
              >
                <Star className="h-5 w-5 mr-2" />
                Lập Lá Số Tử Vi
              </Button>
            </form>
          </div>
        ) : (
          /* Hiển thị lá số */
          <div>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Lá Số Tử Vi - {laSo.thienBan.ten}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {laSo.thienBan.ngayDuong}/{laSo.thienBan.thangDuong}/{laSo.thienBan.namDuong}
                {" - "}Giờ {laSo.thienBan.gioSinh} ({laSo.thienBan.namNu})
              </p>
            </div>
            <TuViChart
              thapNhiCung={laSo.diaBan.thapNhiCung}
              thienBan={laSo.thienBan}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 Tử Vi Online - Lập lá số tử vi chính xác
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
