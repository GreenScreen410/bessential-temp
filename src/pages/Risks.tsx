import { Collapsible, KeyRow, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { risks } from '../data'

const tone: Record<string, string> = {
  높음: 'bg-[#ffeeef] text-[#e42a3a]',
  중간: 'bg-[#fff4e0] text-[#b57812]',
  낮음: 'bg-[#eff8f1] text-[#428147]',
}

export default function Risks() {
  const high = risks.filter((r) => r.level === '높음').length

  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader
        step="STEP 07"
        title="리스크/해결 필요"
        desc="발목을 잡을 것과, 그때 무엇을 할지 미리 정해뒀어요."
        badge={<PaidBadge />}
      />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Label icon="sad">확인된 리스크 {risks.length}건</Label>
          <p className="text-sm font-medium text-muted">
            이 중 <span className="font-bold text-[#e42a3a]">{high}건</span>은 서비스 설계 전에 정리해야 해요.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {risks.map((r, i) => (
            <Collapsible
              key={r.title}
              defaultOpen={r.level === '높음'}
              head={
                <span className="flex flex-wrap items-center gap-3 text-left">
                  <span className="font-jakarta text-[13px] font-bold text-[#a8adb3]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-bold trim text-ink">{r.title}</span>
                  <span className={`rounded-full px-2 py-[2px] text-[11px] font-bold ${tone[r.level]}`}>{r.level}</span>
                </span>
              }
            >
              <div className="flex flex-col gap-[6px]">
                <KeyRow k="이럴 때 터져요" v={r.signal} />
                <KeyRow k="대응" v={r.plan} strong />
              </div>
            </Collapsible>
          ))}
        </div>

        <StepNav note="대응안은 지금 단계에서 실행 가능한 것만 담았어요." />
      </article>
    </div>
  )
}
