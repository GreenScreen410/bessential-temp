import { useState } from 'react'
import { Icon, Label, PaidBadge, StepHeader, StepNav } from '../components/ui'
import { connectApps, prompts } from '../data'

export default function Prompts() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (title: string, body: string) => {
    navigator.clipboard?.writeText(body).catch(() => {})
    setCopied(title)
    setTimeout(() => setCopied((c) => (c === title ? null : c)), 1600)
  }

  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader
        step="STEP 09"
        title="AI 프롬프트 · 앱 연결"
        desc="리포트 내용을 그대로 넣어 바로 만들어볼 수 있게 정리했어요."
        badge={<PaidBadge />}
      />

      <article className="mt-10 rounded-2xl bg-white p-[50px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <Label icon="ai">바로 쓰는 프롬프트</Label>
        <div className="mt-5 flex flex-col gap-3">
          {prompts.map((p, i) => (
            <section key={p.title} className="rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7] px-[18px] py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span className="font-jakarta text-[13px] font-bold text-[#a8adb3]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-bold trim text-ink">{p.title}</span>
                </span>
                <button
                  onClick={() => copy(p.title, p.body)}
                  className="rounded-lg border border-[#dfe2e5] bg-white px-3 py-2 text-xs font-bold text-[#677380] transition hover:border-[#677380]"
                >
                  {copied === p.title ? '복사됨' : '복사하기'}
                </button>
              </div>
              <pre className="mt-4 rounded-[10px] bg-white p-4 font-sans text-[13px] leading-6 whitespace-pre-wrap text-ink">
                {p.body}
              </pre>
            </section>
          ))}
        </div>

        <div className="my-6 h-px bg-[#f0f0f0]" />

        <Label icon="select_window">앱으로 내보내기</Label>
        <div className="mt-5 grid grid-cols-4 gap-3 max-xl:grid-cols-2">
          {connectApps.map((a) => (
            <button
              key={a.name}
              className="flex flex-col items-start rounded-[20px] border border-[#eaeaea] bg-[#f7f7f7] p-5 text-left transition hover:border-[#677380]"
            >
              <span className="flex items-center gap-2 text-sm font-bold trim text-ink">
                {a.name}
                <Icon name="chevron" size={12} className="rotate-180" />
              </span>
              <span className="mt-3 text-[13px] font-medium leading-5 text-muted">{a.use}</span>
            </button>
          ))}
        </div>

        <StepNav note="프롬프트에는 이 리포트의 내용이 이미 들어가 있어요." />
      </article>
    </div>
  )
}
