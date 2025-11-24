$(function () {
    // Load sidebar
    $("#sidebar-root").load("components/sidebar.html", function () {
        attachSidebarEvents(); // sidebar events load AFTER HTML inserts
    });

    // Load header
    $("#header-root").load("components/header.html");

    // Load default page
    loadPage("events");
});

// Load component content dynamically
// main.js
function loadPage(page) {
    $("#main-content").load(`components/${page}.html`, function () {

        // Call respective functions after page is loaded
        if (page === "users") loadUsers();
        if (page === "events") loadEvents();
        if (page === "event-form") attachCreateEventForm();
        if (page === "promos") loadPromos();  
         if (page === "notify") loadNotifications(); 
         if (page === "announc") loadAnnouncements(); 
    });
}


function attachSidebarEvents() {
    // For sidebar text buttons like Events, Users, Promos, Notifications
    $("button[data-page]").on("click", function () {
        const page = $(this).data("page");
        loadPage(page);
    });

    // Quick action buttons → load form pages
    $("#btn-new-event").on("click", function () {
        loadPage("event-form");
    });

    $("#btn-new-ann").on("click", function () {
        loadPage("announc-form");
    });

    $("#btn-new-promo").on("click", function () {
        loadPage("promo-form");
    });
}
