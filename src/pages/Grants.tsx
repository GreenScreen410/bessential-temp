import { KeyRow, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { grants } from '../data'

export default function Grants() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader
        step="STEP 08"
        title="지원사업 소개"
        desc="이 아이디어로 지금 지원할 수 있는 사업을 골라뒀어요."
        badge={<PaidBadge />}
      />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <Label icon="money_bag">추천 지원사업 {grants.length}건</Label>

        <div className="mt-5 grid grid-cols-2 gap-3 max-xl:grid-cols-1">
          {grants.map((g, i) => (
            <section key={g.name} className="rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7] px-[18px] py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-jakarta text-[13px] font-bold text-[#a8adb3]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-base font-bold trim text-ink">{g.name}</span>
                </div>
                <span className="shrink-0 rounded-full bg-[#c3daff] px-3 py-[3px] text-xs font-bold text-navy">{g.amount}</span>
              </div>
              <p className="mt-2 text-xs font-medium text-muted">{g.host}</p>
              <div className="mt-4 flex flex-col gap-[6px]">
                <KeyRow k="접수 시기" v={g.due} />
                <KeyRow k="적합한 이유" v={g.fit} strong />
              </div>
            </section>
          ))}
        </div>

        <StepNav note="공고 시기와 금액은 바뀔 수 있으니 지원 전에 공고문을 확인해 주세요." />
      </article>
    </div>
  )
}
