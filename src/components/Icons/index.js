export function UploadIcon({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.0117 25.6758H33.5508C33.3703 25.6758 33.2227 25.8234 33.2227 26.0039V32.3203H8.77734V26.0039C8.77734 25.8234 8.62969 25.6758 8.44922 25.6758H5.98828C5.80781 25.6758 5.66016 25.8234 5.66016 26.0039V34.125C5.66016 34.851 6.24668 35.4375 6.97266 35.4375H35.0273C35.7533 35.4375 36.3398 34.851 36.3398 34.125V26.0039C36.3398 25.8234 36.1922 25.6758 36.0117 25.6758Z"
        fill={color}
      />
      <path
        d="M21.1431 13.0331C21.1878 13.0549 21.227 13.0867 21.2577 13.1259L25.8515 18.9419C26.0196 19.1552 25.8679 19.471 25.5931 19.471L22.562 19.471L22.3816 26.6719C22.3816 26.8523 22.2339 27 22.0534 27L19.5925 27C19.412 27 19.2644 26.8523 19.2644 26.6719L19.4448 19.4669L16.4056 19.4669C16.1308 19.4669 15.979 19.1511 16.1472 18.9378L20.7409 13.1259C20.7716 13.0867 20.8109 13.0549 20.8556 13.0331C20.9004 13.0113 20.9495 13 20.9993 13C21.0491 13 21.0983 13.0113 21.1431 13.0331Z"
        fill={color}
      />
    </svg>
  );
}