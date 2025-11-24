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
    card.className = "p-4 bg-white border w-[500px] rounded shadow";

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
            class="ef-view  px-3 py-2 bg-white text-blue-600 rounded"
            data-id="${event.id}">
            Feedback
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });

  attachEventButtons();
}
