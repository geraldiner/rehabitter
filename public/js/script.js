if (document.title.includes("Log In")) {
	const demoLogin = document.querySelector("#demo-login");
	demoLogin.addEventListener("click", () => {
		const loginForm = document.querySelector("#login-form");
		const emailInput = document.querySelector("#email");
		const passwordInput = document.querySelector("#password");
		emailInput.value = "john@example.com";
		passwordInput.value = "password";
		loginForm.submit();
	});
}

const habitItems = document.querySelectorAll(".tracker-checkbox");
habitItems.forEach(h => {
	h.addEventListener("click", toggleCheckbox);
});

async function toggleCheckbox() {
	try {
		const response = await fetch(`habits/mark/${this.parentElement.parentElement.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				dayId: this.id,
				value: this.checked,
			}),
		});
		const data = await response.json();
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
