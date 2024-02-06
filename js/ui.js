import { arr } from "./db.js"
let cart_place = document.querySelector('.menu .menu-list')
let cart_ids = []
let total_price = document.querySelector(".total_price")
let in_pocket = document.querySelector(".in_pocket")
let slots = document.querySelector('.slots')


export function reloadSlots(arr, place) {
    place.innerHTML = ''
    for (let item of arr) {
        let slot = document.createElement('div')
        let photo = document.createElement('div')
        let img = document.createElement('img')
        let descr = document.createElement('div')
        let slotName = document.createElement('h3')
        let p = document.createElement('p')
        let icons = document.createElement('div')
        let price = document.createElement('div')
        let priceImg = document.createElement('img')
        let star = document.createElement('div')
        let starImg = document.createElement('img')
        let pack = document.createElement('div')
        let packImg = document.createElement('img')
        let button = document.createElement('button')
        // b

        slot.classList.add('slot')
        photo.classList.add('photo')
        descr.classList.add('descr')
        slotName.classList.add('slot-name')
        p.classList.add('descr-p')
        icons.classList.add('icons')
        button.classList.add('to-star')
        // if (item.id) {
            
        // }

        place.append(slot)
        slot.append(photo)
        photo.append(img)
        img.src = item.image
        slot.append(descr)
        descr.append(slotName, p, icons, button)
        slotName.innerHTML = item.category
        p.innerHTML = item.description
        icons.append(price, star, pack)
        price.append(priceImg, item.price)
        priceImg.src = './img/dollar.svg'
        star.append(starImg, item.rating.rate)
        starImg.src = './img/star.svg'
        pack.append(packImg, item.rating.count)
        packImg.src = './img/box.svg'
        button.innerHTML = 'В избранное'


        button.onclick = () => {
            if(cart_ids.includes(item.id)) {
                cart_ids = cart_ids.filter(el => el.block !== item.block);
                button.innerHTML = 'В избранное'
                button.classList.remove('to-star_active')
                cart_ids.splice(cart_ids.indexOf(item.id),1)
                console.log("clock");
            } else {
                button.innerHTML = 'Добавлено'
                button.classList.add('to-star_active')
                cart_ids.push(item.id)
            }
            reloadBusket(cart_ids, cart_place)
            
            in_pocket.innerHTML = `В корзине: ${cart_ids.length} товар`;

        }
    }
}

export function reloadBusket(ids, place) {
    place.innerHTML = ""
    
    for(let id of ids) {
        const item = arr.find(el => el.id === id)
        let product = document.createElement('div')
        let productView = document.createElement('div')
        let productTools = document.createElement('div')
        let prdPhoto = document.createElement('div')
        let prdImg = document.createElement('img')
        let prdName = document.createElement('h3')
        let counter = document.createElement('div')
        let minus = document.createElement('span')
        let count = document.createElement('span')
        let plus = document.createElement('span')
        let prdPrice = document.createElement('h3')
        let delete_btn = document.createElement("button")
        // b
        product.classList.add('product')
        productView.classList.add('product-view')
        productTools.classList.add('product-tools')
        // product view
        prdPhoto.classList.add('product-photo')
        prdImg.classList.add('product-img')
        prdName.classList.add('product-name')
        
        // Product Tools
        counter.classList.add('counter')
        delete_btn.classList.add("del_btn")
        minus.id = 'minus'
        count.id = 'count'
        plus.id = 'plus'

        prdPrice.id = 'product-price'
        prdImg.src = item.image
        prdImg.alt = 'product photo'
        prdName.innerHTML = item.category
        minus.innerHTML = "&minus;"
        count.innerHTML = "1"
        plus.innerHTML = "&plus;"
        delete_btn.innerHTML = "Delete"
        prdPrice.innerHTML = "$" + item.price


        // c
        place.append(product)
        product.append(productView, productTools)
        productView.append(prdPhoto, prdName)
        prdPhoto.append(prdImg)
        productTools.append(counter, prdPrice, delete_btn)
        counter.append(minus, count, plus)

        // let add_btn = document.querySelector(".to-star")
        // console.log(add_btn);
        delete_btn.onclick = () =>{
            if(cart_ids.includes(item.id)) {  
                cart_ids.splice(cart_ids.indexOf(ids), 1)
                product.remove()                
            } else {
                // button.innerHTML = 'Добавлено'
                // button.classList.add('to-star_active')
                cart_ids.push(item.id)
            }
            reloadSlots(arr, slots)
            reloadBusket(cart_ids, cart_place)
        }
        let value = 1;
        let const_value = item.price;
        
        plus.onclick = () => {
            value++;
            count.innerHTML = value;
            let result = const_value * value;
            prdPrice.innerHTML = '$' + result.toFixed(2);
        }
        minus.onclick = () => {
            if (value > 1) {
                value--;
                count.innerHTML = value;
                let result = const_value * value;
                prdPrice.innerHTML = '$' + result.toFixed(2);
            }
            
        }
        total_price = 0


    }
}