interface Cart {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	bestseller: number;
	quantity: number;
}
export const handleCart = () => {
	const CartList = JSON.parse(localStorage.getItem("cart") || "[]");
	const tbodyCart = document.getElementById("cartList") as HTMLTableElement;
	if (tbodyCart !== null) {
		tbodyCart.innerHTML = "";
	}
	let htmlCart = "";
	CartList.forEach((cart: Cart) => {
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
	const deleteList: NodeListOf<Element> = document.querySelectorAll(".bxs-x-circle");
	deleteList.forEach((deleteItem: any) => {
		deleteItem.onclick = () => {
			const idOfProduct = deleteItem.dataset.id;
			const indexLocation = CartList.findIndex((i: any) => i.id === idOfProduct);
			CartList.splice(indexLocation, 1);
			localStorage.setItem("cart", JSON.stringify(CartList));
			window.location.reload();
		};
	});
	const increaseBtn = document.querySelectorAll(".increase");
	const decreaseBtn = document.querySelectorAll(".decrease");
	increaseBtn.forEach((increase: any) => {
		increase.onclick = () => {
			const idOfProduct = increase.dataset.id;
			const findAndUpdateQuantity = CartList.find((i: any) => i.id === idOfProduct);
			findAndUpdateQuantity.quantity += 1;
			localStorage.setItem("cart", JSON.stringify(CartList));
			window.location.reload();
		};
	});
	decreaseBtn.forEach((decrease: any) => {
		decrease.onclick = () => {
			const idOfProduct = decrease.dataset.id;
			const findAndUpdateQuantity = CartList.find((i: any) => i.id === idOfProduct);
			const indexLocation = CartList.findIndex((i: any) => i.id === idOfProduct);
			if (findAndUpdateQuantity.quantity === 1) {
				CartList.splice(indexLocation, 1);
				localStorage.setItem("cart", JSON.stringify(CartList));
				window.location.reload();
			} else {
				findAndUpdateQuantity.quantity -= 1;
				localStorage.setItem("cart", JSON.stringify(CartList));
				window.location.reload();
			}
		};
	});
	const sumProductsOfCartList = CartList.reduce((sum: number, index: any) => {
		return (sum += index.price * index.quantity);
	}, 0);
	const totalProductsOfCartList = document.getElementById("totalAmount") as HTMLSpanElement;
	if (totalProductsOfCartList !== null) {
		totalProductsOfCartList.innerHTML = sumProductsOfCartList + " $ ";
	}
	const shipping: number = 35;
	const totalPrice = document.getElementById("totalPrice") as HTMLSpanElement;
	const total = sumProductsOfCartList + shipping;
	if (totalPrice !== null) {
		totalPrice.innerHTML = total + " $";
	}
	const totalFooter = document.querySelector(".total") as HTMLSpanElement;
	if (totalFooter !== null) {
		totalFooter.innerHTML = total + " $";
	}
	const productList = document.querySelector(".view_list_wrapper") as HTMLDivElement;
	if (productList !== null) {
		productList.innerHTML = "";

		CartList.forEach((list: any) => {
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
	const btn_payment = document.querySelector(".btn_payment") as HTMLButtonElement;
	if (btn_payment !== null) {
		btn_payment.addEventListener("click", () => {
			const fullname = (document.getElementById("fullname") as HTMLInputElement).value;
			const phonenumber = (document.getElementById("phonenumber") as HTMLInputElement).value;
			const email = (document.getElementById("email") as HTMLInputElement).value;
			const city = (document.getElementById("city") as HTMLInputElement).value;
			const district = (document.getElementById("district") as HTMLInputElement).value;
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
			} else {
				fetch("http://localhost:5000/orderList", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newOrder)
				})
					.then((res: Response) => res.json())
					.then(() => console.log("order successfully"))
					.catch((err: any) => console.log(err));
			}
		});
	}
};
