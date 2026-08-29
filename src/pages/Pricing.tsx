import { Link } from 'react-router-dom'
import { Icon } from '../components/ui'
import { faq, plans } from '../data'

export default function Pricing() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <header className="text-center">
        <p className="text-sm font-medium leading-6 text-[#686b70]">요금제</p>
        <h1 className="mt-5 text-2xl font-bold leading-[34px] trim text-[#101729]">
          진단까지는 무료, 실행 리포트만 결제하세요
        </h1>
        <p className="mt-[18px] text-base font-medium leading-6 text-[#686b70]">
          구독이 아니라 아이디어 한 건 단위로 결제합니다. 쓰지 않으면 돈이 나가지 않아요.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-3 items-start gap-3 max-xl:grid-cols-1">
        {plans.map((p) => (
          <section
            key={p.name}
            className={`flex flex-col rounded-2xl border p-8 ${
              p.highlight ? 'border-black bg-white shadow-[0_0_15px_rgba(0,0,0,0.08)]' : 'border-[#dfe2e5] bg-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-jakarta text-base font-bold text-ink">{p.name}</span>
              {p.highlight && (
                <span className="rounded-full bg-[#eeeff1] px-2 py-[3px] text-[11px] font-bold text-ink">추천</span>
              )}
              {p.current && (
                <span className="rounded-full bg-[#eff8f1] px-2 py-[3px] text-[11px] font-bold text-[#428147]">이용 중</span>
              )}
            </div>
            <p className="mt-4 flex items-end gap-1">
              <span className="font-jakarta text-[32px] font-medium leading-[normal] text-ink">{p.price}</span>
              {p.per && <span className="pb-1 text-sm font-medium text-muted">{p.per}</span>}
            </p>
            <p className="mt-3 text-sm font-medium leading-5 text-muted">{p.desc}</p>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-medium leading-5 text-ink">
                  <Icon name="check" size={20} />
                  <span className="trim">{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={p.current}
              className={`mt-8 rounded-full py-4 text-sm font-bold transition ${
                p.highlight
                  ? 'bg-black text-white hover:bg-[#232b35]'
                  : 'border border-[#dfe2e5] bg-white text-[#677380] hover:border-[#677380]'
              } disabled:cursor-default disabled:border-[#eeeff1] disabled:bg-[#f7f7f7] disabled:text-[#a8adb3]`}
            >
              {p.cta}
            </button>
          </section>
        ))}
      </div>

      <section className="mx-auto mt-[60px] max-w-[760px]">
        <h2 className="mb-5 text-base font-semibold leading-[34px] trim text-ink">결제 전, 자주 묻는 질문</h2>
        <div className="rounded-2xl border border-[#dfe2e5] bg-white p-7">
          <ul className="divide-y divide-line [&>li:first-child_summary]:pt-0 [&>li:last-child_summary]:pb-0">
            {faq.map((q) => (
              <li key={q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-[6px] py-5 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                    <span className="block leading-[34px] trim">{q}</span>
                    <Icon name="chevron" size={12} className="-rotate-90 transition group-open:rotate-90" />
                  </summary>
                  <p className="px-[6px] pb-5 text-sm leading-6 text-muted">답변 준비 중입니다.</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-10 text-center text-sm font-medium tracking-[-0.28px] text-[#888]">
        아직 진단 전이라면{' '}
        <Link to="/" className="font-bold text-[#677380] underline underline-offset-4">
          무료로 먼저 해보세요
        </Link>
      </p>
    </div>
  )
}
