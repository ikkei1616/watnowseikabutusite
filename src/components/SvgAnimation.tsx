import { useEffect, useState } from "react";

const AnimatedSVG = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation after the component mounts
    // 1秒後にアニメーションを開始
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000); // Delay for initial render to be noticeable
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "152px",  // 76px * 2
        height: "176px", // 88px * 2
      }}
    >
      <svg
        width="152"
        height="176"
        viewBox="0 0 152 176" // 76 * 2, 88 * 2
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0 }}
      >
        <rect
          x="41"
          y="35"
          width="110"
          height="110"
          fill="#90C3D6"
          stroke="white"
          strokeLinejoin="round"
        />
        <path
          d="M1.4 65.2C1.14819 65.3888 1 65.6853 1 66V174C1 174.378 1.214 174.725 1.55279 174.8944C1.89157 175.0639 2.29698 175.053 2.6 174.8L42.6 144.8C42.8517 144.611 43 144.314 43 144V35C43 34.622 42.785 34.275 42.4462 34.1056C42.1074 33.9361 41.701 33.946 41.4 34.2L1.4 65.2Z"
          fill="#90C3D6"
          stroke="white"
          strokeLinejoin="round"
        />
        <rect
          x="1"
          y="65"
          width="110"
          height="110"
          fill="#C6ECFA"
          stroke="white"
          strokeLinejoin="round"
        />
        <path
          d="M109.4 65.2C109.148 65.3888 109 65.6853 109 66V174C109 174.378 109.214 174.725 109.552 174.8944C109.891 175.0639 110.296 175.053 110.6 174.8L150.6 144.8C150.851 144.611 151 144.314 151 144V35C151 34.622 150.785 34.275 150.446 34.1056C150.107 33.9361 149.701 33.946 149.4 34.2L109.4 65.2Z"
          fill="#85D5F3"
          stroke="white"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="152"
        height="176"
        viewBox="0 0 152 176" // 76 * 2, 88 * 2
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "34px",   // 17px * 2
          left: "2px",   // 1px * 2
          transition: "all 1s ease",
          transformOrigin: "top",
          transform: animate ? "rotateX(-180deg) translateY(-2px)" : "rotateX(0) translateY(0)",
        }}
      >
        <path
          d="M40 1C39.7866 1 39.5786 1.06831 39.4068 1.19494L1.4068 29.1949C1.05902 29.4512 0.915317 29.9006 1.04999 30.3122C1.18467 30.7238 1.40201 30.9 1.6 30.9H105.776C105.9804 30.9 106.179 30.8687 106.347 30.7437L146.571 1.7437C146.905 1.48742 147.049 1.03806 146.915 0.626464C146.781 0.214867 146.557 0 146.4 0H40Z"
          fill="#D9D9D9"
          stroke="white"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default AnimatedSVG;
