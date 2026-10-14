function Gallery() {
  const images = [
    {
      id: 1,
      title: "Luxury Room",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
    },
    {
      id: 2,
      title: "Hotel Lobby",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    {
      id: 3,
      title: "Premium Suite",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    },
    {
      id: 4,
      title: "Swimming Pool",
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    },
    {
      id: 5,
      title: "Dining",
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
    },
    {
      id: 6,
      title: "Hotel Exterior",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    }
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">

            <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
              EXPLORE OUR HOTEL
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Gallery
            </h1>

            <div className="mt-7 h-1 w-20 bg-[#8f1d2c]" />

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#d5d5d5] sm:text-lg">
              Take a closer look at the spaces, rooms and
              experiences that make LuxuryStay special.
            </p>

          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              OUR GALLERY
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A Glimpse of LuxuryStay
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 bg-[#d9a400]" />

            <p className="mt-6 text-sm leading-7 text-[#666] sm:text-base">
              From elegant rooms to welcoming common spaces,
              discover the atmosphere waiting for you at
              LuxuryStay.
            </p>

          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {images.map((image) => (
              <div
                key={image.id}
                className="group overflow-hidden border border-[#e1dcd7] bg-white"
              >

                <div className="aspect-[4/3] overflow-hidden bg-[#e8e5e1]">

                  <img
                    src={`${image.url}?auto=format&fit=crop&w=1000&q=85`}
                    alt={image.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="flex items-center justify-between border-t border-[#e7e3df] px-5 py-5">

                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-[#8f1d2c]">
                      LUXURYSTAY
                    </p>

                    <h3 className="mt-1 text-base font-semibold">
                      {image.title}
                    </h3>
                  </div>

                  <span className="text-sm font-semibold text-[#d9a400]">
                    0{image.id}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="bg-[#171717] px-6 py-14 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
                EXPERIENCE LUXURYSTAY
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Ready to experience it yourself?
              </h2>
            </div>

            <a
              href="/rooms"
              className="inline-flex items-center justify-center bg-[#8f1d2c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
            >
              Explore Rooms
              <span className="ml-4 text-lg">
                →
              </span>
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Gallery;