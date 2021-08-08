setTimeout(() => {
    let buttonsHeaderElement = document.getElementById("app").children[0].children[0].children[0].children[1];
    document.querySelector("#app > div > div:nth-child(1) > header > div.w46aa6-0.hMjvVl > button").remove();
    const htmlButton = '<div><button class="sc-14e5iu5-0 cQoIdY">Promedio</button></div>';
    buttonsHeaderElement.insertAdjacentHTML("beforeEnd", htmlButton);
}, 6000)