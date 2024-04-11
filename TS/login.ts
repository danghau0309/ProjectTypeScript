export interface User {
	username: string;
	password: string;
	email: string;
}
export const btnSignIn = document.getElementById("btnSignIn") as HTMLButtonElement;
export const handleSignIn = (e: Event) => {
	e.preventDefault();
	const username = (document.getElementById("username") as HTMLInputElement).value;
	const password = (document.getElementById("password") as HTMLInputElement).value;
	if (!username || !password) {
		const waringForm = document.createElement("div") as HTMLDivElement;
		waringForm.classList.add("waring-form");
		waringForm.innerHTML =
			"<i class='bx bx-info-circle'></i> <span >Vui lòng nhập đầy đủ thông tin </span>";
		document.body.appendChild(waringForm);
		setTimeout(() => {
			waringForm.remove();
		}, 1000);
	} else {
		fetch("http://localhost:5000/users")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				return res.json();
			})
			.then((users: User[]) => {
				const findUsersExist = users.find(
					(user) => user.username === username && user.password === password
				);
				if (findUsersExist) {
					localStorage.setItem("isLoggedIn", JSON.stringify(true));
					localStorage.setItem("LoggedInUser", JSON.stringify(username));
					const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") ?? "false");
					window.location.reload();
					window.location.href = "./index.html";
				} else {
					const waringForm = document.createElement("div") as HTMLDivElement;
					waringForm.classList.add("waring-form-red");
					waringForm.innerHTML =
						"<i class='bx bx-x-circle'></i><span >Thông tin đăng nhập sai không tồn tại</span>";
					document.body.appendChild(waringForm);
					setTimeout(() => {
						waringForm.remove();
					}, 1000);
				}
			})
			.catch((err) => console.error(err));
	}
};
export const statusLoggedIn = () => {
	const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") ?? "false");
	if (isLoggedIn) {
		const textLoggedIn = document.getElementById("text-login") as HTMLSpanElement;
		const textRegister = document.getElementById("text-register") as HTMLSpanElement;
		const boxAuth = document.getElementById("box-auth") as HTMLDivElement;
		const profile = document.createElement("span") as HTMLSpanElement;
		textLoggedIn.innerHTML = "<i class='bx bx-log-out'></i> Đăng xuất";
		textLoggedIn.style.color = "#dd3a73";
		profile.innerHTML = "<a href='profile.html'><i class='bx bxs-user-account'></i> Hồ sơ</a>";
		profile.style.fontWeight = "bold";
		boxAuth.appendChild(profile);
		textRegister.style.display = "none";
	}
};
export const textLoggedIn = document.getElementById("text-login") as HTMLSpanElement;
export const changeStatus = () => {
	const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") ?? "false");
	if (isLoggedIn) {
		localStorage.setItem("isLoggedIn", JSON.stringify(false));
		localStorage.removeItem("LoggedInUser");
	}
};
