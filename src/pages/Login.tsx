import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/ui'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-10 py-20">
      <img src="/icons/logo_mark.svg" alt="" className="size-10" />
      <h1 className="mt-6 text-center text-2xl font-bold leading-[34px] trim text-[#101729]">
        {sent ? '메일함을 확인해 주세요' : '리포트를 저장하려면 로그인하세요'}
      </h1>
      <p className="mt-5 text-center text-base font-medium leading-6 text-[#686b70]">
        {sent
          ? `${email} 으로 로그인 링크를 보냈어요.`
          : '비밀번호 없이 메일로 받은 링크만 누르면 됩니다.'}
      </p>

      {!sent && (
        <form
          className="mt-9 w-full max-w-[420px]"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="block w-full rounded-[10px] border border-[#eaeaea] bg-[#f5f5f5] px-[18px] py-4 text-sm font-medium tracking-[-0.28px] text-[#232b35] placeholder:text-[#9c9d9e] focus:border-[#677380] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-black py-4 text-sm font-bold text-white transition hover:bg-[#232b35]"
          >
            로그인 링크 받기
          </button>
        </form>
      )}

      {sent && (
        <button
          onClick={() => setSent(false)}
          className="mt-9 rounded-full border border-[#dfe2e5] bg-white px-8 py-4 text-sm font-bold text-[#677380] transition hover:border-[#677380]"
        >
          다른 메일로 다시 받기
        </button>
      )}

      <p className="mt-10 flex items-center gap-2 text-sm font-medium tracking-[-0.28px] text-[#9c9d9e]">
        <Icon name="lock" size={14} />
        로그인 없이도 진단은 무료로 할 수 있어요 ·{' '}
        <Link to="/" className="font-bold text-[#677380] underline underline-offset-4">
          그냥 시작하기
        </Link>
      </p>
    </div>
  )
}
