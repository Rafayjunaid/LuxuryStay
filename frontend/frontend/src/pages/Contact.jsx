function Contact() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="bg-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.3em] text-[#d9a400]">
              WE'D LOVE TO HEAR FROM YOU
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Contact Us
            </h1>

            <div className="mt-7 h-1 w-16 bg-[#8f1d2c]" />

            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">
              Have a question about your stay or need assistance?
              Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#8f1d2c]">
              GET IN TOUCH
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-5xl">
              Let's Start a
              <br />
              Conversation
            </h2>

            <div className="mt-6 h-1 w-14 bg-[#d9a400]" />

            <p className="mt-7 max-w-md text-sm leading-7 text-[#666]">
              Whether you have a question about our rooms,
              reservations or hotel services, feel free to reach
              out to our team.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-5 border-t border-[#e4dfda] pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#e0dbd6] text-[#8f1d2c]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#171717]">
                    Address
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    LuxuryStay Hotel
                    <br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex gap-5 border-t border-[#e4dfda] pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#e0dbd6] text-[#8f1d2c]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M5 4h3l2 5-2 1.5c1 2.2 2.8 4 5 5l1.5-2 5 2v3c0 1.1-.9 2-2 2C10.6 20.5 3.5 13.4 3.5 5c0-1.1.9-2 2-2Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#171717]">
                    Phone
                  </h3>

                  <p className="mt-2 text-sm text-[#666]">
                    +92 300 1234567
                  </p>
                </div>
              </div>

              <div className="flex gap-5 border-t border-[#e4dfda] pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#e0dbd6] text-[#8f1d2c]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="1"
                    />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#171717]">
                    Email
                  </h3>

                  <p className="mt-2 text-sm text-[#666]">
                    infoluxurystay@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#e1dcd7] bg-[#f8f7f5] p-6 sm:p-8 lg:p-10">
            <div className="border-b border-[#ddd8d3] pb-6">
              <p className="text-xs font-bold tracking-[0.2em] text-[#8f1d2c]">
                SEND AN ENQUIRY
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-[#171717]">
                Send Us a Message
              </h3>
            </div>

            <form className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-[#666]">
                    YOUR NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="h-13 w-full border border-[#d9d3ce] bg-white px-4 text-sm text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-[#666]">
                    YOUR EMAIL
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-13 w-full border border-[#d9d3ce] bg-white px-4 text-sm text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-[#666]">
                  SUBJECT
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="h-13 w-full border border-[#d9d3ce] bg-white px-4 text-sm text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-[#666]">
                  MESSAGE
                </label>

                <textarea
                  placeholder="Write your message..."
                  rows="6"
                  className="w-full resize-none border border-[#d9d3ce] bg-white px-4 py-4 text-sm leading-6 text-[#171717] outline-none transition placeholder:text-[#999] focus:border-[#8f1d2c]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-between bg-[#8f1d2c] px-5 text-sm font-semibold text-white transition hover:bg-[#731622]"
              >
                <span>Send Message</span>

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 12h15" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e3ded9] bg-[#171717]">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 lg:px-12">
          <p className="text-xs font-bold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            Your comfort is our priority.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/50">
            We look forward to welcoming you and making your
            stay comfortable, relaxing and memorable.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Contact;