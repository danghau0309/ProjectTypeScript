export const orderList = () => {
    const tableBody = document.getElementById("table_body");
    if (tableBody !== null) {
        tableBody.innerHTML = "";
        fetch("http://localhost:5000/orderList")
            .then((res) => res.json())
            .then((data) => {
            data.forEach(({ fullname, address, email, phonenumber, id }) => {
                tableBody.innerHTML += ` <tr>
                                    <td>${fullname}</td>
                                  <td>${phonenumber}</td>
                                  <td><span id="text_email">${email}</span></td>
                                 <td>${address}</td>
                                 <td><span class="order_status"> Đang chờ </span></td>
                                  <td><span id="text"><a href="orderdetail.html?order_id=${id}">xem chi tiết</a></span>
                                 </td>
                                 <td><button class="order_confirm">Xác nhận </button></td>
                             </tr>`;
            });
            const confirmBtn = document.querySelectorAll(".order_confirm");
            confirmBtn.forEach((itemBtn) => {
                itemBtn.onclick = () => { };
            });
        })
            .catch((err) => console.error(err));
    }
};
export const orderDetail = async () => {
    const res = await fetch("http://localhost:5000/orderList");
    const data = await res.json();
    const url_id = new URLSearchParams(window.location.search);
    const idOfProduct = url_id.get("order_id");
    const order_infor = data.find((item) => item.id === idOfProduct);
    if (order_infor !== undefined) {
        const productList = order_infor.cartItem;
        const orderList = document.getElementById("container_order");
        orderList.innerHTML = "";
        productList.forEach(({ image, price, quantity, title }) => {
            orderList.innerHTML += `<div class="orderList">
                                <img
                                    src="../public/img/${image}"
                                    alt="Product Image"
                                    width="100px"
                                    height="100px"
                                />
                                <span id="text">${title}</span>
                                <span>Số lượng: ${quantity} </span>
                                <span>Giá: ${price}$</span>
                            </div>`;
        });
    }
};
