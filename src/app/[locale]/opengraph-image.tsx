import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { profile } from "@/data/profile";
import { routing } from "@/i18n/routing";

export const alt = `${profile.name} · ${profile.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: param } = await params;
  const locale = hasLocale(routing.locales, param) ? param : routing.defaultLocale;
  const logo = await readFile(join(process.cwd(), "public/brand/logo-mark.png"), "base64");
  const gradient = "linear-gradient(90deg, #FFAE00, #F7813F 35%, #F87F9C 65%, #F865E0)";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(circle at 85% 15%, rgba(248,101,224,0.22), transparent 45%), radial-gradient(circle at 10% 90%, rgba(255,174,0,0.18), transparent 45%), #07070A",
        color: "#F5F5F7",
      }}
    >
      <img src={`data:image/png;base64,${logo}`} width={216} height={115} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            backgroundImage: gradient,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 44, marginTop: 8, color: "#A1A1AA" }}>{profile.role[locale]}</div>
      </div>
      <div style={{ display: "flex", height: 6, width: "100%", backgroundImage: gradient, borderRadius: 999 }} />
    </div>,
    size,
  );
}
