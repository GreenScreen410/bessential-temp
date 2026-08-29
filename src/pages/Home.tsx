import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { examples } from '../data'

/**
 * 메인은 입력창 하나. 설명도 결제 얘기도 걷어내고,
 * 들어오자마자 자기 아이디어를 넣어보게 하는 것만 남긴다.
 */
export default function Home() {
  const [idea, setIdea] = useState('')
  const nav = useNavigate()
  const ready = idea.trim().length > 0

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-10 py-20">
      <img src="/img/report_preview.png" alt="" className="w-[260px]" />

      <h1 className="mt-6 text-center text-[32px] font-bold leading-[46px] trim text-[#101729]">
        아이디어를 한 줄로 적어주세요
      </h1>
      <p className="mt-5 text-center text-base font-medium leading-6 text-[#686b70]">
        어떤 사업이 될 수 있는지, 무엇부터 확인해야 하는지 바로 진단해드릴게요.
      </p>

      <form
        className="mt-9 w-full max-w-[760px]"
        onSubmit={(e) => {
          e.preventDefault()
          nav(`/idea?summary=${encodeURIComponent(idea.trim())}`)
        }}
      >
        <div className="rounded-[20px] border border-[#dfe2e5] bg-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition focus-within:border-[#677380]">
          <label htmlFor="idea" className="sr-only">
            아이디어 한 줄
          </label>
          <textarea
            id="idea"
            autoFocus
            rows={2}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxLength={5000}
            placeholder="예) 비동거 보호자를 위해 AI가 매일 부모님께 안부 전화를 걸어주는 서비스"
            className="block w-full resize-none bg-transparent px-1 text-base leading-7 tracking-[-0.32px] text-[#232b35] outline-none placeholder:text-[#9c9d9e]"
          />
          <div className="mt-2 flex items-center justify-between gap-4">
            <span className="text-xs tracking-[-0.24px] text-[#aaa]">{idea.length > 0 && `${idea.length}/5000`}</span>
            <button
              type="submit"
              disabled={!ready}
              className="rounded-full bg-black px-7 py-[14px] text-sm font-bold whitespace-nowrap text-white transition hover:bg-[#232b35] disabled:cursor-not-allowed disabled:bg-[#eeeff1] disabled:text-[#a8adb3]"
            >
              진단 시작 →
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-sm font-medium text-[#888]">이런 아이디어로 해봐도 좋아요</span>
        {examples.map((e) => (
          <button
            key={e.label}
            type="button"
            onClick={() => setIdea(e.text)}
            className="rounded-full border border-[#dfe2e5] bg-white px-4 py-2 text-[13px] font-semibold text-[#677380] transition hover:border-[#677380]"
          >
            {e.label}
          </button>
        ))}
      </div>

      <p className="mt-10 text-sm font-medium tracking-[-0.28px] text-[#9c9d9e]">
        로그인 없이 무료로 진단받을 수 있어요 ·{' '}
        <Link to="/report" className="font-bold text-[#677380] underline underline-offset-4">
          완성된 리포트 예시 보기
        </Link>
      </p>
    </div>
  )
}
