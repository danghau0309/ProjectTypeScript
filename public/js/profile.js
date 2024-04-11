export const profile = async () => {
    const getStorage = localStorage.getItem("LoggedInUser");
    const username = JSON.parse(getStorage || "false");
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    const user = data.find((user) => user.username === username);
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let password = document.getElementById("password-input");
    let usernameInput = document.getElementById("username");
    let userImage = document.getElementById("userImage");
    if (fullname !== null) {
        fullname.value = user.fullname;
        email.value = user.email;
        address.value = user.address;
        password.value = user.password;
        usernameInput.value = user.username;
        userImage.src = "../public/img/" + user.image;
    }
    const updatebtn = document.getElementById("updateProfile");
    if (updatebtn !== null) {
        updatebtn.onclick = async (e) => {
            e.preventDefault();
            let email = document.getElementById("email").value;
            let address = document.getElementById("address").value;
            let fullname = document.getElementById("fullname").value;
            const newUpdate = {
                email,
                address,
                fullname,
            };
            const res = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUpdate),
            });
        };
    }
};
