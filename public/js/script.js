if (document.title.includes("Login")) {
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
	console.log(this);
	console.log(this.id);
	console.log(this.value);
	console.log(this.parentElement.outerText);
	console.log(this.parentElement.parentElement.id);
	try {
		const response = await fetch(`habits/mark/${this.parentElement.parentElement.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				dayId: this.id,
				value: this.value === "on" ? true : false,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}
