$(document).on("submit", "#signup-form", function (e) {
    e.preventDefault();

    const full_name = $("#fullname").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val();
    const confirm_password = $("#confirm-password").val();

    if (!full_name || !email || !password || !confirm_password) {
        alert("All fields are required!");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match!");
        return;
    }

    $.ajax({
        url: "http://localhost:4000/api/auth/signup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            full_name,
            email,
            password
        }),
        success: function (res) {
            alert( res.message || "Signup successful!");
            loadPage("login");
        },
        error: function (xhr) {
            alert(xhr.responseJSON?.message || "Error occurred");
        }
    });
});
