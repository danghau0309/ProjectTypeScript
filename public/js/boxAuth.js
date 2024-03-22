export const iconUser = document.getElementById("icon-user");
export const boxAuth = document.getElementById("box-auth");
export const checkInput = document.getElementById("addCart");
export const notifi = document.getElementById("notifi");
export const displayAuth = () => {
    boxAuth.classList.toggle("active");
};
export const handleForm = () => {
    const valueInput = document.getElementById("valueInput").value;
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
