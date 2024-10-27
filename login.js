// Basic form validation (can be expanded for more robust validation)
document.getElementById("login-form").addEventListener("submit", function(event) {
    if (document.getElementById("email").value === "" || document.getElementById("password").value === "") {
      alert("Please fill in all fields.");
      event.preventDefault();
    }
  });
  
  document.getElementById("registration-form").addEventListener("submit", function(event) {
    // Add validation for registration fields as needed
  });
  