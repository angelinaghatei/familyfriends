"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import breeds from "@/data/breeds.json";

const NAV_ITEMS = [
  { key: "home", icon: "/iconHome.png", label: "Home" },
  { key: "star", icon: "/iconFavorite.png", label: "Favorites" },
  { key: "chat", icon: "/iconMessage.png", label: "Messages" },
  { key: "user", icon: "/iconUser.png", label: "Profile" },
];

const PILL_COLORS = [
  { bg: "#DBEAFE", color: "#1D4ED8" },
  { bg: "#FCE7F3", color: "#9D174D" },
  { bg: "#D1FAE5", color: "#065F46" },
  { bg: "#FEF3C7", color: "#92400E" },
  { bg: "#EDE9FE", color: "#5B21B6" },
];

export default function BreedPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const breed = breeds.find((b) => b.id === id);
  const [isFav, setIsFav] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  if (!breed) {
    return (
      <div style={{ width: 390, minHeight: "100vh", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#9ca3af" }}>Breed not found</p>
      </div>
    );
  }

  const temperamentList = breed.temperament.split(", ");

  return (
    <div
      suppressHydrationWarning
      style={{
        width: "390px",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 24px 16px 24px",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: 800, color: "#1a1a1a" }}>
          FamilyFriends
        </span>
        <img src="/bellring.png" alt="notifications" style={{ width: 24, height: 24 }} />
      </div>

      {/* Hero billede */}
      <div
        style={{
          height: "320px",
          borderRadius: "24px",
          margin: "0 16px 0 16px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#f0f0f0",
          flexShrink: 0,
        }}
      >
        <Image
          src={breed.image.url}
          alt={breed.name}
          fill
          loading="eager"
          className="object-cover"
          sizes="358px"
        />

        {/* Tilbage knap */}
        <button
          suppressHydrationWarning
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Stjerne knap */}
        <button
          suppressHydrationWarning
          onClick={() => setIsFav((v) => !v)}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "#E8907C" : "none"} stroke="#E8907C" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>

        {/* Navn pill */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            backgroundColor: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(6px)",
            borderRadius: "20px",
            padding: "6px 14px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>
            {breed.name}
          </span>
        </div>
      </div>

      {/* Indhold */}
      <div
        className="overflow-y-auto no-scrollbar"
        style={{ flex: 1, padding: "20px 24px 112px 24px" }}
      >
        {/* Navn */}
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1a1a1a", marginBottom: "16px" }}>
          {breed.name}
        </h1>

        {/* Temperament pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {temperamentList.map((trait, i) => {
            const c = PILL_COLORS[i % PILL_COLORS.length];
            return (
              <span
                key={trait}
                style={{
                  backgroundColor: c.bg,
                  color: c.color,
                  borderRadius: "999px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {trait}
              </span>
            );
          })}
        </div>

        {/* Beskrivelse */}
        <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
          Breed description
        </p>
        <p style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.6, marginBottom: "20px" }}>
          {breed.description}
        </p>

        {/* Historik */}
        <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
          Breed history
        </p>
        <p style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.6 }}>
          {breed.history}
        </p>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "390px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "12px",
          paddingBottom: "28px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            suppressHydrationWarning
            key={item.key}
            onClick={() => setActiveNav(item.key)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: activeNav === item.key ? 1 : 0.4,
            }}
          >
            <img src={item.icon} alt={item.label} style={{ width: 24, height: 24 }} />
          </button>
        ))}
      </div>
    </div>
  );
}
