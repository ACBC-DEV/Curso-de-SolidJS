import { createSignal, createEffect } from "solid-js";
export function ButtonDarkMode() {
  const darkModeLS = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = createSignal(darkModeLS);
  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
    localStorage.setItem("darkMode", darkMode());
  });
  return (
    <button
      class="text-2xl fixed top-4 right-4"
      onClick={() => setDarkMode(!darkMode())}
    >
      {darkMode() ? "🌞" : "🌚"}
    </button>
  );
}
