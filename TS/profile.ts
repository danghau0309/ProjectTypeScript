interface User {
    id: string;
    username: string;
    image: string;
}
export const profile = async (): Promise<void> => {
    const getStorage = localStorage.getItem("LoggedInUser");
    const username = JSON.parse(getStorage || "false");
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    const user = data.find((user: User) => user.username === username);
    let fullname = document.getElementById("fullname") as HTMLInputElement;
    let email = document.getElementById("email") as HTMLInputElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let password = document.getElementById("password-input") as HTMLInputElement;
    let usernameInput = document.getElementById("username") as HTMLInputElement;
    let userImage = document.getElementById("userImage") as HTMLImageElement;
    if (fullname !== null) {
        fullname.value = user.fullname;
        email.value = user.email;
        address.value = user.address;
        password.value = user.password;
        usernameInput.value = user.username;
        userImage.src = "../public/img/" + user.image;
    }
    const updatebtn = document.getElementById("updateProfile") as HTMLButtonElement;
    if (updatebtn !== null) {
        updatebtn.onclick = async (e: Event): Promise<void> => {
            e.preventDefault();
            let email = (document.getElementById("email") as HTMLInputElement).value;
            let address = (document.getElementById("address") as HTMLInputElement).value;
            let fullname = (document.getElementById("fullname") as HTMLInputElement).value;
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
