import PropTypes from "prop-types";

export default function Button({ children, style, ...rest }) {
  const buttonStyle = getStyle(style);
  return (
    <button
      className='relative p-2 w-full flex items-center justify-center cursor-pointer rounded-md shadow-none overflow-hidden text-lg font-semibold transition-all
            hover:shadow-xl hover:translate-y-[.5px] disabled:opacity-60 disabled:hover:cursor-not-allowed'
      style={buttonStyle}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

function getStyle(style) {
  switch (style) {
    case "submit":
      return {
        backgroundColor: "#00a5e0ff",
        color: "white",
      };
    case "cancel":
      return {
        backgroundColor: "#ce2d4f",
        color: "white",
      };
    case "default":
      return {
        backgroundColor: "white",
        border: "1px solid black",
        color: "black",
      };
  }
}
