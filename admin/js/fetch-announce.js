
async function loadAnnouncements() {
  const token = localStorage.getItem("token");
  const list = $("#announcement-list");

  list.html(`<p class="text-gray-500">Loading...</p>`);

  try {
    const res = await fetch("http://localhost:4000/api/announcements", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    list.html("");

    if (!data.data || data.data.length === 0) {
      list.append(`<p class="text-gray-500">No announcements available.</p>`);
      return;
    }

    renderAnnouncements(data.data);
  } catch (err) {
    console.error(err);
    list.html(`<p class="text-red-500">Failed to load announcements.</p>`);
  }
}

function renderAnnouncements(announcements) {
  const list = $("#announcement-list");
  list.html("");

  announcements.forEach(ann => {
    const div = $(`
      <div class="p-4 border rounded shadow bg-white">
        <h4 class="font-bold text-lg">${ann.title}</h4>

        ${ann.audio_url ? 
          `<audio controls class="mt-3 w-full">
            <source src="${ann.audio_url}" type="audio/mpeg"/>
          </audio>` : ""
        }

        <p class="mt-2 text-sm ${ann.is_published ? "text-green-600" : "text-yellow-600"}">
          Status: <strong>${ann.is_published ? "Published" : "Unpublished"}</strong>
        </p>

        <div class="flex gap-2 mt-3">
          <button 
            class="toggle-ann bg-emerald-600 text-white px-3 py-1 rounded"
            data-id="${ann.id}"
            data-status="${ann.is_published}"
          >
            ${ann.is_published ? "Unpublish" : "Publish"}
          </button>

          <button 
            class="delete-ann bg-red-600 text-white px-3 py-1 rounded"
            data-id="${ann.id}"
          >
            Delete
          </button>
        </div>
      </div>
    `);

    list.append(div);
  });

  attachAnnouncementButtons();
}

/* -------------------------
   ATTACH BUTTON ACTIONS
--------------------------*/
function attachAnnouncementButtons() {
  const token = localStorage.getItem("token");

  /* DELETE */
  document.querySelectorAll(".delete-ann").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("Delete this announcement?")) return;

      await fetch(`http://localhost:4000/api/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      loadAnnouncements();
    });
  });

  /* PUBLISH / UNPUBLISH (Toggle) */
  document.querySelectorAll(".toggle-ann").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const isPublished = btn.dataset.status === "true";

      const url = isPublished
        ? `http://localhost:4000/api/announcements/${id}/unpublish`
        : `http://localhost:4000/api/announcements/${id}/publish`;

      try {
        const res = await fetch(url, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          const err = await res.json();
          alert("Failed: " + err.message);
          return;
        }

        loadAnnouncements(); 

      } catch (err) {
        console.error(err);
        alert("Network error toggling announcement");
      }
    });
  });
}
