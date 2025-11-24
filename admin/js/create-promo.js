$(document).ready(function () {
  // Submit promo form
  $(document).on("submit", "#promo-form", async function (e) {
    e.preventDefault();

    const title = $("#promo-title").val().trim();
    const description = $("#promo-description").val().trim();
    const caption_text = $("#promo-caption").val().trim();
    const videoFile = $("#promo-video")[0].files[0];

    if (!title || !description || !caption_text || !videoFile) {
      alert("Please provide all required fields!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Token missing!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("caption_text", caption_text);
    formData.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:4000/api/promos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // don’t set Content-Type
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Promo created successfully!");
        $("#promo-form")[0].reset();
        $("#promo-video-preview").html("");
        loadPromos(); // reload promo list
      } else {
        alert("Failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error: Could not create promo.");
    }
  });

  // Video preview
  $(document).on("change", "#promo-video", function () {
    const file = this.files[0];
    const preview = $("#promo-video-preview");
    preview.html("");
    if (file) {
      const url = URL.createObjectURL(file);
      const videoEl = $("<video>")
        .attr("src", url)
        .attr("controls", true)
        .addClass("w-full max-h-60");
      preview.append(videoEl);
    }
  });

  // Reset form
  $(document).on("click", "#reset-promo", function () {
    $("#promo-form")[0].reset();
    $("#promo-video-preview").html("");
  });

  // Load promos dynamically
  async function loadPromos() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:4000/api/promos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const list = $("#promos-list");
      list.html("");

      (data.data || []).forEach((promo) => {
        const div = $(`
          <div class="p-4 border rounded shadow">
            <h4 class="font-bold">${promo.title}</h4>
            <p>${promo.description}</p>
            <p class="italic text-gray-500">${promo.caption_text}</p>
            ${promo.video_url ? `<video src="${promo.video_url}" controls class="w-full max-h-60 mt-2"></video>` : ""}
          </div>
        `);
        list.append(div);
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Initial load
  loadPromos();
});
