import { arr } from "./db.js"
import { reloadBusket, reloadSlots } from "./ui.js"

// a

let showFive = document.querySelector('#show_five')
let showFull = document.querySelector('#show_full')
let openMenu = document.querySelector('#open_menu')
let menu = document.querySelector('.menu')

showFive.onclick = () => {
    let sliced = arr.slice(0,5)
    reloadSlots(sliced, slots)
}
showFull.onclick = () => {
    reloadSlots(arr, slots)
}
openMenu.onclick = () => {

    menu.classList.toggle('open')
}

let slots = document.querySelector('.slots')

reloadSlots(arr, slots)
// reloadBusket([1,2,3], cart_place)


