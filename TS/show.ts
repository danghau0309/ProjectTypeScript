export interface Product {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
	quantity: number;
}
const renderDataToHtml = async () => {
	try {
		const boxContainer = document.querySelector(".box-container") as HTMLDivElement;
		if (boxContainer !== null) {
			const res = await fetch("http://localhost:5000/products");
			const data: Product[] = await res.json();
			boxContainer.innerHTML = "";
			data.forEach(({ title, description, price, image, id }: Product) => {
				boxContainer.innerHTML += `
                <div class="box">
                    <div class="box-image">
					<a href="detail.html?productId=${id}">
                        <img src="../public/img/${image}" alt="" /></a>
                    </div>
                    <span class="price text">Giá: ${price}$</span>
                    <span class="name">Tên sản phẩm: ${title}</span>
                    <button id="btn" data-value='${id}'>Mua ngay</button>
                </div>`;
			});
			const boxBestseller = document.getElementById("bestseller");
			const bestseller = data.filter((item: any) => item.bestseller == 1);
			if (boxBestseller !== null) {
				boxBestseller.innerHTML = "";
			}
			bestseller.forEach(({ title, description, price, image, id }: Product) => {
				if (boxBestseller !== null) {
					boxBestseller.innerHTML += `<div class="box">
								<span class="bestSelling"><i class="bx bx-purchase-tag-alt"></i> Bán chạy</span>
								<div class="box-image">
								<a href="detail.html?productId=${id}"><img src="../public/img/${image}" alt=""/></a>
								</div>
								<span class="price text">Giá : ${price} $</span>
								<a href="detail.html?productId=${id}">
								<span class="name text">Tên sản phẩm : ${title}</span>
								</a>
								<button id="btn" data-value='${id}'>Mua ngay</button>
								</div>`;
					const btn: NodeListOf<Element> = document.querySelectorAll("#btn");
					btn.forEach((el: any) => {
						el.onclick = () => {
							alert("Đã Thêm vào giỏ hàng");
						};
					});
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export { renderDataToHtml };
