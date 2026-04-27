import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "KUI";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #111827, #1f2937)",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>{title}</div>
        <div style={{ fontSize: 24, opacity: 0.7 }}>
          Composable UI System
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}