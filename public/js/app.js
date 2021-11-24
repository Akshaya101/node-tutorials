//to fetch the forecast information
//console.log('client side JS file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let message1 = document.querySelector('#message-1')
let message2 = document.querySelector('#message-2')

message1.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                }
                else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            })
        })

})