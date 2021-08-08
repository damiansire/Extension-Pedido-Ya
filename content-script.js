const svg$ = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <path d="M256,0C114.625,0,0,114.625,0,256s114.625,256,256,256c141.406,0,256-114.625,256-256S397.406,0,256,0z M325.812,354.844 c-12.594,14.125-30.78,22.438-54.562,24.938V416h-30.313v-36.031c-39.656-4.062-64.188-27.125-73.656-69.125l46.875-12.219 c4.344,26.406,18.719,39.594,43.125,39.594c11.406,0,19.844-2.812,25.219-8.469s8.062-12.469,8.062-20.469 c0-8.281-2.688-14.563-8.062-18.813c-5.375-4.28-17.344-9.688-35.875-16.25c-16.656-5.78-29.688-11.469-39.063-17.155 c-9.375-5.625-17-13.531-22.844-23.688c-5.844-10.188-8.781-22.063-8.781-35.563c0-17.719,5.25-33.688,15.688-47.875 c10.438-14.156,26.875-22.813,49.313-25.969V96h30.313v27.969c33.875,4.063,55.813,23.219,65.781,57.5l-41.75,17.125 c-8.156-23.5-20.72-35.25-37.781-35.25c-8.563,0-15.438,2.625-20.594,7.875c-5.188,5.25-7.781,11.625-7.781,19.094 c0,7.625,2.5,13.469,7.5,17.563c4.969,4.063,15.688,9.094,32.063,15.125c18,6.563,32.125,12.781,42.344,18.625 c10.25,5.844,18.406,13.938,24.531,24.219c6.094,10.313,9.155,22.345,9.155,36.126C344.719,323.125,338.406,340.75,325.812,354.844 z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>'

const setAveragePricesInWindows = (restaurantData) => {
    debugger;
    const allRestaurant = Array.from(document.querySelectorAll("#app > div > div.b9s0jv-2.kbuHy > div.b9s0jv-1.dyTnnA > div > div.v2k37k-0.JjLJL > div.sc-60supj-0.iRsYvI > a"));

    allRestaurant.map(restaurant => {

        let restaurantName = restaurant.querySelector(".sc-1iu942c-0").innerText;

        let averagePrice = restaurantData.find(restaurant => restaurant.name == restaurantName).precioPromedio;

        const priceHtml = '<div class="s327yx-1 hKRjCv s327yx-2 kYqztZ">' + svg$ + '<span color="#7f7304" class="sc-10jqr7t-0 s327yx-0 fjmNsw s327yx-2 kYqztZ">' + averagePrice + '</span></div>';

        const starsDiv = restaurant.children[0].children[0].children[2];

        starsDiv.insertAdjacentHTML("beforeEnd", priceHtml);
    })

}




const urlPedido = 'https://www.pedidosya.com.uy/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=150&offset=0&point=-34.965611%2C-54.94522629999999&sortBy=default&withFilters=true'

const headers = {
    'authority': 'www.pedidosya.com.uy',
    'method': 'GET',
    'path': '/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=30&offset=0&point=-34.965611%2C-54.94522629999999&sortBy=default&withFilters=true',
    'scheme': 'https',
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'es-ES,es;q=0.9',
    'cache-control': 'no-cache',
    'cookie': '__Secure-peya.sid=s%3A4a3a9385-f994-4355-bcf5-b89061e9af7a.qvB3ZQJLc%2B1sOom2q3yN9FdPq3HUttErS1NzJesTUok; __Secure-peyas.sid=s%3A92151088-34cc-4d41-a3c1-8d1ae6dee1db.7ErPOQTpu9V7RFfZy47r9V8r%2FN%2Be4Pri0EHQf%2FfFE3o; _hjid=79862cf4-f487-4ea2-a805-a66ad94305ca; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; perseusRolloutSplit=9; dhhPerseusSessionId=1628390090120.180871133931718620.myw76ibott; dhhPerseusGuestId=1628390090120.888820461263497100.xrpad53r41l; _gcl_au=1.1.808552409.1628390079; AMP_TOKEN=%24NOT_FOUND; _ga=GA1.3.1434698837.1628390081; _gid=GA1.3.1243054182.1628390081; _tq_id.TV-81819090-1.49d8=f1aca2305ab7415e.1628390081.0.1628390442..; _gat_WD2_Tracker_PeYa_Prod=1; dhhPerseusHitId=1628390762842.909622065955232500.u0borasfuj',
    'pragma': 'no-cache',
    'referer': 'https://www.pedidosya.com.uy/restaurantes?address=Comodoro%20Gorlero%20188&areaId=14399&areaName=Pen%C3%ADnsula&city=Punta%20del%20Este&lat=-34.965611&lng=-54.94522629999999',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
}


const ParserRestaurantData = (restaurant) => {
    return {
        'precioPromedio': restaurant?.averagePrice,
        'categorias': restaurant?.categories,
        'descuento': restaurant?.discount,
        'distancia': restaurant?.distance,
        'comida': restaurant?.food,
        'speed': restaurant?.speed,
        'name': restaurant?.name,
    }
}

async function getRestaurantData() {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(urlPedido, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: headers,
    });
    const responseJson = await response.json();
    let restaurantResponse = responseJson.list.data;
    restaurantData = restaurantResponse.map(restaurant => ParserRestaurantData(restaurant));
    console.log("Se trajieron ", responseJson.list.count, " restaurantes");
    console.log("El total son ", responseJson.list.total)
    debugger
    return restaurantData;
}

const DrawResult = async () => {
    const restaurantData = await getRestaurantData();
    await setAveragePricesInWindows(restaurantData)

}

setTimeout(() => {
    alert("estamos empezando");
    DrawResult();
}, 6000)
