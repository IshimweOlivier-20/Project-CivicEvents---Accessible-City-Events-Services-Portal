document.addEventListener("DOMContentLoaded", () => {
  $(document).on("submit", "#ann-form", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const title = $("#af-title").val().trim();
    const audioFile = $("#af-audio")[0].files[0];

    if (!title || !audioFile) {
      alert("Please provide both title and audio file!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Token missing!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("audio", audioFile);

    try {
      const res = await fetch("http://localhost:4000/api/announcements", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` 
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Announcement created successfully!");
        $("#ann-form")[0].reset(); // reset form
        console.log("Announcement created:", data);
      } else {
        alert("Failed: " + (data.message || "Unknown error"));
      }

    } catch (err) {
      console.error("Network error:", err);
      alert("Network error: Could not create announcement.");
    }
  });
});
