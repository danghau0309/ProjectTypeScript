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
