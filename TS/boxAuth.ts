export const iconUser = document.getElementById("icon-user") as HTMLElement;
export const boxAuth = document.getElementById("box-auth") as HTMLElement;
export const checkInput = document.getElementById("addCart") as HTMLElement | null;
export const notifi = document.getElementById("notifi") as HTMLElement;
export const displayAuth = (): void => {
    boxAuth.classList.toggle("active");
};
export const handleForm = (): void => {
    const valueInput = (document.getElementById("valueInput") as HTMLInputElement).value;
    if (Number(valueInput) <= 0) {
        const waringMsg = document.createElement("div");
        waringMsg.classList.add("warningMiximum");
        waringMsg.innerHTML =
            "<i class='fa-solid fa-circle-exclamation'></i> Tối thiểu một sản phẩm";
        notifi.appendChild(waringMsg);
        setTimeout(() => {
            waringMsg.remove();
        }, 2000);
    }
};
let show_eye = document.querySelector(".fa-eye") as HTMLElement;
let show_eye_slash = document.getElementById("fa-eye-slash") as HTMLElement; // Sửa lại thành "fa-eye-slash"
let passwordInput = document.getElementById("password-input") as HTMLInputElement; // Kiểu dữ liệu cụ thể của input element
show_eye?.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        show_eye.style.display = "none";
        show_eye_slash.style.display = "block";
        passwordInput.type = "text";
    }
});
show_eye_slash?.addEventListener("click", () => {
    if (passwordInput.type === "text") {
        show_eye.style.display = "block";
        show_eye_slash.style.display = "none";
        passwordInput.type = "password";
    }
});
