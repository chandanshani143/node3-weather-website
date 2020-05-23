
const weatherform = document.querySelector('form')     //comes back javascript representation of that element, it is used to select the element
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit', (e) => {       //submit is the name of the event
    e.preventDefault()                                //prevent the default behaviour to refresh the browser
    
    const location = search.value                     //it extracts the location value that the user enters
     
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {    //fetch is used to fetch the data from the url
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        
        }
    })
})

})