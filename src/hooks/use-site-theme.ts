import { useEffect, useState } from "react";

const STORAGE_KEY = "sea-site-theme";

export function useSiteTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    try {
      const light = window.localStorage.getItem(STORAGE_KEY) === "light";
      setDark(!light);
      document.documentElement.classList.toggle("light", light);
    } catch {
      // The default dark theme remains available when storage is blocked.
    }
  }, []);

  function changeTheme(nextDark: boolean) {
    setDark(nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");
    } catch {
      // Theme switching still works without persistence.
    }
  }

  return { dark, changeTheme };
}