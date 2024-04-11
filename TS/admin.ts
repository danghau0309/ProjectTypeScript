interface Product {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
	bestseller: string;
}
const bodyTable = document.getElementById("productList") as HTMLTableElement;
const updateBtn = document.querySelector(".updateProduct") as HTMLButtonElement;

const renderProductList = () => {
	fetch("http://localhost:5000/products")
		.then((res) => res.json())
		.then((products) => {
			products.forEach((item: any) => {
				if (bodyTable !== null) {
					const { title, description, price, id, image } = item;
					bodyTable.innerHTML += ` <tr>
									<td> ${title}</td>
									<td>
										<img src="../public/img/${image}" alt="" class="img-admin" />
									</td>
									<td class="price-admin">${price} $</td>
									<td>${description}</td>
									<td class="action">
										<i class="bx bx-trash" data-delete="${id}"></i>
										<a href="">
											<i class="bx bx-edit-alt" data-edit="${id}"></i>
										</a>
									</td>
								</tr>`;
				}
			});

			const trash: NodeListOf<Element> = document.querySelectorAll(".bx-trash");
			trash.forEach((deleteItem: Element) => {
				deleteItem.addEventListener("click", async () => {
					const id = deleteItem.getAttribute("data-delete");
					await fetch(`http://localhost:5000/products/${id}`, {
						method: "DELETE"
					});
				});
			});

			const edit: NodeListOf<Element> = document.querySelectorAll(".bx-edit-alt");
			edit.forEach((editItem: Element) => {
				editItem.addEventListener("click", async (e: Event) => {
					e.preventDefault();
					const id = editItem.getAttribute("data-edit");
					fetch(`http://localhost:5000/products/${id}`)
						.then((res) => res.json())
						.then((data) => {
							let title = document.getElementById("name") as HTMLInputElement;
							let price = document.getElementById("price") as HTMLInputElement;
							let description = document.getElementById(
								"description"
							) as HTMLInputElement;
							const fileUpload = document.getElementById(
								"fileUpload"
							) as HTMLInputElement;
							title.value = data.title;
							price.value = data.price;
							description.value = data.description;
							updateBtn.addEventListener("click", async (e: Event) => {
								e.preventDefault();
								const updataProduct = {
									title: title.value,
									description: description.value,
									price: price.value,
									image:
										fileUpload.files !== null ? fileUpload.files[0].name : null
								};
								await fetch(`http://localhost:5000/products/${id}`, {
									method: "PATCH",
									headers: {
										"Content-Type": "application/json"
									},
									body: JSON.stringify(updataProduct)
								});
							});
						})
						.catch((err) => console.log(err));
				});
			});
		})
		.catch((err) => console.log(err));
};
const addProductButton = document.querySelector(".addProductBtn") as HTMLButtonElement;
const addProduct = (e: Event) => {
	e.preventDefault();
	const name = (document.getElementById("name") as HTMLInputElement).value;
	const price = (document.getElementById("price") as HTMLInputElement).value;
	const description = (document.getElementById("description") as HTMLInputElement).value;
	const fileUpload = document.querySelector("#fileUpload") as HTMLInputElement;
	const files = fileUpload.files;
	if (!name || !price || !description) {
		alert("Vui lòng nhập thông tin đầy đủ");
	} else if (isNaN(Number(price))) {
		alert("Vui lòng nhập giá là một số nguyên");
	} else {
		const newProducts = {
			title: name,
			description,
			price,
			raiting: 3.23,
			image: files !== null ? files[0].name : "Lỗi ảnh",
			bestseller: 0
		};
		console.log(newProducts);
		fetch("http://localhost:5000/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newProducts)
		})
			.then((res) => res.json())
			.then(() => {
				alert("added products successfully");
			})
			.catch((err) => console.log(err));
	}
};
export { renderProductList, addProductButton, addProduct };
