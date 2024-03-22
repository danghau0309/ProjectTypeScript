const renderProductList = () => {
    const bodyTable = document.getElementById("productList");
    fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((products) => {
        products.forEach((item) => {
            const { title, description, price, id, image } = item;
            bodyTable.innerHTML += ` <tr>
                                <td> ${title}</td>
                                <td>
                                    <img src="../public/img/${image}" alt="" class="img-admin" />
                                </td>
                                <td class="price-admin">${price} $</td>
                                <td>${description}</td>
                                <td class="action">
                                    <button class="bx bx-trash" id="test" " data-delete="${id}""></button>
                                    <a href="">
                                        <i class="bx bx-edit-alt"></i>
                                    </a>
                                </td>
                            </tr>`;
        });
        const trashBtn = document.querySelectorAll(".bx-trash");
        trashBtn.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", () => {
                const deleteItem = deleteBtn.getAttribute("data-delete");
                console.log(deleteItem);
            });
        });
    })
        .catch((err) => console.log(err));
};
export { renderProductList };
