$(document).on("submit", "#event-form", function (e) {
    e.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val();

    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    $.ajax({
        url: "http://localhost:4000/api/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email, password }),

        success: function (res) {

            // FIX: based on correct backend response
            const token = res.token || res.data?.token;

            if (token) {
                localStorage.setItem("auth_token", token);
            } else {
                console.error("No token returned:", res);
            }

            alert(res.message || "Login successful!");

            window.location.href = "/admin/index.html"; 
        },

        error: function (xhr) {
            alert(xhr.responseJSON?.message || "Error occurred");
        }
    });
});
