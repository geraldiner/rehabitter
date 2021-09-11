const demoLogin = document.querySelector("#demo-login");
demoLogin.addEventListener("click", () => {
	const loginForm = document.querySelector("#login-form");
	const emailInput = document.querySelector("#email");
	const passwordInput = document.querySelector("#password");
	emailInput.value = "john@example.com";
	passwordInput.value = "password";
	loginForm.submit();
});
