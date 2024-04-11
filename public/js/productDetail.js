const showDetails = async () => {
    try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        const boxDetail = document.querySelector(".boxDetail");
        const url = new URLSearchParams(window.location.search);
        const urlId = url.get("productId");
        const dataDetail = data.find((item) => item.id === urlId);
        if (dataDetail) {
            const { title, description, price, rating, image } = dataDetail;
            let dataDetails = "";
            dataDetails += `
                <div class="box-detail">
                <div class="detail-col1"><img src="../public/img/${image}" alt="" /></div>
                <div class="detail-col2">
                    <h3>Thông tin Sản phẩm</h3>
                    <span>Tên sản phẩm  : ${title} </span>
                    <span>Giá sản phẩm : ${price}  </span>
                    <span>Đánh giá sản phẩm : ${rating}  Sao </span>
                    <span>Mô tả  : ${description}</span>
                    <input type="number" class="quantity" min="1" max="20" value="1" id="valueInput"/>
                    <button id="addCart">Mua ngay</button>
                </div>
                </div> `;
            if (boxDetail !== null) {
                boxDetail.innerHTML = dataDetails;
            }
        }
        const sendCommentBtn = document.getElementById("sendComment");
        if (sendCommentBtn !== null) {
            sendCommentBtn.addEventListener("click", async () => {
                const commentsInput = document.getElementById("inforComment").value;
                const idOfUrl = new URLSearchParams(window.location.search);
                const idOfProduct = idOfUrl.get("productId");
                const res = await fetch(`http://localhost:5000/products/${idOfProduct}`);
                const productList = await res.json();
                const username = localStorage.getItem("LoggedInUser");
                const newComments = {
                    username: username,
                    content: commentsInput
                };
                productList.comments.push(newComments);
                await fetch(`http://localhost:5000/products/${idOfProduct}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productList)
                });
            });
        }
        const idUrl = new URLSearchParams(window.location.search);
        const idOfProduct = idUrl.get("productId");
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => {
            const commentList = data.find((item) => item.id === idOfProduct);
            const boxComments = document.getElementById("listComments");
            if (boxComments !== null) {
                const arrComments = commentList.comments;
                arrComments.forEach(({ username, content }) => {
                    const convertUser = JSON.parse(username);
                    boxComments.innerHTML += `<div class="boxComment">
											<span><i class="bx bxs-user-circle"></i> ${convertUser}
												<p id="time"><i class="bx bx-time-five"></i>  </p>
											</span><br />
											<span id="contentOfUser">${content}</span>
											<hr class="lineComment" />
										</div>`;
                });
            }
        })
            .catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
};
export { showDetails };
