export const apiDistrict = async () => {
    const res = await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
    const data = await res.json();
    const city = document.getElementById("city");
    const district = document.getElementById("district");
    data.forEach((cityList) => {
        const { Name } = cityList;
        if (city !== null && district !== null) {
            city.innerHTML += `<option value="${Name}">${Name}</option>`;
            cityList.Districts.forEach((inforDistrict) => {
                const { Name } = inforDistrict;
                district.innerHTML += `<option value="${Name}">${Name}</option>`;
            });
        }
    });
};
