
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
      </div>
    `);

    list.append(div);
  });

}