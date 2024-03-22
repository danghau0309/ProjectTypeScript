import { handleSignIn, btnSignIn, statusLoggedIn, textLoggedIn, changeStatus } from "./login.js";
import { registerUser, btnSignUp } from "./register.js";
import { renderDataToHtml } from "./show.js";
import { iconUser, checkInput, displayAuth, handleForm } from "./boxAuth.js";
import { renderCart } from "./showCart.js";
btnSignIn === null || btnSignIn === void 0 ? void 0 : btnSignIn.addEventListener("click", handleSignIn);
document.addEventListener("DOMContentLoaded", statusLoggedIn);
textLoggedIn === null || textLoggedIn === void 0 ? void 0 : textLoggedIn.addEventListener("click", changeStatus);
btnSignUp === null || btnSignUp === void 0 ? void 0 : btnSignUp.addEventListener("click", registerUser);
iconUser.addEventListener("click", displayAuth);
checkInput === null || checkInput === void 0 ? void 0 : checkInput.addEventListener("click", handleForm);
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
localStorage.setItem("cart", JSON.stringify(cart));
renderDataToHtml().then(() => {
    const btns = document.querySelectorAll("#btn");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = Number(btn.getAttribute("data-value"));
            fetch("http://localhost:3000/products")
                .then((res) => res.json())
                .then((products) => {
                const id = products.find((item) => item.id == productId);
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
renderCart();
