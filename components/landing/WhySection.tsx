export function WhySection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <p className="text-sm text-teal tracking-wide">리봄이 특별한 이유</p>

        <h2 className="landing-heading text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
          아무나 가입하는 앱이 아닙니다.
        </h2>

        <div className="space-y-5 text-[#555] text-base">
          <p>
            리봄은 처음부터 50대 이상을 위해 설계된 프리미엄 인연 플랫폼입니다.
          </p>
          <p>
            기존 소개팅 앱의 가볍고 자극적인 문화에서 벗어나, 신뢰와 품격을 갖춘
            성숙한 만남을 위한 공간을 만들었습니다.
          </p>
          <p>
            모든 회원은 다단계 검증 과정을 통과해야만 입장이 허용됩니다.
          </p>
        </div>

        <blockquote className="mt-12 px-8 py-6 bg-teal-light/60 border-l-4 border-teal text-teal italic text-base md:text-lg">
          &ldquo; 새로운 봄을 맞이하기에 결코 늦은 나이란 없습니다. &rdquo;
        </blockquote>
      </div>
    </section>
  );
}
