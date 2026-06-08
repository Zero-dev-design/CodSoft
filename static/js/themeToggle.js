const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    current === "light" ? "dark" : "light"
  );
});
