export const header = () => {
    const navbar = document.getElementById("navbar");
    const navbarList = [
        {
            name: "Trang chủ",
            link: "index.html"
        },
        {
            name: "Sản phẩm",
            link: "pageProduct.html"
        },
        {
            name: "Tin tức",
            link: "#"
        }
    ];
    if (navbar !== null) {
        navbar.innerHTML = "";
        navbarList.forEach(({ name, link }) => {
            navbar.innerHTML += ` <li><a href="${link}">${name}</a></li>`;
        });
    }
};
