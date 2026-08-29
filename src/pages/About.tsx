import { Link } from 'react-router-dom'
import { Icon } from '../components/ui'
import { steps } from '../data'

export default function About() {
  return (
    <div className="mx-auto max-w-[1412px] px-10 py-20">
      <header className="max-w-[760px]">
        <p className="text-sm font-medium leading-6 text-[#686b70]">서비스 소개</p>
        <h1 className="mt-5 text-2xl font-bold leading-[34px] trim text-[#101729]">
          아이디어 한 줄에서 사업계획까지, 10단계로 이어집니다.
        </h1>
        <p className="mt-[18px] text-base font-medium leading-7 text-[#686b70]">
          B Essential은 머릿속에만 있는 아이디어를 검증 가능한 형태로 옮겨 놓는 도구예요. 한 줄만 적으면 AI가 판정과
          6축 점수를 매기고, 이어서 비즈니스 모델·시장·지표·로드맵까지 리포트로 만들어 줍니다.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-3 gap-3 max-xl:grid-cols-1">
        {[
          { t: '입력은 한 줄이면 충분해요', d: '나머지는 캔버스 칸을 눌러 채우면 되고, 비워둬도 진단은 시작됩니다.' },
          { t: '판단이 아니라 근거를 줍니다', d: '점수마다 왜 그렇게 봤는지, 무엇을 확인해야 하는지 함께 적어요.' },
          { t: '무료로 끝까지 진단해봐요', d: '아이디어 입력과 종합 진단 리포트는 로그인 없이 무료입니다.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-[#dfe2e5] bg-white p-7">
            <p className="text-base font-bold leading-6 trim text-ink">{c.t}</p>
            <p className="mt-4 text-sm font-medium leading-6 text-muted">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-[60px]">
        <h2 className="mb-5 text-base font-semibold leading-[34px] trim text-ink">리포트는 이렇게 완성돼요</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
          {steps.slice(1).map((s) => {
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#677380] font-jakarta text-[10px] font-bold text-white">
                    {s.n}
                  </span>
                  {s.free ? (
                    <span className="rounded-full bg-[#eff8f1] px-2 pt-[3px] pb-[2px] text-[11px] font-bold text-[#428147]">
                      무료
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#eeeff1] px-2 py-[3px] text-[11px] font-bold text-ink">PRO</span>
                  )}
                </div>
                <p className="mt-4 text-sm font-bold trim text-ink">{s.label}</p>
                <p className="mt-2 text-[13px] font-medium leading-5 text-muted">{s.desc}</p>
                <span className="mt-4 flex items-center gap-1 text-[13px] font-bold text-ink">
                  바로 보기 <Icon name="chevron" size={12} className="rotate-180" />
                </span>
              </>
            )
            return s.to ? (
              <Link
                key={s.n}
                to={s.to}
                className="flex flex-col rounded-2xl border border-[#dfe2e5] bg-white p-5 transition hover:border-[#677380]"
              >
                {body}
              </Link>
            ) : (
              <div key={s.n} className="flex flex-col rounded-2xl border border-[#eaeaea] bg-[#f7f7f7] p-5">
                {body}
              </div>
            )
          })}
        </div>
      </section>

      <div className="mt-[60px] flex flex-col items-center gap-5">
        <Link
          to="/"
          className="rounded-full bg-black px-[60px] py-5 text-lg font-bold leading-[normal] tracking-[-0.36px] text-white transition hover:bg-[#232b35]"
        >
          무료로 진단 시작
        </Link>
        <Link to="/pricing" className="text-sm font-bold text-[#677380] underline underline-offset-4">
          요금제 보기
        </Link>
      </div>
    </div>
  )
}
