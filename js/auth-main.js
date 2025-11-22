$(function () {
    // Load login page by default
    loadPage("login");

    // Navigation from login ↔ signup
    $(document).on("click", "#go-signup", function () {
        loadPage("signup");
    });

    $(document).on("click", "#go-login", function () {
        loadPage("login");
    });

    // Toggle password visibility
    $(document).on("click", "#toggle-password", function () {
        const input = $("#password");
        const type = input.attr("type") === "password" ? "text" : "password";
        input.attr("type", type);

        // Change eye icon
        $(this).text(type === "password" ? "👁️" : "🙈");
    });
});

// Function to load login/signup component
function loadPage(page) {
    $("#auth-content").load(`auth/components/${page}.html`);
}
