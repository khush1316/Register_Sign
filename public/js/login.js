form.addEventListener("submit", async () => {
    const login = {
        email: document.getElementById('email').value, // Access the email field value correctly
        password: document.getElementById('password').value // Access the password field value correctly
    };

    // Send login data to the server
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // Handle response data
        if (data.status === "error") {
            success.style.display = "none";
            error.style.display = "block";
            error.innerText = data.error;
        } else {
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.success;
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle any errors that occur during the fetch and processing of data
    }
});
