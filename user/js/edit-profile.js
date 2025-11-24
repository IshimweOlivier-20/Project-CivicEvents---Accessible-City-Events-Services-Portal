function initProfileModal() {
  const editBtn = document.getElementById("edit-profile-btn");
  const modal = document.getElementById("edit-modal");
  const form = document.getElementById("edit-form");
  const fullnameInput = document.getElementById("edit-fullname");
  const emailInput = document.getElementById("edit-email");
  const token = localStorage.getItem("token");

  if (!editBtn || !modal) {
    console.warn("Edit profile elements not found yet");
    return;
  }

  // open modal
  editBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = await res.json();

      fullnameInput.value = profile.data.full_name || "";
      emailInput.value = profile.data.email || "";

      modal.classList.remove("hidden");
    } catch (e) {
      console.log("Error loading profile:", e);
    }
  });

  // close modal when clicking background
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // submit edit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/profile/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: fullnameInput.value.trim(),
          email: emailInput.value.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated!");
        modal.classList.add("hidden");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  });
}
