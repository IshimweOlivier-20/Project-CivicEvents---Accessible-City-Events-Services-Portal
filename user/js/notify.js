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
    const notifyNumber = $("#notify-number"); 

    const count = data.data?.length || 0;
    notifyNumber.text(count);

  } catch (err) {
    console.error("Failed to load notifications:", err);
    $("#notify-number").text(0);
  }
}

$(document).ready(function () {
  loadNotifications();
});
