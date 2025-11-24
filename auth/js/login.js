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
            const token = res.data?.token;
            const role = res.data?.user?.role;

            if (!token) {
                console.error("No token returned:", res);
                alert("Login failed: No token received.");
                return;
            }

            // Save token and role
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            alert(res.message || "Login successful!");

           if (role === "admin") {
    window.location.href = "/admin/index.html";
} else if (role === "user") {
    window.location.href = "/user/index.html";
} else {
    alert("Page not found for this role!");
}

        },

        error: function (xhr) {
            alert(xhr.responseJSON?.message || "Error occurred");
        }
    });
});
