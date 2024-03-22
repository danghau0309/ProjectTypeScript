var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const renderDataToHtml = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxContainer = document.querySelector(".box-container");
        if (boxContainer !== null) {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
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
    }
    catch (err) {
        console.log(err);
    }
});
export { renderDataToHtml };
