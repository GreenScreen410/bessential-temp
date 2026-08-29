import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon, StepHeader, Trim } from '../components/ui'
import { canvas as cells, sampleIdea, type IdeaForm } from '../data'

const empty: IdeaForm = { summary: '', problem: '', customer: '', solution: '', revenue: '' }

const text = 'text-[13px] font-medium leading-5 tracking-[-0.26px]'

export default function Idea() {
  // 메인에서 입력한 한 줄을 ?summary= 로 이어받는다 (새로고침·공유해도 유지)
  const [params] = useSearchParams()
  const [form, setForm] = useState<IdeaForm>({ ...empty, summary: params.get('summary') ?? '' })
  const [editing, setEditing] = useState<keyof IdeaForm | null>(null)
  const nav = useNavigate()

  const filled = cells.filter((c) => form[c.key].trim()).length
  const ready = form.summary.trim().length > 0

  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader
        step="STEP 01"
        title="아이디어 입력"
        desc="칸을 눌러서 채워보세요. 다 채우지 않아도 진단을 시작할 수 있어요."
        right={
          <div className="flex flex-col items-end gap-[10px]">
            <button
              onClick={() => setForm(sampleIdea)}
              className="flex items-center gap-[10px] rounded-lg bg-black py-[10px] pr-[14px] pl-3 text-sm font-bold text-white transition hover:bg-[#232b35]"
            >
              <Icon name="ai" size={18} />
              <Trim>자동 채우기</Trim>
            </button>
            <p className="text-sm font-medium leading-[normal] tracking-[-0.28px] text-[#888]">
              클릭하면 캔버스가 모범답안으로 채워집니다.
            </p>
          </div>
        }
      />

      <div className="mt-10 rounded-2xl bg-white p-[30px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-6 grid-rows-[160px_160px_150px] gap-2">
          {cells.map((c) => {
            const value = form[c.key]
            const active = editing === c.key
            return (
              <div
                key={c.key}
                className={`${c.at} flex flex-col rounded-xl border bg-white p-4 transition ${
                  active ? 'border-[#677380] ring-2 ring-[#677380]/15' : 'border-[#e5e8eb] hover:border-[#c9ced4]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-[-0.24px] text-ink">{c.label}</span>
                  {value.trim() ? <Icon name="check" size={16} /> : null}
                </div>
                {active ? (
                  <textarea
                    autoFocus
                    value={value}
                    placeholder={c.placeholder}
                    onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                    onBlur={() => setEditing(null)}
                    onKeyDown={(e) => e.key === 'Escape' && setEditing(null)}
                    className={`${text} mt-3 min-h-0 flex-1 resize-none bg-transparent text-[#232b35] outline-none placeholder:text-[#9c9d9e]`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing(c.key)}
                    className={`${text} mt-3 flex min-h-0 flex-1 items-start overflow-y-auto text-left break-words ${
                      value ? 'text-[#232b35]' : 'text-[#9c9d9e]'
                    }`}
                  >
                    <span>{value || c.placeholder}</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-[30px] flex flex-col items-center gap-5">
          <button
            onClick={() => nav('/report')}
            disabled={!ready}
            className="rounded-full bg-black px-[100px] py-5 text-lg font-bold leading-[normal] tracking-[-0.36px] text-white transition hover:bg-[#232b35] disabled:cursor-not-allowed disabled:bg-[#eeeff1] disabled:text-[#a8adb3]"
          >
            진단 시작
          </button>
          <p className="text-sm font-medium leading-[normal] tracking-[-0.28px] text-[#888]">
            {ready
              ? `${filled}/${cells.length}칸 작성 · 더 채울수록 진단이 정확해져요`
              : '가치 제안 칸만 채우면 바로 시작할 수 있어요'}
          </p>
        </div>
      </div>
    </div>
  )
}
