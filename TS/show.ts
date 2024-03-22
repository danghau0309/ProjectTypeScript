export interface Product {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
}
const renderDataToHtml = async () => {
	try {
		const boxContainer = document.querySelector(".box-container") as HTMLDivElement;
		if (boxContainer !== null) {
			const res = await fetch("http://localhost:3000/products");
			const data: Product[] = await res.json();
			boxContainer.innerHTML = "";
			data.forEach((product) => {
				boxContainer.innerHTML += `
                <div class="box">
                    <div class="box-image">
                        <img src="../public/img/${product.image}" alt="" />
                    </div>
                    <span class="price text">Giá: ${product.price}$</span>
                    <span class="name">Tên sản phẩm: ${product.title}</span>
                    <button id="btn" data-value='${product.id}'>Mua ngay</button>
                </div>
            `;
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export { renderDataToHtml };
