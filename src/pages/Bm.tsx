import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StepHeader } from '../components/ui'
import { bmResult, canvas, sampleIdea } from '../data'

const text = 'text-[13px] font-medium leading-5 tracking-[-0.26px]'

/**
 * 03 비즈니스 모델 — 01에서 넣은 원문을 잠깐 보여준 뒤 위로 날려보내고,
 * 그 자리에 AI가 다시 쓴 BM 문장을 올린다. 원문은 남기지 않는다.
 */
export default function Bm() {
  const [run, setRun] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDone(false)
    const t = setTimeout(() => setDone(true), 1300)
    return () => clearTimeout(t)
  }, [run])

  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <StepHeader
        step="STEP 03"
        title="비즈니스 모델"
        desc="입력하신 아이디어를 사업이 굴러가는 구조로 다시 썼어요."
        badge={<span className="rounded-full bg-[#eeeff1] px-2 py-[3px] text-[13px] font-bold tracking-[-0.26px] text-ink">PRO</span>}
        right={
          <button
            onClick={() => setRun((r) => r + 1)}
            className="rounded-lg border border-[#dfe2e5] bg-white px-3 py-[10px] text-sm font-bold text-[#677380] transition hover:border-[#677380]"
          >
            다시 보기
          </button>
        }
      />

      {/* 상태 한 줄 — 원문 → 결과로 교차 페이드 */}
      <div className="relative mt-10 h-6">
        {[
          { on: !done, t: '01에서 입력하신 내용이에요', c: 'text-[#9c9d9e]' },
          { on: done, t: 'AI가 비즈니스 모델 문장으로 다시 썼어요', c: 'text-[#428147]' },
        ].map((s) => (
          <p
            key={s.t}
            className={`absolute inset-0 text-sm font-semibold tracking-[-0.28px] transition-opacity duration-500 ${s.c} ${
              s.on ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {s.t}
          </p>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white p-[30px] shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-6 grid-rows-[160px_160px_150px] gap-2">
          {canvas.map((c, i) => (
            <div key={c.key} className={`${c.at} flex flex-col rounded-xl border border-[#e5e8eb] bg-white p-4`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-[-0.24px] text-ink">{c.label}</span>
                <span
                  className={`font-jakarta text-[11px] font-bold tracking-[-0.22px] text-[#428147] transition-opacity duration-500 ${
                    done ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 90 + 400}ms` }}
                >
                  After
                </span>
              </div>

              <div className="relative mt-3 min-h-0 flex-1">
                {/* 원문 — 잠깐 보였다가 위로 날아간다 */}
                <p
                  className={`${text} absolute inset-x-0 top-0 text-[#9c9d9e] transition-all duration-[650ms] ease-in ${
                    done ? '-translate-y-8 scale-[0.96] opacity-0 blur-[3px]' : 'translate-y-0 opacity-100 blur-0'
                  }`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {sampleIdea[c.key]}
                </p>
                {/* 결과 — 아래에서 올라와 자리를 차지한다 */}
                <p
                  className={`${text} text-[#232b35] transition-all duration-[650ms] ease-out ${
                    done ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 90 + 250}ms` }}
                >
                  {bmResult[c.key]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[30px] flex flex-col items-center gap-5">
          {/* 정리가 끝나기 전에는 다음 단계로 넘어가지 않는다 */}
          {done ? (
            <Link
              to="/market"
              className="rounded-full bg-black px-[100px] py-5 text-lg font-bold leading-[normal] tracking-[-0.36px] text-white transition hover:bg-[#232b35]"
            >
              04 시장조사로 이어가기
            </Link>
          ) : (
            <button
              disabled
              className="rounded-full bg-[#eeeff1] px-[100px] py-5 text-lg font-bold leading-[normal] tracking-[-0.36px] text-[#a8adb3]"
            >
              04 시장조사로 이어가기
            </button>
          )}
          <Link to="/report" className="text-sm font-bold text-[#677380] underline underline-offset-4">
            종합 진단 리포트 다시 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
