document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});

/* =======================================================
   LOAD EVENTS
=========================================================*/
async function loadEvents() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:4000/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to load events:", data.message);
      return;
    }

    renderEvents(data.data || []);
  } catch (err) {
    console.error("LoadEvents Error:", err);
  }
}

/* =======================================================
   RENDER EVENTS
=========================================================*/
function renderEvents(events) {
  const list = document.getElementById("events-list");
  list.innerHTML = "";

  if (!events.length) {
    list.innerHTML = `<p class="text-gray-500">No events found.</p>`;
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "p-4 bg-white border rounded shadow";

    card.innerHTML = `
      <h4 class="text-xl font-semibold text-gray-800">${event.title}</h4>
      <p class="text-gray-600">${event.location || "No location provided"}</p>

      <div class="mt-3 text-sm text-gray-500 flex justify-between">
        <div>
          <p><strong>Starts:</strong> ${event.starts_at}</p>
          <p><strong>Ends:</strong> ${event.ends_at}</p>
        </div>

        <div class="flex gap-2">
          <button 
            class="ef-edit px-3 py-2 bg-yellow-600 text-white rounded"
            data-event='${JSON.stringify(event)}'>
            Edit
          </button>

          <button 
            class="ef-delete px-3 py-2 bg-red-500 text-white rounded"
            data-id="${event.id}">
            Delete
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });

  attachEventButtons();
}

/* =======================================================
   ADD CLICK EVENTS TO EDIT / DELETE BUTTONS
=========================================================*/
function attachEventButtons() {
  const token = localStorage.getItem("token");

  // DELETE EVENT
  document.querySelectorAll(".ef-delete").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("Delete this event?")) return;

      try {
        const res = await fetch(`http://localhost:4000/api/events/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (!res.ok) {
          alert("Failed to delete: " + (data.message || "Unknown error"));
          return;
        }

        alert("Event deleted!");
        loadEvents();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete event due to network error.");
      }
    });
  });

  // EDIT EVENT
  document.querySelectorAll(".ef-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const event = JSON.parse(btn.dataset.event);
      openEditModal(event);
    });
  });
}

/* =======================================================
   EDIT MODAL LOGIC
=========================================================*/
function openEditModal(event) {
  document.getElementById("edit-id").value = event.id;
  document.getElementById("edit-title").value = event.title;
  document.getElementById("edit-description").value = event.description;
  document.getElementById("edit-location").value = event.location;
  document.getElementById("edit-starts").value = formatDate(event.starts_at);
  document.getElementById("edit-ends").value = formatDate(event.ends_at);

  document.getElementById("edit-modal").classList.remove("hidden");
}

// Convert API datetime to <input type="datetime-local">
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toISOString().slice(0, 16);
}

document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-modal").classList.add("hidden");
});

/* =======================================================
   SUBMIT UPDATE EVENT
=========================================================*/
document.getElementById("edit-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const id = document.getElementById("edit-id").value;

  const body = {
    title: document.getElementById("edit-title").value,
    description: document.getElementById("edit-description").value,
    location: document.getElementById("edit-location").value,
    starts_at: document.getElementById("edit-starts").value,
    ends_at: document.getElementById("edit-ends").value
  };

  try {
    const res = await fetch(`http://localhost:4000/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    let data = {};

    try {
      data = await res.json();  
    } catch (jsonErr) {
      console.warn("⚠ JSON parse failed (empty response?)");
    }

    if (!res.ok) {
      alert("Update failed: " + (data.message || "No response body from server"));
      return;
    }

    alert("✅ Event updated successfully!");
    document.getElementById("edit-modal").classList.add("hidden");
    loadEvents();

  } catch (error) {
    console.error("Update Error:", error);
    alert(" Network error: Could not update event");
  }
});

