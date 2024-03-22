interface Product {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
}
const addToCartButton = document.querySelector(".addToCartButton") as HTMLButtonElement;

export { addToCartButton };
