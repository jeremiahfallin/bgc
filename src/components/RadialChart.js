import React from "react";

export default ({ percent, color, icon }) => {
  return (
    <svg
      style={{ transform: "rotate(-90deg)" }}
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      <circle
        style={{ stroke: `${color}50`, fill: "none" }}
        cx="100"
        cy="100"
        r="90"
        strokeWidth="12"
      />
      <circle
        style={{
          stroke: `${color}`,
          strokeLinecap: "butt",
          fill: "none",
          strokeDasharray: `${2 * Math.PI * 90}`,
          strokeDashoffset: `${2 * Math.PI * 90 * (1 - percent)}`
        }}
        cx="100"
        cy="100"
        r="90"
        strokeWidth="12"
      />
      <defs>
        <clipPath id="myCircle">
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="80" fill={color} clipPath="url(#myCircle)" />
      <g style={{ transform: `scale(0.5) translate(50%, 50%)` }}>
        <i
          className={`fas fa-${icon}`}
          data-fa-transform="rotate-90"
          aria-hidden="true"
        />
      </g>
    </svg>
  );
};
