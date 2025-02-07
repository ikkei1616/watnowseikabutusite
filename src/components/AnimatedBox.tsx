import { useEffect, useState } from "react";

const AnimatedBox = () => {
  const [animate, setAnimate] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1500);
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "76px",
        height: "88px",
        animation: "shake 0.2s",
        animationIterationCount: 2,
        scale: 1.5,
        animationDelay: "1s",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <svg
        width="76"
        height="88"
        viewBox="0 0 76 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0 }}
      >
        <rect
          x="20.5"
          y="17.5"
          width="55"
          height="55"
          fill="#90C3D6"
          stroke="white"
          strokeLinejoin="round"
        />
        <path
          d="M0.7 32.6C0.574097 32.6944 0.5 32.8426 0.5 33V87C0.5 87.1894 0.607001 87.3625 0.776393 87.4472C0.945785 87.5319 1.14849 87.5136 1.3 87.4L21.3 72.4C21.4259 72.3056 21.5 72.1574 21.5 72V18C21.5 17.8106 21.393 17.6375 21.2236 17.5528C21.0542 17.4681 20.8515 17.4864 20.7 17.6L0.7 32.6Z"
          fill="#90C3D6"
          stroke="white"
          strokeLinejoin="round"
        />
        <rect
          x="0.5"
          y="32.5"
          width="55"
          height="55"
          fill="#C6ECFA"
          stroke="white"
          strokeLinejoin="round"
        />
        <path
          d="M54.7 32.6C54.5741 32.6944 54.5 32.8426 54.5 33V87C54.5 87.1894 54.607 87.3625 54.7764 87.4472C54.9458 87.5319 55.1485 87.5136 55.3 87.4L75.3 72.4C75.4259 72.3056 75.5 72.1574 75.5 72V18C75.5 17.8106 75.393 17.6375 75.2236 17.5528C75.0542 17.4681 74.8515 17.4864 74.7 17.6L54.7 32.6Z"
          fill="#85D5F3"
          stroke="white"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="76"
        height="88"
        viewBox="0 0 76 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "17px",
          left: "1px",
          transition: "all 0.5s ease",
          transformOrigin: "top",
          transform: animate
            ? "rotateX(-180deg) translateY(-1px)"
            : "rotateX(0) translateY(0)",
        }}
      >
        <path
          d="M20 0.5C19.8933 0.5 19.7893 0.534156 19.7034 0.597472L0.7034 14.5975C0.529512 14.7256 0.457558 14.9509 0.524993 15.1561C0.592427 15.3613 0.784005 15.5 1 15.5H52.8881C52.9902 15.5 53.0899 15.4687 53.1738 15.4104L73.2857 1.41037C73.465 1.28555 73.5425 1.05876 73.4771 0.850305C73.4117 0.641849 73.2185 0.5 73 0.5H20Z"
          fill="#D9D9D9"
          stroke="white"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default AnimatedBox;
