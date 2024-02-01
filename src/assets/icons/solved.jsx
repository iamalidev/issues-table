import * as React from "react";
const SolvedIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#39CC7A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-user-check"
        {...props}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx={8.5} cy={7} r={4} />
        <polyline points="17 11 19 13 23 9" />
    </svg>
);
export default SolvedIcon;
