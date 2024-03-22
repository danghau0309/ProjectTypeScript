import { handleSignIn, btnSignIn, statusLoggedIn, textLoggedIn, changeStatus } from "./login.js";
import { registerUser, btnSignUp } from "./register.js";
import { renderDataToHtml, Product } from "./show.js";
import { iconUser, boxAuth, checkInput, notifi, displayAuth, handleForm } from "./boxAuth.js";
import { renderCart } from "./showCart.js";
// Login user
btnSignIn?.addEventListener("click", handleSignIn);
document.addEventListener("DOMContentLoaded", statusLoggedIn);
textLoggedIn?.addEventListener("click", changeStatus);
// Register user
btnSignUp?.addEventListener("click", registerUser);
// other Processing functions
iconUser.addEventListener("click", displayAuth);
checkInput?.addEventListener("click", handleForm);
// render Data :
const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
localStorage.setItem("cart", JSON.stringify(cart));
renderDataToHtml().then(() => {
	const btns: NodeListOf<Element> = document.querySelectorAll("#btn");
	btns.forEach((btn: Element) => {
		btn.addEventListener("click", () => {
			const productId = Number(btn.getAttribute("data-value"));
			fetch("http://localhost:3000/products")
				.then((res) => res.json())
				.then((products) => {
					const id = products.find((item: any) => item.id == productId);
					cart.push(id);
					localStorage.setItem("cart", JSON.stringify(cart));
					window.location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
});
//Render Cart
renderCart();
