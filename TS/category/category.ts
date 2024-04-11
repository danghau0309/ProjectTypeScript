interface Categories {
	category_id: number;
	category_name: string;
}
interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	bestseller: number;
	quantity: number;
	raiting: number;
	category_id: number;
}
export const handleCate = async () => {
	const res = await fetch("http://localhost:5000/category");
	const data = await res.json();
	const res2 = await fetch("http://localhost:5000/products");
	const data2 = await res2.json();
	const tabCategories = document.querySelector(".tab_categories") as HTMLDivElement;
	if (tabCategories !== null) {
		const tabAll = "Tất cả tai nghe";
		const categoriesHTML = [
			`<a href="pageProduct.html" class="item_tab">${tabAll}</a>`,
			...data.map(
				({ category_name, category_id }: Categories) =>
					`<a href="?category_id=${category_id}" class="item_tab">${category_name}</a>`
			)
		];
		tabCategories.innerHTML = categoriesHTML.join("");
	}

	const url_id = new URLSearchParams(window.location.search);
	const idOfCategory = url_id.get("category_id");
	if (idOfCategory) {
		const list = data2.filter((i: Product) => i.category_id.toString() === idOfCategory);
		const boxContainer = document.querySelector(".box-container") as HTMLDivElement;
		boxContainer.innerHTML = "";
		list.forEach(({ title, description, price, raiting, image, id }: Product) => {
			boxContainer.innerHTML += `
                                <div class="box">
                                <span class="bestSelling"><i class="bx bx-purchase-tag-alt"></i> Bán chạy</span>
                                <div class="box-image">
                                <a href="detail.html?productId=${id}"><img src="../public/img/${image}" alt=""/></a>
                                </div>
                                <span class="price text">Giá : ${price} $</span>
                                <a href="detail.html?productId=${id}">
                                <span class="name text">Tên sản phẩm : ${title}</span>
                                </a>
                                <button id="btn" data-value='${id}'>Mua ngay</button>
                                </div>
                                    `;
		});
	} else {
		console.log("No category");
	}
	const url_name = new URLSearchParams(window.location.search);
	const highToLowId = url_name.get("high_to_low");
	const lowToHighId = url_name.get("low_to_high");
	if (highToLowId) {
		const boxContainer = document.querySelector(".box-container") as HTMLDivElement;
		boxContainer.innerHTML = "";
		const sortHighToLowPrice = data2.sort((a: any, b: any) => b.price - a.price);
		sortHighToLowPrice.forEach(({ title, price, image, id }: Product) => {
			boxContainer.innerHTML += `
						<div class="box">
						<span class="bestSelling"><i class="bx bx-purchase-tag-alt"></i> Bán chạy</span>
						<div class="box-image">
						<a href="detail.html?productId=${id}"><img src="../public/img/${image}" alt=""/></a>
						</div>
						<span class="price text">Giá : ${price} $</span>
						<a href="detail.html?productId=${id}">
						<span class="name text">Tên sản phẩm : ${title}</span>
						</a>
						<button id="btn" data-value='${id}'>Mua ngay</button>
						</div>
							`;
		});
	} else if (lowToHighId) {
		const boxContainer = document.querySelector(".box-container") as HTMLDivElement;
		boxContainer.innerHTML = "";
		const sortLowToHighPrice = data2.sort((a: any, b: any) => a.price - b.price);
		sortLowToHighPrice.forEach(({ title, price, image, id }: Product) => {
			boxContainer.innerHTML += `
						<div class="box">
						<span class="bestSelling"><i class="bx bx-purchase-tag-alt"></i> Bán chạy</span>
						<div class="box-image">
						<a href="detail.html?productId=${id}"><img src="../public/img/${image}" alt=""/></a>
						</div>
						<span class="price text">Giá : ${price} $</span>
						<a href="detail.html?productId=${id}">
						<span class="name text">Tên sản phẩm : ${title}</span>
						</a>
						<button id="btn" data-value='${id}'>Mua ngay</button>
						</div>
							`;
		});
	} else {
		console.log("Chưa chọn sắp xếp");
	}
};
