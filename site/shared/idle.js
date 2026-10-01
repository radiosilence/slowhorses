// Pause decorative loops while the tab is hidden.
const sync = () => document.documentElement.classList.toggle("page-hidden", document.hidden);
document.addEventListener("visibilitychange", sync);
sync();
