import { Icon, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { roadmap } from '../data'

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader step="STEP 06" title="로드맵" desc="언제 무엇부터 손대야 하는지 순서를 잡았어요." badge={<PaidBadge />} />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <Label icon="flag">단계별 계획</Label>

        {/* 세로 타임라인 — 왼쪽 선을 따라 단계가 이어진다 */}
        <ol className="mt-6 flex flex-col">
          {roadmap.map((r, i) => {
            const last = i === roadmap.length - 1
            return (
              <li key={r.phase} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full font-jakarta text-[11px] font-bold ${
                      r.done ? 'bg-[#677380] text-white' : 'bg-[#eeeff1] text-[#8e8e8e]'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {!last && <span className="w-px flex-1 bg-[#e5e8eb]" />}
                </div>

                <div className={`min-w-0 flex-1 ${last ? '' : 'pb-6'}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-[5px] bg-navy/10 px-2 py-[3px] font-jakarta text-xs font-semibold text-navy">
                      {r.phase}
                    </span>
                    {r.done && (
                      <span className="rounded-full bg-[#eff8f1] px-2 py-[2px] text-[11px] font-bold text-[#428147]">완료</span>
                    )}
                  </div>
                  <p className="mt-3 text-base font-bold leading-6 trim text-ink">{r.goal}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.tasks.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 rounded-[10px] border border-[#eaeaea] bg-[#f7f7f7] px-3 py-2 text-[13px] font-medium text-ink"
                      >
                        <Icon name={r.done ? 'check' : 'arrow_right2'} size={16} />
                        <span className="trim">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>

        <StepNav note="앞 단계가 검증되지 않으면 다음 단계로 넘어가지 않는 순서로 짰어요." />
      </article>
    </div>
  )
}
