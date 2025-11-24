function initDropdown() {
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");

  if (!profileBtn || !profileDropdown) {
    console.warn("Dropdown elements not found yet.");
    return;
  }

  profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.add("hidden");
    }
  });
}
