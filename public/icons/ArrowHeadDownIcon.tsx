import React from "react";

const ArrowHeadDownIcon = ({ fill = "#1E293B" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5312 14.5312C12.2188 14.8438 11.75 14.8438 11.4688 14.5312L6.46875 9.53125C6.15625 9.25 6.15625 8.78125 6.46875 8.5C6.75 8.1875 7.21875 8.1875 7.5 8.5L11.9688 12.9688L16.4688 8.46875C16.75 8.1875 17.2188 8.1875 17.5 8.46875C17.8125 8.78125 17.8125 9.25 17.5 9.53125L12.5312 14.5312Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowHeadDownIcon;
