import { Link } from 'react-router-dom'
import { Icon } from '../components/ui'
import { faq } from '../data'

export default function Faq() {
  return (
    <div className="mx-auto max-w-[880px] px-10 py-20">
      <header>
        <p className="text-sm font-medium leading-6 text-[#686b70]">FAQ · 문의</p>
        <h1 className="mt-5 text-2xl font-bold leading-[34px] trim text-[#101729]">궁금한 걸 먼저 확인해 보세요</h1>
      </header>

      <div className="mt-10 rounded-2xl border border-[#dfe2e5] bg-white p-7">
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

      <section className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#eaeaea] bg-[#f7f7f7] px-[30px] py-6">
        <div>
          <p className="text-sm font-semibold leading-6 trim text-[#9c9d9e]">여기에 없는 내용이라면</p>
          <p className="mt-3 text-base font-bold leading-6 trim text-ink">직접 물어봐 주세요. 영업일 기준 1일 안에 답합니다.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-full bg-black px-8 py-4 text-sm font-bold whitespace-nowrap text-white transition hover:bg-[#232b35]">
            문의 남기기
          </button>
          <Link to="/pricing" className="text-sm font-bold whitespace-nowrap text-[#677380] underline underline-offset-4">
            요금제 보기
          </Link>
        </div>
      </section>
    </div>
  )
}
