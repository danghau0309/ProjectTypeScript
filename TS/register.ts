interface RegisterUser {
	username: string;
	password: string;
	email: string;
}
const btnSignUp = document.getElementById("btnSignUp") as HTMLButtonElement;

const registerUser = (e: Event): void => {
	e.preventDefault();
	const username = (document.getElementById("username") as HTMLInputElement).value;
	const password = (document.getElementById("password") as HTMLInputElement).value;
	const email = (document.getElementById("email") as HTMLInputElement).value;
	const reEnter = (document.getElementById("re-enter") as HTMLInputElement).value;
	if (!username || !password || !email || !reEnter) {
		const waringForm = document.createElement("div") as HTMLDivElement;
		waringForm.classList.add("waring-form");
		waringForm.innerHTML =
			"<i class='bx bx-info-circle'></i> <span >Vui lòng nhập đầy đủ thông tin </span>";
		document.body.appendChild(waringForm);
		setTimeout(() => {
			waringForm.remove();
		}, 2000);
	} else if (password.length < 8) {
		const waringForm = document.createElement("div") as HTMLDivElement;
		waringForm.classList.add("waring-form");
		waringForm.innerHTML =
			"<i class='bx bx-info-circle'></i> <span >Độ dài mật khẩu tối thiểu 8 kí tự</span>";
		document.body.appendChild(waringForm);
		setTimeout(() => {
			waringForm.remove();
		}, 2000);
	} else if (password !== reEnter) {
		const waringForm = document.createElement("div") as HTMLDivElement;
		waringForm.classList.add("waring-form-red");
		waringForm.innerHTML =
			"<i class='bx bx-x-circle'></i><span >Mật khẩu nhập không trùng khớp  </span>";
		document.body.appendChild(waringForm);
		setTimeout(() => {
			waringForm.remove();
		}, 1000);
	} else {
		const newUser = {
			username,
			password,
			email,
			role: "Người dùng"
		};
		fetch("http://localhost:5000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		})
			.then((res) => res.json())
			.then((post) => {
				const waringForm = document.createElement("div") as HTMLDivElement;
				waringForm.classList.add("waring-form-success");
				waringForm.innerHTML =
					"<i class='bx bxs-check-circle' ></i> <span >Tạo tài khoản thành công</span>";
				document.body.appendChild(waringForm);
				setTimeout(() => {
					waringForm.remove();
				}, 2000);
				window.location.href = "./login.html";
			})
			.catch((err) => console.error(err.message));
	}
};

export { registerUser, btnSignUp };
