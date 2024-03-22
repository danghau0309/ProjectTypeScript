const renderCart = () => {
    const cartList = document.getElementById("cartList");
    if (cartList !== null) {
        const getArrayFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        cartList.innerHTML = "";
        getArrayFromStorage.forEach((product) => {
            const { id, title, image, price } = product;
            cartList.innerHTML += `<tr>
								<td><img src="../public/img/${image}" alt="" /></td>
								<td>${title}</td>
								<td>
									<div class="quantity-cart">
									<button class="reduce">-</button>
									<span class="quantity-product">1</span>
									<button class="increase">+</button>
									</div>
								</td>
								<td>Giá : ${price} $</td>
								<td><i data-id='${id}' class="bx bxs-x-circle" id="deleteItem"></i></td>
							</tr>`;
        });
    }
    const deleteItem = document.querySelectorAll("#deleteItem");
    deleteItem.forEach((deleteCart) => {
        deleteCart.addEventListener("click", (e) => {
            const getArrayFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
            const cartId = deleteCart.getAttribute("data-id");
            const index = getArrayFromStorage.filter((item) => item.id !== cartId);
            console.log(index);
        });
    });
};
const payment = () => {
    const textTotal = document.getElementById("totalPrice");
    const totalAmount = document.getElementById("totalAmount");
    if (textTotal !== null && totalAmount !== null) {
        const getArrayFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        const monneyShip = 35;
        const total = getArrayFromStorage.reduce((sum, index) => sum + index.price, 0);
        totalAmount.innerHTML = total + " $ ";
        textTotal.innerHTML = total + monneyShip + " $ ";
    }
};
payment();
const applyCodeBtn = document.getElementById("applyCode");
if (applyCodeBtn !== null) {
    applyCodeBtn.onclick = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/voucher")
            .then((res) => res.json())
            .then((vouchers) => {
            const textTotal = document.getElementById("totalPrice");
            const discount = document.getElementById("discount").value;
            const applyVoucherCode = vouchers.find((voucherCode) => voucherCode.voucher === discount);
            if (applyVoucherCode) {
                const getArrayFromStorage = JSON.parse(localStorage.getItem("cart") || "[]");
                const monneyShip = 35;
                const totalOlder = getArrayFromStorage.reduce((sum, index) => sum + index.price, 0);
                const totalApplyCode = totalOlder / 2 + monneyShip;
                textTotal.innerHTML = totalApplyCode + " $";
                console.log(totalApplyCode);
            }
            else {
                alert("Mã giảm giá không tồn tại");
            }
        })
            .catch((err) => console.log(err));
    };
}
export { renderCart };
