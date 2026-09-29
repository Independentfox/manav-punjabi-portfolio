import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111111",
      }}
    >
      <svg width="132" height="132" viewBox="0 0 64 64">
        <path
          d="M15 46V19l14 17 14-17v27"
          fill="none"
          stroke="#ececf1"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="51" cy="45" r="4" fill="#f7b98b" />
      </svg>
    </div>,
    size,
  );
}
