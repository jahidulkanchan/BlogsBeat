import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import countBg from "../assets/counter-banner.jpg";

const Counter = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [startCount, setStartCount] = useState(false);

  // Start the counter when the section is in view
  React.useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);
  return (
    <>
      <section className="pt-[40px] md:pt-[80px]">
        <h2 className="text-3xl text-center my-5 font-medium md:font-semibold">
          Milestone{" "}
          <span
            style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
            className="text-secondary"
          >
            Tracker
          </span>
        </h2>
        <div
          ref={ref}
          style={{ backgroundImage: `url(${countBg})` }}
          className="px-2 mx-auto flex min-h-[300px]  flex-col bg-cover bg-center bg-blend-multiply bg-primary text-white bg-opacity-85 bg-fixed justify-center items-center container md:px-5"
        >
          <div className="grid py-8 w-full text-center md:grid-cols-3 gap-5">
            <div className="col-span-2 md:col-span-1">
              <h3
                style={{
                  textShadow: "5px 5px 5px rgba(0, 0, 0, 0.4)",
                }}
                className="text-5xl font-semibold"
              >
                {startCount && <CountUp start={0} end={3560} duration={2} />}
                <span>+</span>
              </h3>
              <p
                style={{
                  textShadow: "2px 2px 0px rgba(0, 0, 0, 0.4)",
                }}
                className="mt-2 mb-4 text-lg font-medium tracking-wide"
              >
                Visitors This Week
              </p>
            </div>
            <div>
              <h3
                style={{
                  textShadow: "5px 5px 5px rgba(0, 0, 0, 0.4)",
                }}
                className="text-4xl md:text-5xl font-semibold"
              >
                {startCount && <CountUp start={0} end={200} duration={2} />}
                <span>+</span>
              </h3>
              <p
                style={{ textShadow: "2px 2px 0px rgba(0, 0, 0, 0.4)" }}
                className="mt-2 text-lg md:text-xl"
              >
                Last Week&apos;s Posts
              </p>
            </div>
            <div>
              <h3
                style={{
                  textShadow: "5px 5px 5px rgba(0, 0, 0, 0.4)",
                }}
                className="text-4xl md:text-5xl font-semibold"
              >
                {startCount && <CountUp start={0} end={450} duration={2} />}
                <span>+</span>
              </h3>
              <p
                style={{ textShadow: "2px 2px 0px rgba(0, 0, 0, 0.4)" }}
                className="mt-2 text-lg md:text-xl"
              >
                Weekly Comments
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Counter;
