// document.addEventListener("DOMContentLoaded", () => {
//   loadNotifications();
// });

async function loadNotifications() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("Token missing. Cannot load notifications.");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const list = $("#notifications-list");
    list.html("");

    if (!data.data || data.data.length === 0) {
      list.append('<p class="text-gray-500">No notifications available.</p>');
      return;
    }

    data.data.forEach((notify) => {
      const notifyDiv = $(`
        <div class="p-4 border flex flex-col md:flex-row justify-between items-center rounded shadow bg-white">
          <div>
            <h4 class="font-bold text-lg">${notify.title}</h4>
            <p class="mt-1">${notify.message}</p>
          </div>

          <button 
            class="delete-btn mt-3 bg-red-600 text-white px-3 py-1 rounded"
            data-id="${notify.id}"
          >
            Delete
          </button>
        </div>
      `);

      list.append(notifyDiv);
    });

    $(".delete-btn").on("click", function () {
      const id = $(this).data("id");
      deleteNotification(id);
    });

  } catch (err) {
    console.error("Failed to load notifications:", err);
    $("#notifications-list").html('<p class="text-red-500">Failed to load notifications.</p>');
  }
}

async function deleteNotification(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:4000/api/notifications/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Notification deleted");
      loadNotifications(); // Refresh list
    } else {
      alert("Failed to delete notification");
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
}
