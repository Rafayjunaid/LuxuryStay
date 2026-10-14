function About() {
  return (
    <main className="bg-white text-[#171717]">

      <section className="relative bg-[#171717] text-white px-6 sm:px-10 lg:px-16 py-24 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#d9a400]">
            DISCOVER LUXURYSTAY
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4">
            About Us
          </h1>

          <div className="w-14 h-[2px] bg-[#8f1d2c] mt-7" />
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">

            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
                OUR STORY
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] mt-4">
                Hospitality
                <br />
                With a Difference
              </h2>

              <div className="w-14 h-[2px] bg-[#d9a400] mt-7" />
            </div>

            <div className="max-w-3xl text-[#555]">
              <p className="text-base sm:text-lg leading-8">
                LuxuryStay was created with one simple idea:
                to provide guests with a beautiful place where
                they can relax, recharge and enjoy exceptional
                hospitality.
              </p>

              <p className="text-base sm:text-lg leading-8 mt-7">
                Our hotel combines modern design, comfortable
                accommodation and thoughtful service to create
                an experience our guests remember.
              </p>

              <p className="text-base sm:text-lg leading-8 mt-7">
                Whether you're travelling for business, celebrating
                a special occasion or simply taking a break,
                LuxuryStay is here to make your stay special.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="bg-[#f5f5f3] border-y border-[#e7e3df] px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              OUR VALUES
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-4">
              What We Believe In
            </h2>

            <div className="w-14 h-[2px] bg-[#d9a400] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-14">

            <div className="bg-white border border-[#e5e1dd] p-7 sm:p-8">
              <p className="text-sm font-semibold text-[#8f1d2c] tracking-wider">
                01
              </p>

              <h3 className="text-xl font-semibold mt-7">
                Comfort
              </h3>

              <p className="text-sm sm:text-base text-[#666] leading-7 mt-3">
                Your comfort comes first in everything we do.
              </p>
            </div>

            <div className="bg-white border border-[#e5e1dd] p-7 sm:p-8">
              <p className="text-sm font-semibold text-[#8f1d2c] tracking-wider">
                02
              </p>

              <h3 className="text-xl font-semibold mt-7">
                Quality
              </h3>

              <p className="text-sm sm:text-base text-[#666] leading-7 mt-3">
                We focus on quality experiences and thoughtful details.
              </p>
            </div>

            <div className="bg-white border border-[#e5e1dd] p-7 sm:p-8">
              <p className="text-sm font-semibold text-[#8f1d2c] tracking-wider">
                03
              </p>

              <h3 className="text-xl font-semibold mt-7">
                Hospitality
              </h3>

              <p className="text-sm sm:text-base text-[#666] leading-7 mt-3">
                We treat every guest with warmth and respect.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;
