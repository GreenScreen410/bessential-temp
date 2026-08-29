import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, StepHeader } from '../components/ui'
import { report, steps } from '../data'

type Rows = [string, string][]
type Block = { title: string; rows: Rows }

/** 라벨 : 값 한 줄 */
function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded bg-[#eeeff1] p-[10px] text-[13px] leading-5">
      <span className="shrink-0 font-semibold trim text-muted">{k}</span>
      <span className={`text-right trim text-ink ${strong ? 'font-semibold' : 'font-medium'}`}>{v}</span>
    </div>
  )
}

export default function Report() {
  const r = report
  // 펼침 상태 하나로 축·섹션·항목을 모두 관리한다 (키에 접두사를 붙여 구분)
  const [open, setOpen] = useState(new Set(['sec:pros', 'sec:cons']))
  const isOpen = (k: string) => open.has(k)
  const toggle = (k: string) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })

  const Chevron = ({ k }: { k: string }) => (
    <Icon name="chevron" size={12} className={`transition ${isOpen(k) ? 'rotate-90' : '-rotate-90'}`} />
  )

  /** 접히는 섹션 — 헤더를 누르면 본문이 열린다 */
  function Section({ id, head, count, children }: { id: string; head: ReactNode; count: number; children: ReactNode }) {
    const k = `sec:${id}`
    return (
      <section className="rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7]">
        <button onClick={() => toggle(k)} className="flex w-full items-center justify-between gap-3 px-[18px] py-4">
          {head}
          <span className="flex items-center gap-3">
            <span className="font-jakarta text-xs font-medium text-[#a8adb3]">{count}</span>
            <Chevron k={k} />
          </span>
        </button>
        {isOpen(k) && <div className="px-[18px] pb-5">{children}</div>}
      </section>
    )
  }

  const label = (icon: string, title: string) => (
    <span className="flex items-center gap-2 text-sm font-semibold text-[#9c9d9e]">
      <Icon name={icon} size={20} />
      <span className="leading-6 trim">{title}</span>
    </span>
  )

  const pill = (icon: string, title: string, cls: string) => (
    <span className={`flex items-center gap-[10px] rounded-full px-4 py-[10px] text-sm font-semibold ${cls}`}>
      <Icon name={icon} size={20} />
      <span className="leading-6 trim">{title}</span>
    </span>
  )

  /** 장점·단점 항목 — 제목만 보이다가 누르면 근거 3줄이 펼쳐진다 */
  const points = (list: Block[], icon: string) => (
    <div className="divide-y divide-[#e5e8eb]">
      {list.map((b) => {
        const k = `item:${icon}:${b.title}`
        return (
          <div key={b.title}>
            <button onClick={() => toggle(k)} className="flex w-full items-center justify-between gap-3 py-[14px]">
              <span className="flex items-center gap-[6px] text-left text-sm font-semibold text-ink">
                <Icon name={icon} size={20} />
                <span className="leading-6 trim">{b.title}</span>
              </span>
              <Chevron k={k} />
            </button>
            {isOpen(k) && (
              <div className="flex flex-col gap-[6px] pb-[14px]">
                {b.rows.map(([kk, v]) => (
                  <Row key={kk} k={kk} v={v} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  /** 유사서비스·관련 사례 — 번호 + 제목 + 표 */
  const blocks = (list: Block[]) => (
    <div className="flex flex-col gap-[10px]">
      {list.map((b, i) => (
        <div key={b.title} className="rounded-[14px] bg-[#e4e4e4] px-1 pt-[14px] pb-1">
          <p className="flex items-center gap-2 px-2 text-[13px] leading-[normal] text-[#767676]">
            <span className="font-jakarta font-bold trim">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-semibold trim">{b.title}</span>
          </p>
          <div className="mt-[14px] flex flex-col gap-[6px] rounded-[10px] bg-white p-3">
            {b.rows.map(([k, v], j) => (
              <Row key={k} k={k} v={v} strong={j === b.rows.length - 1} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader step="STEP 02" title="종합 진단 리포트" desc="판정 · 6축 점수 · 유사서비스/사례 · 장단점" />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-semibold leading-6 trim tracking-[-0.28px] text-[#9c9d9e]">판정</p>
        <p className="mt-5 max-w-[678px] text-lg font-semibold leading-[27px] tracking-[-0.36px] text-ink">
          {r.verdict[0]}
          <br />
          {r.verdict[1]}
        </p>
        <div className="my-6 h-px bg-[#f0f0f0]" />

        <div className="grid grid-cols-[1.2fr_1fr] items-start gap-5 max-xl:grid-cols-1">
          {/* 6축 점수 — 축을 누르면 심사 코멘트가 열린다 */}
          <section className="rounded-[20px] bg-[#c3daff] px-5 pt-5 pb-6">
            <h3 className="text-lg font-bold leading-[normal] text-[#4d535a]">종합 진단 점수</h3>
            <p className="mt-4 font-jakarta text-[44px] font-medium leading-[normal]">
              <span className="text-navy">{r.score}</span>
              <span className="text-[#94aed6]">/100</span>
            </p>
            <div className="mt-6 flex flex-col gap-5">
              {r.axes.map((a) => {
                const k = `axis:${a.label}`
                return (
                  <div key={a.label}>
                    <button onClick={() => toggle(k)} className="w-full text-left">
                      <div className="flex items-end justify-between gap-3">
                        <span className="rounded-[5px] bg-navy/10 px-2 py-[3px] text-xs font-semibold leading-[22px] text-navy">
                          {a.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="font-jakarta text-[22px] font-medium leading-[normal] text-navy">{a.score}</span>
                          <Chevron k={k} />
                        </span>
                      </div>
                      <div className="mt-[10px] h-[10px] overflow-hidden rounded-full bg-[#94aed6]">
                        <div
                          className="h-full rounded-full bg-navy transition-[width] duration-700"
                          style={{ width: `${a.score}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs font-medium leading-[22px] text-navy/70">{a.desc}</p>
                    </button>
                    {isOpen(k) && (
                      <p className="mt-2 rounded-[5px] bg-navy/10 p-3 text-sm font-semibold leading-[22px] text-navy">
                        {a.note}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* 나머지는 접어두고 필요할 때 펼쳐본다 */}
          <div className="flex flex-col gap-3">
            <Section id="pros" count={r.pros.length} head={pill('mood', '장점', 'bg-[#e8f3ff] text-[#2373eb]')}>
              {points(r.pros, 'check')}
            </Section>
            <Section id="cons" count={r.cons.length} head={pill('sad', '단점', 'bg-[#ffeeef] text-[#e42a3a]')}>
              {points(r.cons, 'close')}
            </Section>

            <Section id="reasons" count={r.reasons.length} head={label('list_alt_check', '판정근거')}>
              <ul className="flex flex-col gap-[10px]">
                {r.reasons.map((t, i) => (
                  <li key={t} className="flex items-center gap-[10px] text-sm font-semibold leading-6 text-ink">
                    <Icon name={i === 0 ? 'arrow_right' : 'arrow_right2'} size={24} />
                    <span className="trim">{t}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="next" count={r.next.length} head={label('flag', '다음에 할 일')}>
              <ol className="flex flex-col gap-[10px]">
                {r.next.map((t, i) => (
                  <li key={t} className="flex items-center gap-[10px] text-sm font-semibold leading-6 text-ink">
                    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] bg-[#677380] text-[11px] font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="trim">{t}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="alt" count={r.alternatives.length} head={label('select_window', '유사서비스 / 대안')}>
              {blocks(r.alternatives)}
            </Section>

            <Section id="cases" count={r.cases.length} head={label('map_search', '관련 사례')}>
              {blocks(r.cases)}
            </Section>
          </div>
        </div>

        {/* 무료 리포트를 끝까지 본 직후 — 이 서비스에서 결제·가입을 처음 이야기하는 지점 */}
        <section className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7] px-[30px] py-6">
          <div>
            <p className="text-sm font-semibold leading-6 trim text-[#9c9d9e]">여기까지 무료로 확인하셨어요</p>
            <p className="mt-3 text-base font-bold leading-6 trim text-ink">
              다음은 이 아이디어를 실제로 굴려보기 위한 {steps.filter((s) => s.paid).length}개의 리포트예요.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {steps
                .filter((s) => s.paid)
                .map((s) => (
                  <span
                    key={s.n}
                    className="rounded-full border border-[#dfe2e5] bg-white px-3 py-[6px] text-xs font-semibold text-muted"
                  >
                    <span className="font-jakarta text-[#a8adb3]">{s.n}</span> {s.label}
                  </span>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              to="/bm"
              className="rounded-full bg-black px-8 py-4 text-sm font-bold whitespace-nowrap text-white transition hover:bg-[#232b35]"
            >
              이어서 만들기
            </Link>
            <Link
              to="/login"
              className="text-sm font-bold whitespace-nowrap text-[#677380] underline underline-offset-4"
            >
              리포트를 저장하려면 가입하기
            </Link>
          </div>
        </section>
        <p className="mt-5 text-center text-sm font-medium leading-[normal] tracking-[-0.28px] text-[#888]">출처 · 확인일</p>
      </article>
    </div>
  )
}
