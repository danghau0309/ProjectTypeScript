export const handleCart = () => {
    const CartList = JSON.parse(localStorage.getItem("cart") || "[]");
    const tbodyCart = document.getElementById("cartList");
    if (tbodyCart !== null) {
        tbodyCart.innerHTML = "";
    }
    let htmlCart = "";
    CartList.forEach((cart) => {
        if (cart) {
            const { id, title, price, image, quantity } = cart;
            htmlCart += ` <tr>
						<td><img src="../public/img/${image}" alt="" /></td>
									<td>${title}</td>
									<td>
										<div class="quantity-cart">
		                                <button class="decrease" data-id="${id}">-</button>
		                                <span class="quantity-product">${quantity}</span>
		                                <button class="increase" data-id="${id}">+</button>
										</div>
									</td>
									<td>${price} $</td>
									<td><i class="bx bxs-x-circle" data-id=${id}></i></td>
								</tr>`;
        }
    });
    if (tbodyCart !== null) {
        tbodyCart.innerHTML = htmlCart;
    }
    const deleteList = document.querySelectorAll(".bxs-x-circle");
    deleteList.forEach((deleteItem) => {
        deleteItem.onclick = () => {
            const idOfProduct = deleteItem.dataset.id;
            const indexLocation = CartList.findIndex((i) => i.id === idOfProduct);
            CartList.splice(indexLocation, 1);
            localStorage.setItem("cart", JSON.stringify(CartList));
            window.location.reload();
        };
    });
    const increaseBtn = document.querySelectorAll(".increase");
    const decreaseBtn = document.querySelectorAll(".decrease");
    increaseBtn.forEach((increase) => {
        increase.onclick = () => {
            const idOfProduct = increase.dataset.id;
            const findAndUpdateQuantity = CartList.find((i) => i.id === idOfProduct);
            findAndUpdateQuantity.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(CartList));
            window.location.reload();
        };
    });
    decreaseBtn.forEach((decrease) => {
        decrease.onclick = () => {
            const idOfProduct = decrease.dataset.id;
            const findAndUpdateQuantity = CartList.find((i) => i.id === idOfProduct);
            const indexLocation = CartList.findIndex((i) => i.id === idOfProduct);
            if (findAndUpdateQuantity.quantity === 1) {
                CartList.splice(indexLocation, 1);
                localStorage.setItem("cart", JSON.stringify(CartList));
                window.location.reload();
            }
            else {
                findAndUpdateQuantity.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(CartList));
                window.location.reload();
            }
        };
    });
    const sumProductsOfCartList = CartList.reduce((sum, index) => {
        return (sum += index.price * index.quantity);
    }, 0);
    const totalProductsOfCartList = document.getElementById("totalAmount");
    if (totalProductsOfCartList !== null) {
        totalProductsOfCartList.innerHTML = sumProductsOfCartList + " $ ";
    }
    const shipping = 35;
    const totalPrice = document.getElementById("totalPrice");
    const total = sumProductsOfCartList + shipping;
    if (totalPrice !== null) {
        totalPrice.innerHTML = total + " $";
    }
    const totalFooter = document.querySelector(".total");
    if (totalFooter !== null) {
        totalFooter.innerHTML = total + " $";
    }
    const productList = document.querySelector(".view_list_wrapper");
    if (productList !== null) {
        productList.innerHTML = "";
        CartList.forEach((list) => {
            const { title, quantity, price, image } = list;
            productList.innerHTML += ` <div class="item">
									<img src="../public/img/${image}" alt="" class="payment_img" />
									<div class="item_infor">
										<span class="item_name">Tên sản phẩm :${title}</span>
										<div class="box_price_quantity">
											<span>Giá 1 sản phẩm : ${price} $</span>
											<span class="item_quantity">Số lượng : ${quantity} </span>
										</div>
									</div>
								</div>`;
        });
    }
    const btn_payment = document.querySelector(".btn_payment");
    if (btn_payment !== null) {
        btn_payment.addEventListener("click", () => {
            const fullname = document.getElementById("fullname").value;
            const phonenumber = document.getElementById("phonenumber").value;
            const email = document.getElementById("email").value;
            const city = document.getElementById("city").value;
            const district = document.getElementById("district").value;
            const newOrder = {
                fullname,
                phonenumber,
                email,
                address: city + district,
                cartItem: CartList
            };
            console.log(newOrder);
            if (!fullname || !phonenumber || !email || !city || !district) {
                alert("Vui lòng nhập đầy đủ thông tin");
            }
            else {
                fetch("http://localhost:5000/orderList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newOrder)
                })
                    .then((res) => res.json())
                    .then(() => console.log("order successfully"))
                    .catch((err) => console.log(err));
            }
        });
    }
};
