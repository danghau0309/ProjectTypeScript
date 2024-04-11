import { handleSignIn, btnSignIn, statusLoggedIn, textLoggedIn, changeStatus } from "./login.js";
import { registerUser, btnSignUp } from "./register.js";
import { renderDataToHtml } from "./show.js";
import { iconUser, checkInput, displayAuth, handleForm } from "./boxAuth.js";
import { renderProductList, addProductButton, addProduct } from "./admin.js";
import { showDetails } from "./productDetail.js";
import { handleCart } from "./cart/handleCart.js";
import { apiDistrict } from "./api/api.js";
import { orderList, orderDetail } from "./order_manager.js";
import { header } from "./header/header.js";
import { handleCate } from "./category/category.js";
import { profile } from "./profile.js";
import { changePassword } from "./changePassword.js";
showDetails();
btnSignIn?.addEventListener("click", handleSignIn);
document.addEventListener("DOMContentLoaded", statusLoggedIn);
textLoggedIn?.addEventListener("click", changeStatus);
btnSignUp?.addEventListener("click", registerUser);
iconUser.addEventListener("click", displayAuth);
checkInput?.addEventListener("click", handleForm);
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
localStorage.setItem("cart", JSON.stringify(cart));
renderDataToHtml().then(() => {
    const btns = document.querySelectorAll("#btn");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productId = Number(btn.getAttribute("data-value"));
            fetch("http://localhost:5000/products")
                .then((res) => res.json())
                .then((products) => {
                const findIdProductOfCart = products.find((item) => item.id == productId);
                const cartList = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingItemIndex = cartList.findIndex((item) => item.id == findIdProductOfCart.id);
                console.log(existingItemIndex);
                if (existingItemIndex !== -1) {
                    cartList[existingItemIndex].quantity += 1;
                    localStorage.setItem("cart", JSON.stringify(cartList));
                }
                else {
                    cart.push(findIdProductOfCart);
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            })
                .catch((err) => {
                console.log(err);
            });
        });
    });
});
renderProductList();
addProductButton?.addEventListener("click", (e) => {
    e.preventDefault();
    addProduct(e);
});
apiDistrict();
handleCart();
orderList();
orderDetail();
header();
handleCate();
profile();
changePassword();
