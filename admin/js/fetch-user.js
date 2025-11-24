
/* -----------------------
      FETCH ALL USERS
------------------------*/
async function loadUsers() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:4000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("API returned " + res.status);
    }

    const data = await res.json();
    console.log("Users API response:", data.data);

    renderUsers(data.data || data.users);

  } catch (err) {
    console.error(err);
    alert("Failed to load users!\n" + err.message);
  }
}

/* -----------------------
      RENDER USERS TABLE
------------------------*/
function renderUsers(users) {
  const table = document.getElementById("users-table");
  table.innerHTML = "";

  users.forEach(user => {
    const tr = document.createElement("tr");

tr.className = user.is_active ? "" : "text-gray-400"; 

tr.innerHTML = `
  <td class="border p-2">${user.full_name}</td>
  <td class="border p-2">${user.email}</td>
  <td class="border p-2">${user.role}</td>
  <td class="border p-2">${user.is_active ? "Enabled" : "Disabled"}</td>

  <td class="border p-2">
    <button class="toggle-user bg-emerald-600 text-white px-3 py-1 rounded"
      data-id="${user.id}" data-status="${user.is_active}">
      ${user.is_active ? "Disable" : "Enable"}
    </button>
  </td>
`;


    table.appendChild(tr);
  });

  attachUserButtons();
}

/* -----------------------
      ATTACH BUTTON ACTIONS
------------------------*/
function attachUserButtons() {
  const token = localStorage.getItem("token");

  /* DELETE USER */
  document.querySelectorAll(".delete-user").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("Delete this user?")) return;

      await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      loadUsers();
    });
  });

  /* ENABLE/DISABLE */
 /* ENABLE/DISABLE */
document.querySelectorAll(".toggle-user").forEach(btn => {
  btn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const id = btn.dataset.id;
    const isActive = btn.dataset.status === "true";

    const url = isActive
      ? `http://localhost:4000/api/users/${id}/disable`
      : `http://localhost:4000/api/users/${id}/enable`;

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

      loadUsers(); 

    } catch (err) {
      console.error(err);
      alert("Network error toggling user");
    }
  });
});
}