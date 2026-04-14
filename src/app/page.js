"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import breeds from "@/data/breeds.json";

const NAV_ITEMS = [
  { key: "home", icon: "/iconHome.png", label: "Home" },
  { key: "star", icon: "/iconFavorite.png", label: "Favorites" },
  { key: "chat", icon: "/iconMessage.png", label: "Messages" },
  { key: "user", icon: "/iconUser.png", label: "Profile" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [activeNav, setActiveNav] = useState("home");

  const filtered = useMemo(() => {
    if (!search.trim()) return breeds;
    return breeds.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function toggleFav(e, id) {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

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

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 24px 24px 24px",
        }}
      >
        <img
          src="/searchtool.png"
          alt="search"
          style={{ width: 52, height: 52, flexShrink: 0 }}
        />
        <input
          suppressHydrationWarning
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search breeds"
          style={{
            flex: 1,
            height: "52px",
            borderRadius: "999px",
            border: "1.5px solid #ebebeb",
            outline: "none",
            textAlign: "center",
            fontSize: "14px",
            color: "#1a1a1a",
            backgroundColor: "#ffffff",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontFamily: "var(--font-manrope)",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="overflow-y-auto no-scrollbar"
        style={{
          flex: 1,
          padding: "0 24px 112px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          alignContent: "start",
        }}
      >
        {filtered.map((breed) => (
          <Link
            key={breed.id}
            href={`/breed/${breed.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* Billedcontainer */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={breed.image.url}
                alt={breed.name}
                fill
                className="object-cover"
                sizes="165px"
              />
              {/* Star knap */}
              <button
                suppressHydrationWarning
                onClick={(e) => toggleFav(e, breed.id)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={favorites.has(breed.id) ? "#E8907C" : "none"}
                  stroke="#E8907C"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            </div>

            {/* Navn og oprindelse */}
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
                {breed.name}
              </p>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "2px 0 0 0" }}>
                {breed.origin}
              </p>
            </div>
          </Link>
        ))}
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
