"use client";

import { useEffect } from "react";

export function ForceLightMode() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";

    body.classList.remove("dark");
    body.classList.add("light");
    body.style.colorScheme = "light";
  }, []);

  return null;
}