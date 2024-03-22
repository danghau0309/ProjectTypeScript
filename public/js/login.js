const btnSignIn = document.getElementById("btnSignIn");
const handleSignIn = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (!username || !password) {
        const waringForm = document.createElement("div");
        waringForm.classList.add("waring-form");
        waringForm.innerHTML =
            "<i class='bx bx-info-circle'></i> <span >Vui lòng nhập đầy đủ thông tin </span>";
        document.body.appendChild(waringForm);
        setTimeout(() => {
            waringForm.remove();
        }, 1000);
    }
    else {
        fetch("http://localhost:3000/users")
            .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
            .then((users) => {
            var _a;
            const findUsersExist = users.find((user) => user.username === username && user.password === password);
            if (findUsersExist) {
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
                const isLoggedIn = JSON.parse((_a = localStorage.getItem("isLoggedIn")) !== null && _a !== void 0 ? _a : "false");
                console.log("users found");
                window.location.reload();
                window.location.href = "./index.html";
            }
            else {
                const waringForm = document.createElement("div");
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
const statusLoggedIn = () => {
    var _a;
    const isLoggedIn = JSON.parse((_a = localStorage.getItem("isLoggedIn")) !== null && _a !== void 0 ? _a : "false");
    if (isLoggedIn) {
        const textLoggedIn = document.getElementById("text-login");
        const textRegister = document.getElementById("text-register");
        const boxAuth = document.getElementById("box-auth");
        const profile = document.createElement("span");
        textLoggedIn.innerHTML = "<i class='bx bx-log-out'></i> Đăng xuất";
        textLoggedIn.style.color = "#dd3a73";
        profile.innerHTML = "<i class='bx bxs-user-account'></i> Hồ sơ";
        profile.style.fontWeight = "bold";
        boxAuth.appendChild(profile);
        textRegister.style.display = "none";
    }
};
const textLoggedIn = document.getElementById("text-login");
const changeStatus = () => {
    var _a;
    const isLoggedIn = JSON.parse((_a = localStorage.getItem("isLoggedIn")) !== null && _a !== void 0 ? _a : "false");
    if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
    }
};
export { handleSignIn, btnSignIn, statusLoggedIn, changeStatus, textLoggedIn };
