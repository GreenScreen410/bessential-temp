import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from './ui'
import { myReports, steps } from '../data'

const links = [
  { icon: 'money_bag', label: '요금제', to: '/pricing' },
  { icon: 'description', label: '샘플리포트', to: '/report' },
  { icon: 'help', label: 'FAQ · 문의', to: '/faq' },
  { icon: 'login', label: '로그인', to: '/login' },
  { icon: 'book', label: '서비스 소개', to: '/about' },
]

const row = 'flex h-[38px] w-full items-center gap-[10px] rounded-lg px-[10px] text-xs tracking-[-0.24px]'

/**
 * 진행도 바 — 어느 단계에 있는지 항상 보이도록 본문 상단에 얇게 고정한다.
 * (단계 표지는 원래 사이드바 맨 아래에 있었지만 늘 보이지 않아 위로 옮김)
 */
function ProgressBar({ pathname }: { pathname: string }) {
  const nav = useNavigate()
  const i = steps.findIndex((s) => s.to === pathname)
  const isStep = i >= 0

  return (
    <div className="sticky top-[10px] z-10 flex h-[52px] items-center justify-between gap-6 rounded-t-[10px] border-b border-[#eef0f2] bg-[#f9fafb] px-10">
      {i !== 0 ? (
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-2 text-xs font-semibold tracking-[-0.24px] text-[#677380] hover:underline"
        >
          <Icon name="chevron" size={12} />
          이전 페이지
        </button>
      ) : (
        <span />
      )}
      {isStep && (
        <div className="flex items-center gap-3">
          <div className="h-[6px] w-[220px] overflow-hidden rounded-full bg-[#e9ebef]">
            <div
              className="h-full rounded-full bg-[#677380] transition-[width] duration-500"
              style={{ width: `${((i + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="font-jakarta text-xs font-medium tracking-[-0.24px] text-[#a8adb3]">
            {i + 1}/{steps.length}단계
          </span>
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  // /report 에 있을 때만 목록에서 하나가 선택된 상태
  const activeReport = pathname === '/report' ? (params.get('id') ?? myReports[0].id) : null

  return (
    <div className="flex min-h-screen gap-[10px] p-[10px]">
      <aside className="sticky top-[10px] flex h-[calc(100vh-20px)] w-[258px] shrink-0 flex-col rounded-[10px] bg-white p-[5px] pt-4">
        <NavLink to="/" className="mb-4 ml-[11px] flex h-6 w-[139px] items-center gap-[3px]">
          <img src="/icons/logo_mark.svg" alt="" className="h-5 w-5" />
          <img src="/icons/logo_text.svg" alt="B Essential" className="h-4 -scale-y-100" />
        </NavLink>

        <NavLink
          to="/"
          className={`${row} shrink-0 border border-[#dfe2e5] font-bold text-ink transition hover:border-[#677380]`}
        >
          <span className="w-4 text-center text-base leading-none text-[#677380]">+</span>
          새 아이디어 진단
        </NavLink>

        <p className="mt-5 mb-2 px-[10px] text-[11px] font-semibold tracking-[-0.22px] text-[#a8adb3]">내 리포트</p>
        <nav className="min-h-0 flex-1 overflow-y-auto">
          {myReports.map((r) => (
            <NavLink
              key={r.id}
              to={`/report?id=${r.id}`}
              className={`flex flex-col gap-[3px] rounded-lg px-[10px] py-2 ${
                activeReport === r.id ? 'bg-[#f5f6f8]' : 'hover:bg-[#f5f6f8]'
              }`}
            >
              <span
                className={`truncate text-xs tracking-[-0.24px] ${
                  activeReport === r.id ? 'font-bold text-black' : 'font-semibold text-[#686b70]'
                }`}
              >
                {r.title}
              </span>
              <span className="text-[11px] font-medium tracking-[-0.22px] text-[#a8adb3]">{r.meta}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="shrink-0 border-t border-line pt-[10px]">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `${row} font-medium text-[#677380] ${isActive ? 'bg-[#f5f6f8]' : 'hover:bg-[#f5f6f8]'}`
              }
            >
              <Icon name={l.icon} />
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 rounded-[10px] bg-[#f9fafb]">
        <ProgressBar pathname={pathname} />
        <Outlet />
      </main>
    </div>
  )
}
