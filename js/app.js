//Error Hide
document.getElementById('api-error').style.display = "none";
//Onclick handler
const searchMobile = () => {
    const searchInputField = document.getElementById('search-field');
    const emptyInputResultDisplay = document.getElementById('empty');
    document.getElementById('api-error').style.display = "none";
    emptyInputResultDisplay.textContent = '';
    const searchValue = searchInputField.value;
    searchInputField.value = '';
    //search value 
    if (searchValue == '') {
        const div = document.createElement('div');
        div.classList.add('empty')
        div.innerHTML = `<h3 class="text-center mx-auto text-danger ">Please, enter something.</h3>`
        emptyInputResultDisplay.appendChild(div);
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(response => response.json())
            .then(element => displayPhone(element.data))
            .catch(error => errorDisplay(error))
    }

}

//  error display 
const errorDisplay = error => {
    console.log(error);
    document.getElementById('api-error').style.display = 'block';
}

//phone display
const displayPhone = phones => {
    const displayResult = document.getElementById('display-phone');
    const notAvailable = document.getElementById('not-available');
    displayResult.textContent = '';
    notAvailable.textContent = '';

    console.log(phones == null);
    if (phones.length == 0) {
        const div = document.createElement('div');
        div.classList.add('not-available');
        div.innerHTML = `<h3>Not available in our site.</h3>`
        notAvailable.appendChild(div)
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            // div.classList.add('col');

            div.innerHTML = `<div onclick='showDetails(${phone.slug})' class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
        </div>`
            displayResult.appendChild(div);
        });
    }
}
