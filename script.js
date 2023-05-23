const body = document.querySelector('body')
const addButton = document.getElementById('add-button')
const totalProducts = document.getElementById('total-products')
const totalValue = document.getElementById('total-value')
const totalBuyValue = document.getElementById('total-buy-value')
const mContSettings = document.getElementById('main-container-settings')
const product = document.getElementById('product')
const closeButtonSett = document.getElementById('close-button-settings')
const input = document.getElementById('i-products')
input.focus()
const confirmButton = document.getElementById('confirm-button')
const productList = document.getElementById('products-list')
const quantity = document.getElementById('i-quantity')
const price = document.getElementById('i-price')
const products = []
const listBuy = []
let totalBuy = null

/* function res() {
    console.log(listBuy)
} */

document.addEventListener('keydown', (even) => {
    if (even.code == 'Enter' || even.code == 'NumpadEnter') {
        addButton.focus()
    } else if (even.code == 'Escape') {
        mContSettings.style.display = 'none'
    }
})

confirmButton.addEventListener('click', () => {
    const quantity = document.getElementById('i-quantity')
    const price = document.getElementById('i-price')
    const valueQuantity = Number(quantity.value)
    const valuePrice = Number(price.value)
    const valueAttQ = quantity.getAttribute('readonly', 'readonly')

    if (quantity.value.length != 0 && price.value.length != 0 && !(valueQuantity <= 0) && !(valuePrice <= 0)) {
        if (valueAttQ == 'readonly') {
            quantity.removeAttribute('readonly')
            price.removeAttribute('readonly')
            confirmButton.style.display = 'block'
            confirmButton.innerText = 'New value'
            confirmButton.style.backgroundColor = '#3F9654'
            quantity.setAttribute('class', 'outline-block')
            price.setAttribute('class', 'outline-block')
            quantity.style.color = 'black'
            quantity.style.backgroundColor = 'white'
            quantity.style.outline = 'default'
            price.style.color = 'black'
            price.style.backgroundColor = 'white'
            price.style.outline = 'default'
            console.log('aqui')
        } else {
            function checkNameListConfirm() {
                for (let pos in listBuy) {
                    if (listBuy[pos].name == product.innerText.toLowerCase().replaceAll(' ', '')) {
                        listBuy[pos].quantity = valueQuantity
                        listBuy[pos].price = valuePrice
                        mContSettings.style.display = 'none'
                        return true
                    }
                }
                listBuy.push({
                    name: product.innerText.toLowerCase().replaceAll(' ', ''),
                    quantity: valueQuantity,
                    price: valuePrice,
                })
                console.log(listBuy)
                console.log(product.innerText.toLowerCase().replaceAll(' ', ''))
                mContSettings.style.display = 'none'

                function checkIfBuy() {
                    for (let pos in listBuy) {
                        if (listBuy[pos].name == product.innerText.toLowerCase().replaceAll(' ', '')) {
                            let classP = ''
                            classP = `#${listBuy[pos].name}`
                            console.log(classP)
                            let divBack = productList.querySelector(classP)
                            divBack.style.backgroundColor = '#9ad5a8'
                        }
                    }
                }

                checkIfBuy()

            }

            checkNameListConfirm()

        }
    } else {
        alert('Insira um valor válido!')
        quantity.focus()
    }

    function addListBuy() {
        let total = 0
        for (let pos in listBuy) {
            total += listBuy[pos].quantity * listBuy[pos].price
        }
        return total
    }

    totalBuy = listBuy.length
    totalBuyValue.innerText = totalBuy
    totalValue.innerText = `R$ ${addListBuy()}`

}) /* Verificar a questão da propagação do addEventListener */

addButton.addEventListener('click', () => {
    const input = document.querySelector('input')
    if (input.value.length == 0 || input.value >= 0 || input.value < 0) {
        alert('Insira um valor válido!')
        input.focus()
    } else {
        const inoutValue = input.value
        const div = document.createElement('div')
        const p = document.createElement('p')
        const buy = document.createElement('button')
        const x = document.createElement('button')
        products.push(inoutValue)
        totalProducts.innerText = products.length
        div.classList.add('product-border')
        div.style.backgroundColor = '#F4E9FF'
        buy.style.fontSize = '1.6rem'
        buy.style.padding = '.3rem 2rem'
        buy.style.color = 'white'
        buy.style.backgroundColor = '#3F9654'
        x.style.fontSize = '1.6rem'
        x.style.padding = '.3rem .6rem'
        x.style.color = 'white'
        x.style.backgroundColor = '#E33D4B'
        div.setAttribute('id', inoutValue.toLowerCase().replaceAll(' ', ''))
        p.setAttribute('class', inoutValue.toLowerCase())
        p.innerText = inoutValue.toLowerCase()
        buy.innerText = 'BUY'
        x.innerText = 'X'
        productList.appendChild(div)
        div.appendChild(p)
        div.appendChild(buy)
        div.appendChild(x)
        input.value = ''
        input.focus()

        buy.addEventListener('click', () => {
            const quantity = document.getElementById('i-quantity')
            const price = document.getElementById('i-price')
            mContSettings.style.display = 'flex'
            let buyFatherSett = buy.parentElement
            let firstChildSett = buyFatherSett.firstChild.innerText
            product.innerText = firstChildSett
            const father = buy.parentElement
            const firstChild = father.firstChild.innerText.toLowerCase().replaceAll(' ', '')

            function checkNameListBuy() {
                for (let pos in listBuy) {
                    if (listBuy[pos].name == firstChild) {
                        quantity.value = listBuy[pos].quantity
                        price.value = listBuy[pos].price
                        quantity.setAttribute('readonly', 'readonly')
                        quantity.setAttribute('class', 'outline-none')
                        price.setAttribute('class', 'outline-none')
                        quantity.style.color = 'gray'
                        quantity.style.backgroundColor = 'lightgray'
                        price.style.color = 'gray'
                        price.style.backgroundColor = 'lightgray'
                        price.setAttribute('readonly', 'readonly')
                        confirmButton.style.backgroundColor = '#E33D4B'
                        confirmButton.innerText = 'Change value'
                        return true
                    }
                }
                quantity.removeAttribute('readonly')
                price.removeAttribute('readonly')
                quantity.focus()
                quantity.value = ''
                price.value = ''
                quantity.style.color = 'black'
                quantity.style.backgroundColor = 'white'
                quantity.setAttribute('class', 'outline-block')
                price.setAttribute('class', 'outline-block')
                price.style.color = 'black'
                price.style.backgroundColor = 'white'
                confirmButton.style.backgroundColor = '#3F9654'
                confirmButton.innerText = 'CONFIRM'
            }

            checkNameListBuy()

        })

        closeButtonSett.addEventListener('click', () => {
            mContSettings.style.display = 'none'
        })

        x.addEventListener('click', () => {
            const father = x.parentElement
            father.style.display = 'none'
            input.focus()
            const firstChild = father.firstChild.innerText.toLowerCase().replaceAll(' ', '')

            for (let pos in listBuy) {
                if (listBuy[pos].name.toLowerCase() == firstChild) {
                    listBuy.splice(pos, 1)
                }
            }

            function checkNameList() {
                for (let pos of products) {
                    if (pos == firstChild) {
                        let el = products.indexOf(pos)
                        return el
                    }
                }
                return false
            }

            function addListBuy() {
                let total = 0
                for (let pos in listBuy) {
                    total += listBuy[pos].quantity * listBuy[pos].price
                }
                return total
            }

            totalValue.innerText = `R$ ${addListBuy()}`
            products.splice(checkNameList(), 1)
            totalBuy = listBuy.length
            totalBuyValue.innerText = totalBuy
            totalProducts.innerText = products.length
        })
    }
})

quantity.addEventListener('click', () => {
    if (confirmButton.style.backgroundColor == 'rgb(227, 61, 75)') {
        confirmButton.classList.add('flash-blue');
        setTimeout(() => {
            confirmButton.removeAttribute('class');
        }, 250);
    }
})
price.addEventListener('click', () => {
    if (confirmButton.style.backgroundColor == 'rgb(227, 61, 75)') {
        confirmButton.classList.add('flash-blue');
        setTimeout(() => {
            confirmButton.removeAttribute('class');
        }, 250);
    }
})
