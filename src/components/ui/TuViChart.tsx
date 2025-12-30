import type { CungInfo } from '@/lib/tuvi/diaBan';
import type { ThienBanInfo } from '@/lib/tuvi/thienBan';

interface TuViChartProps {
  thapNhiCung: CungInfo[];
  thienBan: ThienBanInfo;
}

// Vị trí các cung theo thứ tự địa chi (Tý=1 đến Hợi=12)
const cungPositions = [
  { row: 3, col: 1 }, // 1 - Tý
  { row: 3, col: 0 }, // 2 - Sửu
  { row: 2, col: 0 }, // 3 - Dần
  { row: 1, col: 0 }, // 4 - Mão
  { row: 0, col: 0 }, // 5 - Thìn
  { row: 0, col: 1 }, // 6 - Tỵ
  { row: 0, col: 2 }, // 7 - Ngọ
  { row: 0, col: 3 }, // 8 - Mùi
  { row: 1, col: 3 }, // 9 - Thân
  { row: 2, col: 3 }, // 10 - Dậu
  { row: 3, col: 3 }, // 11 - Tuất
  { row: 3, col: 2 }, // 12 - Hợi
];

const nguHanhClasses: Record<string, string> = {
  hanhKim: 'hanh-kim',
  hanhMoc: 'hanh-moc',
  hanhThuy: 'hanh-thuy',
  hanhHoa: 'hanh-hoa',
  hanhTho: 'hanh-tho',
};

function CungCell({ cung }: { cung: CungInfo }) {
  const chinhTinh = cung.cungSao.filter(s => s.saoLoai === 1);
  const phuTinh = cung.cungSao.filter(s => s.saoLoai !== 1);

  return (
    <div className="bg-[var(--cung-bg)] border border-[var(--chart-border)] p-1.5 min-h-[140px] flex flex-col relative">
      {/* Header: Can Chi + Tiểu Hạn + Đại Hạn */}
      <div className="flex justify-between items-start text-[10px] border-b border-[var(--chart-border)] pb-1 mb-1">
        <span className="font-medium text-[var(--chart-header)]">
          {cung.cungTen}
        </span>
        <div className="flex gap-1 text-muted-foreground">
          {cung.cungTieuHan && <span>Th.{cung.cungTieuHan}</span>}
          {cung.cungDaiHan && <span className="font-semibold text-[var(--accent)]">{cung.cungDaiHan}</span>}
        </div>
      </div>

      {/* Tên cung chủ */}
      <div className="text-center mb-1">
        <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide">
          {cung.cungChu}
        </span>
        {cung.cungThan && (
          <span className="ml-1 text-[9px] bg-[var(--accent)] text-[var(--accent-foreground)] px-1 rounded">
            Thân
          </span>
        )}
      </div>

      {/* Chính tinh */}
      <div className="flex flex-col gap-0.5 mb-1">
        {chinhTinh.map((sao, idx) => (
          <span key={idx} className={`text-[10px] font-semibold ${nguHanhClasses[sao.cssSao] || 'text-foreground'}`}>
            + {sao.saoTen}
            {sao.saoDacTinh && <span className="text-[8px] ml-0.5">({sao.saoDacTinh})</span>}
          </span>
        ))}
      </div>

      {/* Phụ tinh */}
      <div className="flex flex-wrap gap-x-1 gap-y-0.5 flex-1">
        {phuTinh.slice(0, 12).map((sao, idx) => (
          <span key={idx} className={`text-[9px] ${nguHanhClasses[sao.cssSao] || 'text-foreground'}`}>
            {sao.saoTen}
            {sao.saoDacTinh && <span className="text-[7px]">({sao.saoDacTinh})</span>}
          </span>
        ))}
        {phuTinh.length > 12 && (
          <span className="text-[8px] text-muted-foreground">+{phuTinh.length - 12}</span>
        )}
      </div>

      {/* Tuần/Triệt */}
      {(cung.tuanTrung || cung.trietLo) && (
        <div className="absolute bottom-1 right-1 text-[8px] font-medium text-[var(--destructive)]">
          {cung.tuanTrung && 'Tuần'} {cung.trietLo && 'Triệt'}
        </div>
      )}
    </div>
  );
}

function CenterPanel({ thienBan }: { thienBan: ThienBanInfo }) {
  const thangNhuan = thienBan.thangNhuan ? ' (nhuận)' : '';

  return (
    <div className="col-span-2 row-span-2 bg-[var(--center-bg)] border border-[var(--chart-border)] p-3 flex flex-col">
      <h2 className="text-center text-base font-bold text-[var(--primary)] border-b border-[var(--chart-border)] pb-2 mb-2">
        LÁ SỐ TỬ VI
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] flex-1">
        <div className="col-span-2 text-center mb-1">
          <span className="font-bold text-sm text-foreground">{thienBan.ten}</span>
        </div>

        <div><span className="text-muted-foreground">Năm sinh:</span></div>
        <div className="font-medium">{thienBan.namAm} ({thienBan.canNamTen} {thienBan.chiNamTen})</div>

        <div><span className="text-muted-foreground">Tháng sinh:</span></div>
        <div className="font-medium">{thienBan.thangAm}{thangNhuan} ({thienBan.canThangTen} {thienBan.chiThangTen})</div>

        <div><span className="text-muted-foreground">Ngày sinh:</span></div>
        <div className="font-medium">{thienBan.ngayAm} ({thienBan.canNgayTen} {thienBan.chiNgayTen})</div>

        <div><span className="text-muted-foreground">Giờ sinh:</span></div>
        <div className="font-medium">{thienBan.gioSinh}</div>

        <div><span className="text-muted-foreground">Âm dương:</span></div>
        <div className="font-medium">{thienBan.amDuongNamSinh} {thienBan.namNu}</div>

        <div><span className="text-muted-foreground">Bản mệnh:</span></div>
        <div className="font-medium text-[var(--accent)]">{thienBan.banMenh}</div>

        <div><span className="text-muted-foreground">Cục:</span></div>
        <div className="font-medium text-[var(--primary)]">{thienBan.tenCuc}</div>

        <div><span className="text-muted-foreground">Mệnh chủ:</span></div>
        <div className="font-medium">{thienBan.menhChu}</div>

        <div><span className="text-muted-foreground">Thân chủ:</span></div>
        <div className="font-medium">{thienBan.thanChu}</div>

        <div className="col-span-2 text-center mt-1 pt-1 border-t border-[var(--chart-border)]">
          <span className="text-[10px] text-muted-foreground">{thienBan.sinhKhac}</span>
        </div>
      </div>
    </div>
  );
}

function NguHanhLegend() {
  return (
    <div className="flex justify-center gap-4 mt-3 text-xs">
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-[var(--hanh-kim)]"></span>
        <span>Kim</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-[var(--hanh-moc)]"></span>
        <span>Mộc</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-[var(--hanh-thuy)]"></span>
        <span>Thủy</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-[var(--hanh-hoa)]"></span>
        <span>Hỏa</span>
      </span>
      <span className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm bg-[var(--hanh-tho)]"></span>
        <span>Thổ</span>
      </span>
    </div>
  );
}

export function TuViChart({ thapNhiCung, thienBan }: TuViChartProps) {
  const grid: (CungInfo | null)[][] = Array(4).fill(null).map(() => Array(4).fill(null));

  for (let i = 1; i <= 12; i++) {
    const pos = cungPositions[i - 1];
    grid[pos.row][pos.col] = thapNhiCung[i];
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-4 gap-0 bg-[var(--chart-bg)] border-2 border-[var(--chart-border)] rounded">
        {grid.map((row, rowIdx) =>
          row.map((cung, colIdx) => {
            // Ô trung tâm (2x2)
            if (rowIdx > 0 && rowIdx < 3 && colIdx > 0 && colIdx < 3) {
              if (rowIdx === 1 && colIdx === 1) {
                return <CenterPanel key={`${rowIdx}-${colIdx}`} thienBan={thienBan} />;
              }
              return null;
            }

            if (!cung) return <div key={`${rowIdx}-${colIdx}`} className="bg-[var(--cung-bg)]" />;

            return <CungCell key={`${rowIdx}-${colIdx}`} cung={cung} />;
          })
        )}
      </div>
      <NguHanhLegend />
    </div>
  );
}
