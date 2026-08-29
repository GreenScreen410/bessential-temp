import { Collapsible, KeyRow, Icon, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { market } from '../data'

export default function Market() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader step="STEP 04" title="시장조사" desc="시장이 얼마나 크고, 이미 누가 그 자리에 있는지 확인해요." badge={<PaidBadge />} />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <Label>시장 규모</Label>
        <div className="mt-5 grid grid-cols-3 gap-3 max-xl:grid-cols-1">
          {market.sizes.map((s, i) => (
            <div
              key={s.k}
              className={`rounded-[20px] p-6 ${i === 0 ? 'bg-[#c3daff]' : i === 1 ? 'bg-[#dbe8fd]' : 'bg-[#eef3fc]'}`}
            >
              <p className="flex items-center gap-2">
                <span className="font-jakarta text-xs font-bold text-navy">{s.k}</span>
                <span className="text-xs font-semibold text-navy/70">{s.label}</span>
              </p>
              <p className="mt-4 font-jakarta text-[32px] font-medium leading-[normal] text-navy">{s.value}</p>
              <p className="mt-3 text-[13px] font-medium leading-5 text-navy/70">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="my-6 h-px bg-[#f0f0f0]" />

        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-5 max-xl:grid-cols-1">
          <section className="rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7] px-[18px] py-5">
            <Label icon="flag">시장 흐름</Label>
            <ul className="mt-4 flex flex-col gap-[10px]">
              {market.trends.map((t, i) => (
                <li key={t} className="flex items-start gap-[10px] text-sm font-semibold leading-6 text-ink">
                  <Icon name={i === 0 ? 'arrow_right' : 'arrow_right2'} size={24} />
                  <span className="trim">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-3">
            <Label icon="select_window">경쟁 구도</Label>
            {market.players.map((p, i) => (
              <Collapsible
                key={p.name}
                defaultOpen={i === 0}
                count={p.rows.length}
                head={
                  <span className="flex items-center gap-2 text-left">
                    <span className="font-jakarta text-[13px] font-bold text-[#a8adb3]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-bold trim text-ink">{p.name}</span>
                    <span className="text-xs font-medium text-muted">{p.position}</span>
                  </span>
                }
              >
                <div className="flex flex-col gap-[6px]">
                  {p.rows.map(([k, v], j) => (
                    <KeyRow key={k} k={k} v={v} strong={j === p.rows.length - 1} />
                  ))}
                </div>
              </Collapsible>
            ))}
          </div>
        </div>

        <StepNav note="숫자는 공개 통계와 입력하신 아이디어를 근거로 추정한 값이에요." />
      </article>
    </div>
  )
}
