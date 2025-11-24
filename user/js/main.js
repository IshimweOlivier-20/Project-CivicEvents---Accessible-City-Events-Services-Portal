$("#nav-root").load("components/nav.html", function () {
    console.log("Navbar loaded.");

    if (typeof initDropdown === "function") initDropdown();
    attachNavbarEvents();
    attachLogout();
    initProfileModal(); 

    loadPage("event");
});

function attachLogout() {
  const logoutBtn = $("#logout-btn");

  logoutBtn.on("click", function () {
    logout();
  });
}




function loadPage(page) {
  $("#main-content").load(`components/${page}.html`, function () {

    console.log("Loaded page:", page);

    if (page === "event") loadEvents();
    if (page === "audio") loadAnnouncements() 
    if (page === "video") loadPromos();
    if (page === "feedback") console.log("Load Feedback Page…");

  });
}

function attachNavbarEvents() {
  
  $("li[data-page]").on("click", function () {
    const page = $(this).data("page");
    loadPage(page);
  });
}

