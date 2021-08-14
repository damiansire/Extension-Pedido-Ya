const config = {
    urlPedido: 'https://www.pedidosya.com.uy/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=150&offset=0&point=-34.960163842831975%2C-54.94175160580445&sortBy=default&withFilters=true',
    headers: {
        'authority': 'www.pedidosya.com.uy',
        'method': 'GET',
        'path': '/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=30&offset=30&point=-34.960163842831975%2C-54.94175160580445&sortBy=default&withFilters=true',
        'scheme': 'https',
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'es-ES,es;q=0.9',
        'cookie': '__Secure-peya.sid=s%3A8e77ea4f-c44d-40c3-85b9-a561960ad0ba.rg2uwB1UwkW0yzq8ZwtNUeXsbFz6oVEl4vSrdoFuRzY; __Secure-peyas.sid=s%3Aa2f14117-0722-45d4-bb70-40027a2b9afe.TjePSABAu42vHlaCEiYHnhEtXWWVsIv8ZLN10RBclWE; _hjid=7b02bb3b-a809-43fc-aa5f-eee54fba37e9; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; perseusRolloutSplit=7; dhhPerseusSessionId=1628902570235.500314316141730940.7y81739wvwn; dhhPerseusGuestId=1628902570235.76747974018306130.vdhj6zi5qe; _gcl_aw=GCL.1628902559.EAIaIQobChMI4d3r86av8gIViYORCh3grAfgEAAYASAAEgLGOPD_BwE; _gcl_au=1.1.793421776.1628902559; _fbp=fb.2.1628902559540.1932296122; AMP_TOKEN=%24NOT_FOUND; _ga=GA1.3.1214972178.1628902561; _gid=GA1.3.1084523346.1628902561; _gac_UA-68934388-1=1.1628902561.EAIaIQobChMI4d3r86av8gIViYORCh3grAfgEAAYASAAEgLGOPD_BwE; _gat_WD2_Tracker_PeYa_Prod=1; _tq_id.TV-81819090-1.49d8=f5ef121c4ef918f1.1628902561.0.1628902574..; dhhPerseusHitId=1628902598059.459130252231785700.cibnoc6e1ys',
        'referer': 'https://www.pedidosya.com.uy/restaurantes?address=Gorlero&city=Punta%20del%20Este&lat=-34.960163842831975&lng=-54.94175160580445',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
    }
}

class Dao {

    static async getRestaurantData() {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(config.urlPedido, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: config.headers,
        });
        const responseJson = await response.json();
        let restaurantResponse = responseJson.list.data;
        let restaurantData = restaurantResponse.map(restaurant => Parsers.ParserRestaurantData(restaurant));
        console.log("Se trajieron ", responseJson.list.count, " restaurantes");
        console.log("El total son ", responseJson.list.total)
        return restaurantData;
    }

}

class Parsers {
    static ParserRestaurantData(restaurant) {
        return {
            'precioPromedio': restaurant?.averagePrice,
            'categorias': restaurant?.categories,
            'descuento': restaurant?.discount,
            'distancia': restaurant?.distance,
            'comida': restaurant?.food,
            'speed': restaurant?.speed,
            'name': restaurant?.name,
            'link': restaurant?.link,
            'logo': restaurant?.logo,
            'deliveryTime': restaurant?.deliveryTime,
            'shippingAmount': restaurant?.shippingAmount,
            'service': restaurant?.service
        }
    }
}

class DrawUi {

    static setAveragePricesInWindows(restaurantData) {
        const allRestaurant = Array.from(document.querySelectorAll("#app > div > div.sc-72orc4-2.bMgRAV > div.sc-72orc4-1.eApoix > div > div.ygg9ap-0.hwDdoS > div.hfm867-0.hPTbWt > a"));
        allRestaurant.map(restaurant => {

            let restaurantName = restaurant.querySelector("#shop_card_result > div > div.sc-1n4iwls-1.efVtfo > div.zw4y2m-0.hVcPDG > div").innerText;

            let averagePrice = restaurantData.find(restaurant => restaurant.name == restaurantName).precioPromedio;

            const priceHtml = '<div class="qmfz43-1 jZSEXo qmfz43-2 brOIjD" style="align-self:center;">' + HtmlGenerator.priceSvg() + '<span color="#7f7304" class="sc-1ox3klc-0 qmfz43-0 jiaCbt qmfz43-2 brOIjD">' + averagePrice + '</span></div>';

            const starsDiv = restaurant.children[0].children[0].children[2];

            starsDiv.insertAdjacentHTML("beforeEnd", priceHtml);
        })
    }

    static renderRestarantsData(restaurantData) {
        //Agrego un nuevo padre
        let divPadreDeLas2Columnas = document.createElement('div');
        divPadreDeLas2Columnas.style.display = "flex";
        divPadreDeLas2Columnas.id = "divPadreDeLas2Columnas";
        let centerColumn = document.getElementsByClassName("hfm867-0 hPTbWt")[0];
        HtmlGenerator.wrap(centerColumn, divPadreDeLas2Columnas)

        //selecciono el nuevo padre
        let newPadre = document.getElementById("divPadreDeLas2Columnas")

        //Inserto una columna para precio promedio
        newPadre.insertAdjacentHTML('beforeend', '<div id="precioPromedioColumn"></div>');
        let restaurantsContainer = document.getElementById("precioPromedioColumn");

        //Ordeno antes de renderizar
        restaurantData = restaurantData.sort((a, b) => { return a.precioPromedio - b.precioPromedio });
        restaurantData.map(restaurant => restaurantsContainer.insertAdjacentHTML("beforeEnd", HtmlGenerator.restaurantHtml(restaurant)))
    }
}

class HtmlGenerator {

    static restaurantHtml(restaurant) {

        return `<a href="/restaurantes/punta-del-este/${restaurant.link}-menu">
        <div stlye="display:flex">
            <div id="shop_card_result" direction="row" class="sc-1lu5p9i-0 sc-5fgc7e-0 sc-1f3rtp4-0 kOXImg" style="width: 350px":>
                <div class="sc-1f3rtp4-4 cvxEpM">
                    <div class="jgqhzl-0 gPWErZ">
                        <div class="sc-1lph711-0 iXtpiX">
                            <picture>
                                <source type="image/webp"
                                    data-srcset="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;webp=1, https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;webp=1&amp;dpi=1.5 1.5x"
                                    srcset="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;webp=1, https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;webp=1&amp;dpi=1.5 1.5x">
                                <img src="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100"
                                    class="sc-163lxpo-0 iTDfAY sc-12miskz-0 sc-1lph711-1 eMfaoX ls-is-cached lazyloaded"
                                    alt="${restaurant.name}"
                                    data-src="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100"
                                    data-srcset="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100, https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;dpi=1.5 1.5x"
                                    srcset="https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100, https://images.deliveryhero.io/image/pedidosya/restaurants/${restaurant.logo}?quality=70&amp;width=100&amp;dpi=1.5 1.5x">
                            </picture>
                        </div>
                    </div>
                    <div class="jgqhzl-1" style="width: 270px;">
                        <div class="sc-19nslam-0 eDvVed">
                            <div class="sc-1iu942c-0 eMrOvF">${restaurant.name}</div>
                        </div>
                        <div class="uaf4if-0 bgjPvX" style="flex-direction:column;">
                        <div>
                            <span class="b6lnjl-0 kLrMvW sc-1rgifkv-0 iHGTdT">${restaurant.deliveryTime}</span>
                            <span> </span>
                            <span>${this.getShippingAmount(restaurant)}</span>
                        </div>
                        <div>
                            <span>${this.starsDiv(restaurant.service)}</span>
                            <span></span>
                            <span>${this.htmlParaPrecioPromedio(restaurant)}</span>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a>`;
    }

    static htmlParaPrecioPromedio(restaurantData) {
        return '<div class="s327yx-1 hKRjCv s327yx-2 kYqztZ">' + this.priceSvg() + '<span color="#7f7304" class="sc-10jqr7t-0 s327yx-0 fjmNsw s327yx-2 kYqztZ">' + restaurantData.precioPromedio + '</span></div>';
    }

    static starsDiv(startsNumber) {
        return '<div class="s327yx-1 kfyDMS s327yx-2 kYqztZ"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#657d02" viewBox="0 0 16 16" style="margin: 4px 2px 4px 0px;"><path d="M5.483 5.186l-4.028.331-.117.016C.499 5.693.192 6.779.874 7.349l3.033 2.534-.909 3.756-.02.11c-.115.836.795 1.473 1.552 1.031L8 12.758l3.47 2.022.1.052c.769.349 1.639-.34 1.433-1.193l-.91-3.756 3.035-2.534.086-.081c.593-.614.218-1.679-.668-1.751l-4.03-.331-1.565-3.565c-.363-.828-1.538-.828-1.901 0L5.483 5.186z"></path></svg><span color="#657d02" class="sc-10jqr7t-0 s327yx-0 klhCxe s327yx-2 kYqztZ">' + startsNumber + '</span></div>';
    }

    static getShippingAmount(restaurantData) {
        return restaurantData.shippingAmount ? `Envio $${restaurantData.shippingAmount}` : 'Envio Gratis';
    }

    static priceSvg() {
        return '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="18px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <path d="M256,0C114.625,0,0,114.625,0,256s114.625,256,256,256c141.406,0,256-114.625,256-256S397.406,0,256,0z M325.812,354.844 c-12.594,14.125-30.78,22.438-54.562,24.938V416h-30.313v-36.031c-39.656-4.062-64.188-27.125-73.656-69.125l46.875-12.219 c4.344,26.406,18.719,39.594,43.125,39.594c11.406,0,19.844-2.812,25.219-8.469s8.062-12.469,8.062-20.469 c0-8.281-2.688-14.563-8.062-18.813c-5.375-4.28-17.344-9.688-35.875-16.25c-16.656-5.78-29.688-11.469-39.063-17.155 c-9.375-5.625-17-13.531-22.844-23.688c-5.844-10.188-8.781-22.063-8.781-35.563c0-17.719,5.25-33.688,15.688-47.875 c10.438-14.156,26.875-22.813,49.313-25.969V96h30.313v27.969c33.875,4.063,55.813,23.219,65.781,57.5l-41.75,17.125 c-8.156-23.5-20.72-35.25-37.781-35.25c-8.563,0-15.438,2.625-20.594,7.875c-5.188,5.25-7.781,11.625-7.781,19.094 c0,7.625,2.5,13.469,7.5,17.563c4.969,4.063,15.688,9.094,32.063,15.125c18,6.563,32.125,12.781,42.344,18.625 c10.25,5.844,18.406,13.938,24.531,24.219c6.094,10.313,9.155,22.345,9.155,36.126C344.719,323.125,338.406,340.75,325.812,354.844 z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>'

    }

    static wrap(toWrap, wrapper) {
        wrapper = wrapper || document.createElement('div');
        toWrap.parentNode.appendChild(wrapper);
        return wrapper.appendChild(toWrap);
    };

}


class ExtencionController {
    static async GetAndDrawAveragePricesInWindows() {
        const restaurantData = await Dao.getRestaurantData();
        await DrawUi.setAveragePricesInWindows(restaurantData)
    }

    static async GetAndDrawColumnWithCheapRestaurant() {
        const restaurantData = await Dao.getRestaurantData();
        DrawUi.renderRestarantsData(restaurantData);
    }

}

setTimeout(() => {
    ExtencionController.GetAndDrawColumnWithCheapRestaurant();
}, 6000)

