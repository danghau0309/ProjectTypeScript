export const changePassword = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    const getStorage = JSON.parse(localStorage.getItem("LoggedInUser") || "false");
    const user = data.find((user) => user.username === getStorage);
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const enterPassword = document.getElementById("enterPassword").value;
    if (!oldPassword || !newPassword || !enterPassword) {
        alert("Please fill in all fields");
    }
    else if (oldPassword === user.password && newPassword === enterPassword) {
        const changePassword = {
            id: user.id,
            username: user.username,
            password: newPassword,
        };
        await fetch(`http://localhost:5000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(changePassword),
        });
        alert("Password changed successfully!");
    }
    else {
        alert("Old password is incorrect or new password is not match!");
    }
};
const changePasswordBtn = document.getElementById("changeBtn");
changePasswordBtn?.addEventListener("click", changePassword);
