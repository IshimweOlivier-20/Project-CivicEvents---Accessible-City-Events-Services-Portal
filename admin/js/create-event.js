document.addEventListener("DOMContentLoaded", () => {
  $(document).on("submit", "#event-form", async function (e) {
    e.preventDefault();

    const title = $("#ef-title").val();
    const location = $("#ef-location").val();
    const starts_at = $("#ef-start-date").val();
    const ends_at = $("#ef-end-date").val();
    const description = $("#ef-desc").val();

    const token = localStorage.getItem("token");  

    if (!token) {
      alert("You are not logged in. Token missing!");
      return;
    }

    const eventData = {
      title,
      description,
      location,
      starts_at,
      ends_at,
      metadata: {}
    };

    try {
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  
        },
        body: JSON.stringify(eventData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event created successfully!");
        e.target.reset();
      } else {
        alert("Failed: " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  });
});
