function logout() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found. Redirecting to login...");
    window.location.href = "/"; 
    return;
  }

  localStorage.removeItem("token");
  alert("Logout successfuly")
  window.location.href = "/"; 
}

