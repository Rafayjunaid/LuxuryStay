import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Feedback() {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/feedback"
      );

      const data = await response.json();

      if (response.ok) {
        setFeedback(data);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormMessage("");

    if (!user) {
      setFormMessage(
        "Please login to submit feedback."
      );
      return;
    }

    if (rating === 0) {
      setFormMessage(
        "Please select a rating."
      );
      return;
    }

    if (!message.trim()) {
      setFormMessage(
        "Please write your feedback."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            rating,
            message
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setFormMessage(
          data.message ||
            "Unable to submit feedback."
        );

        setSubmitting(false);
        return;
      }

      setRating(0);
      setMessage("");

      setFormMessage(
        "Thank you! Your feedback has been submitted and is waiting for approval."
      );
    } catch (error) {
      setFormMessage(
        "Unable to submit feedback."
      );
    }

    setSubmitting(false);
  };

  const showMoreFeedback = () => {
    setVisibleCount(visibleCount + 5);
  };

  const visibleFeedback = feedback.slice(
    0,
    visibleCount
  );

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">

      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
              LUXURYSTAY
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Your experience
              <span className="block text-[#8f1d2c]">
                matters to us.
              </span>
            </h1>

            <div className="mt-7 h-1 w-20 bg-[#d9a400]" />

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#d5d5d5] sm:text-lg">
              Share your experience with LuxuryStay
              and discover what other guests have to say
              about their stay.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e1dcd7] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">

          <div className="max-w-md">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
              SHARE YOUR EXPERIENCE
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell us about
              <span className="block">
                your stay.
              </span>
            </h2>

            <div className="mt-5 h-1 w-12 bg-[#d9a400]" />

            <p className="mt-6 text-sm leading-7 text-[#666] sm:text-base">
              Your feedback helps us continuously improve
              the LuxuryStay experience for every guest.
            </p>
          </div>

          {!user ? (
            <div className="border border-[#e1dcd7] bg-[#f5f5f3] p-8 sm:p-10">

              <div className="flex h-12 w-12 items-center justify-center bg-[#8f1d2c] text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M20 21a8 8 0 0 0-16 0"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <h3 className="mt-7 text-2xl font-semibold">
                Login to leave feedback
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#666]">
                Please login to share your experience
                with LuxuryStay.
              </p>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-4 bg-[#8f1d2c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
              >
                Login
                <span className="text-lg">→</span>
              </Link>
            </div>
          ) : (
            <form
              className="border border-[#e1dcd7] bg-[#f5f5f3] p-6 sm:p-8 lg:p-10"
              onSubmit={handleSubmit}
            >

              <div className="flex items-center gap-4 border-b border-[#ddd8d3] pb-6">

                {user.profilePic ? (
                  <img
                    src={`http://localhost:5000${user.profilePic}`}
                    alt={user.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#171717] text-lg font-semibold text-white">
                    {user.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8f1d2c]">
                    SUBMITTING AS
                  </p>

                  <p className="mt-1 truncate text-base font-semibold">
                    {user.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#777]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-8">

                <label className="text-xs font-semibold tracking-[0.16em] text-[#171717]">
                  YOUR RATING
                </label>

                <div className="mt-4 flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      className={`text-3xl leading-none ${
                        star <= rating
                          ? "text-[#d9a400]"
                          : "text-[#c8c3be]"
                      }`}
                    >
                      ★
                    </button>
                  ))}

                  {rating > 0 && (
                    <span className="ml-3 text-xs font-medium text-[#777]">
                      {rating}/5
                    </span>
                  )}

                </div>
              </div>

              <div className="mt-8">

                <label className="text-xs font-semibold tracking-[0.16em] text-[#171717]">
                  YOUR FEEDBACK
                </label>

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Tell us about your experience..."
                  rows="6"
                  className="mt-3 w-full resize-none border border-[#d6d1cc] bg-white px-4 py-4 text-sm text-[#171717] outline-none placeholder:text-[#999] focus:border-[#8f1d2c] focus:ring-1 focus:ring-[#8f1d2c]"
                />

              </div>

              {formMessage && (
                <div className="mt-5 border border-[#d9a400] bg-[#fffaf0] px-4 py-3 text-sm leading-6 text-[#171717]">
                  {formMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-between bg-[#8f1d2c] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#741624] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {submitting
                    ? "Submitting..."
                    : "Submit Feedback"}
                </span>

                <span className="text-lg">
                  →
                </span>
              </button>

            </form>
          )}
        </div>
      </section>

      <section className="bg-[#f5f5f3]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">

          <div className="flex flex-col gap-6 border-b border-[#dcd7d2] pb-10 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#8f1d2c]">
                GUEST EXPERIENCES
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What our guests
                <span className="block">
                  have to say.
                </span>
              </h2>

              <div className="mt-5 h-1 w-12 bg-[#d9a400]" />
            </div>

            <p className="max-w-md text-sm leading-7 text-[#666] md:text-right">
              Real experiences from guests who have
              stayed at LuxuryStay.
            </p>

          </div>

          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#777]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#d8d3ce] border-t-[#8f1d2c]" />
                Loading guest experiences...
              </div>
            </div>
          ) : feedback.length === 0 ? (
            <div className="mt-10 border border-[#e1dcd7] bg-white px-6 py-16 text-center">
              <p className="text-sm text-[#666]">
                No guest experiences have been
                published yet.
              </p>
            </div>
          ) : (
            <>

              <div className="mt-10 space-y-6">

                {visibleFeedback.map((item) => (
                  <article
                    key={item._id}
                    className="w-full overflow-hidden border border-[#e1dcd7] bg-white"
                  >

                    <div className="flex flex-col gap-5 p-6 sm:p-8">

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-4">

                          {item.userId?.profilePic ? (
                            <img
                              src={`http://localhost:5000${item.userId.profilePic}`}
                              alt={
                                item.userId.name
                              }
                              className="h-14 w-14 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#171717] text-lg font-semibold text-white">
                              {(item.userId?.name ||
                                item.name)
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#171717]">
                              {item.userId?.name ||
                                item.name}
                            </p>

                            <p className="mt-1 text-xs tracking-[0.12em] text-[#888]">
                              LUXURYSTAY GUEST
                            </p>
                          </div>

                        </div>

                        <div className="shrink-0">

                          <div className="flex items-center gap-1 text-lg text-[#d9a400]">
                            {"★".repeat(
                              item.rating
                            )}

                            <span className="text-[#c9c4bf]">
                              {"★".repeat(
                                5 - item.rating
                              )}
                            </span>
                          </div>

                        </div>

                      </div>

                      <div className="border-t border-[#eeeae6] pt-5">

                        <p className="break-words text-sm leading-7 text-[#444] sm:text-base">
                          “{item.message}”
                        </p>

                      </div>

                      <div className="flex items-center justify-between border-t border-[#eeeae6] pt-4">

                        <span className="text-[11px] font-semibold tracking-[0.15em] text-[#999]">
                          GUEST REVIEW
                        </span>

                        <span className="text-xs font-medium text-[#999]">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric"
                            }
                          )}
                        </span>

                      </div>

                    </div>

                  </article>
                ))}

              </div>

              {visibleCount < feedback.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={showMoreFeedback}
                    className="inline-flex items-center gap-4 border border-[#171717] bg-white px-7 py-3.5 text-sm font-semibold text-[#171717] transition hover:bg-[#171717] hover:text-white"
                  >
                    Show More
                    <span className="text-lg">
                      ↓
                    </span>
                  </button>
                </div>
              )}

            </>
          )}

        </div>
      </section>

      <section className="bg-[#171717] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-semibold tracking-[0.25em] text-[#d9a400]">
            LUXURYSTAY
          </p>

          <div className="mt-4 flex flex-col gap-4 border-t border-[#333] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-[#aaa]">
              Your experience helps us create better
              stays.
            </p>

            <Link
              to="/rooms"
              className="text-sm font-semibold text-white transition hover:text-[#d9a400]"
            >
              Explore Our Rooms →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Feedback;