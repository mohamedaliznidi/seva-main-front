import React from 'react';

export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={100}
      height={30}
    >
      <defs>
        <pattern
          id="a"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 58 82"
        >
          <image
            width={58}
            height={82}
            xlinkHref="data:image/png;base64,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"
          />
        </pattern>
      </defs>
      <text
        transform="translate(25 16)"
        fill="#02457a"
        fontSize={16}
        fontFamily="Signika"
      >
        <tspan x={0} y={0}>
          {'Production'}
        </tspan>
      </text>
      <text
        transform="translate(72 26)"
        fill="#018abe"
        fontSize={8}
        fontFamily="Signika"
      >
        <tspan x={0} y={0}>
          {'by SEVA'}
        </tspan>
      </text>
      <path fill="url(#a)" d="M0 0h21v30H0z" />
    </svg>
  );
}
