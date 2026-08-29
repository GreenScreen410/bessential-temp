import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { steps } from '../data'

export function Icon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  return <img src={`/icons/${name}.svg`} width={size} height={size} alt="" className={`shrink-0 ${className}`} />
}

function FreeBadge({ size = 11 }: { size?: 11 | 13 }) {
  return (
    <span
      className="rounded-full bg-[#eff8f1] px-2 pt-[3px] pb-[2px] font-bold text-[#428147]"
      style={{ fontSize: size, letterSpacing: -0.02 * size }}
    >
      무료
    </span>
  )
}

/** text-box 트리밍은 flex 컨테이너에 안 먹혀서 텍스트를 block span으로 감쌈 */
export function Trim({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`block leading-[34px] trim ${className}`}>{children}</span>
}

/** STEP 헤더: 아이디어 입력 / 리포트 페이지 공통 */
export function StepHeader({ step, title, desc, right, badge }: { step: string; title: string; desc: string; right?: ReactNode; badge?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-sm font-medium leading-6 text-[#686b70]">{step}</p>
        <div className="mt-5 flex items-center gap-2">
          <h1 className="text-2xl font-bold leading-[34px] trim text-[#101729]">{title}</h1>
          {badge ?? <FreeBadge size={13} />}
        </div>
        <p className="mt-[18px] text-base font-medium leading-[34px] trim text-[#686b70]">{desc}</p>
      </div>
      {right}
    </header>
  )
}

export function PaidBadge() {
  return (
    <span className="rounded-full bg-[#eeeff1] px-2 py-[3px] text-[13px] font-bold tracking-[-0.26px] text-ink">PRO</span>
  )
}

/** 카드 안 소제목 */
export function Label({ icon, children }: { icon?: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold text-[#9c9d9e]">
      {icon && <Icon name={icon} size={20} />}
      <span className="leading-6 trim">{children}</span>
    </p>
  )
}

/** 접히는 섹션 — 헤더를 누르면 본문이 열린다 (리포트 이후 모든 심화 페이지 공통) */
export function Collapsible({
  head,
  count,
  defaultOpen = false,
  children,
}: {
  head: ReactNode
  count?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 px-[18px] py-4">
        {head}
        <span className="flex items-center gap-3">
          {count !== undefined && <span className="font-jakarta text-xs font-medium text-[#a8adb3]">{count}</span>}
          <Icon name="chevron" size={12} className={`transition ${open ? 'rotate-90' : '-rotate-90'}`} />
        </span>
      </button>
      {open && <div className="px-[18px] pb-5">{children}</div>}
    </section>
  )
}

/** 라벨 : 값 한 줄 (리포트·심화 페이지 공통 표) */
export function KeyRow({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded bg-[#eeeff1] p-[10px] text-[13px] leading-5">
      <span className="shrink-0 font-semibold trim text-muted">{k}</span>
      <span className={`text-right trim text-ink ${strong ? 'font-semibold' : 'font-medium'}`}>{v}</span>
    </div>
  )
}

/** 페이지 하단 — 다음 단계로 넘어가고, 이전 단계로 돌아간다 */
export function StepNav({ note }: { note?: string }) {
  const { pathname } = useLocation()
  const i = steps.findIndex((s) => s.to === pathname)
  const next = steps[i + 1]
  const prev = steps[i - 1]
  const pill =
    'rounded-full bg-black px-[60px] py-5 text-lg font-bold leading-[normal] tracking-[-0.36px] text-white transition hover:bg-[#232b35] disabled:cursor-not-allowed disabled:bg-[#eeeff1] disabled:text-[#a8adb3]'

  return (
    <div className="mt-[50px] flex flex-col items-center gap-5">
      {next &&
        (next.to ? (
          <Link to={next.to} className={pill}>
            {next.n} {next.label}로 이어가기
          </Link>
        ) : (
          <button disabled className={pill}>
            {next.n} {next.label}로 이어가기
          </button>
        ))}
      {note && <p className="text-sm font-medium leading-[normal] tracking-[-0.28px] text-[#888]">{note}</p>}
      {prev?.to && (
        <Link to={prev.to} className="text-sm font-bold text-[#677380] underline underline-offset-4">
          {prev.n} {prev.label} 다시 보기
        </Link>
      )}
    </div>
  )
}
