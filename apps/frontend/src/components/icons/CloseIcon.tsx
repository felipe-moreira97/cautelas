import * as React from "react";

// Example: <IconIonCloseOutline width="24px" height="24px" style={{color: "#000000"}} />

export const CloseIcon = ({
    height = "1em",
    strokeWidth = "32",
    fill = "none",
    focusable = "false",
    ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
    <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={height}
        focusable={focusable}
        {...props}
    >
        <path
            fill={fill}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M368 368L144 144m224 0L144 368"
        />
    </svg>
);