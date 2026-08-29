import { Collapsible, KeyRow, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { metrics } from '../data'

export default function Metrics() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader step="STEP 05" title="핵심 지표" desc="무엇을 매주 보고 있어야 하는지, 목표치와 함께 정리했어요." badge={<PaidBadge />} />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        {/* 북극성 지표 — 이 페이지에서 가장 중요한 하나 */}
        <section className="rounded-[20px] bg-[#c3daff] p-7">
          <Label>북극성 지표</Label>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <p className="text-2xl font-bold leading-[34px] trim text-navy">{metrics.north.label}</p>
            <p className="font-jakarta text-[44px] font-medium leading-[normal] text-navy">{metrics.north.value}</p>
          </div>
          <p className="mt-4 rounded-[5px] bg-navy/10 p-3 text-sm font-semibold leading-[22px] text-navy">
            {metrics.north.note}
          </p>
        </section>

        <div className="my-6 h-px bg-[#f0f0f0]" />

        <Label icon="leaderboard">단계별 지표</Label>
        <div className="mt-4 grid grid-cols-2 gap-3 max-xl:grid-cols-1">
          {metrics.groups.map((g, i) => (
            <Collapsible
              key={g.stage}
              defaultOpen={i < 2}
              count={g.items.length}
              head={
                <span className="flex items-center gap-3">
                  <span className="flex size-[22px] items-center justify-center rounded-[7px] bg-[#677380] font-jakarta text-[11px] font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold trim text-ink">{g.stage}</span>
                </span>
              }
            >
              <div className="flex flex-col gap-3">
                {g.items.map((m) => (
                  <div key={m.name} className="rounded-[10px] bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold trim text-ink">{m.name}</span>
                      <span className="rounded-[5px] bg-[#eff8f1] px-2 py-1 text-xs font-bold text-[#428147]">{m.target}</span>
                    </div>
                    <div className="mt-3">
                      <KeyRow k="왜 보나요" v={m.why} />
                    </div>
                  </div>
                ))}
              </div>
            </Collapsible>
          ))}
        </div>

        <StepNav note="목표치는 동종 초기 서비스의 통상 범위를 기준으로 잡았어요." />
      </article>
    </div>
  )
}
