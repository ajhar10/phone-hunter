//Error Hide
document.getElementById('api-error').style.display = "none";

//Onclick handler
const searchMobile = () => {
    const searchInputField = document.getElementById('search-field');
    const emptyInputResultDisplay = document.getElementById('empty');
    document.getElementById('api-error').style.display = "none";
    document.getElementById('brand-info').style.display = "none";
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
    const singlePhoneDetailsDisplay = document.getElementById('phone-details');
    singlePhoneDetailsDisplay.textContent = '';
    displayResult.textContent = '';
    notAvailable.textContent = '';
    const phones20 = phones.slice(0, 20);

    if (phones20.length == 0) {
        const div = document.createElement('div');
        div.classList.add('not-available');
        div.innerHTML = `<h3>Not available in our site.</h3>`
        notAvailable.appendChild(div)
    }
    else {
        phones20.forEach(phone => {
            const div = document.createElement('div');
            div.innerHTML = `<div class="card mx-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick= "phoneDetails('${phone.slug}')"  class="btn btn-success">Details</button>
        </div>`
            displayResult.appendChild(div);
        });
    }
}

//Mobile Phone Details
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(phone => displayPhoneDetails(phone.data))
}

//Display phone details
const displayPhoneDetails = data => {
    const singlePhoneDetailsDisplay = document.getElementById('phone-details');
    singlePhoneDetailsDisplay.textContent = '';
    const div = document.createElement('div');
    console.log(data);
    div.classList.add('card');

    div.innerHTML = `
            <div class="row g-0">
            <div class="card-header text-center text-warning"><h3> ${data.name}</h3> <small class="text-muted release-date">${data.releaseDate || "No Release Date Found"}</small></div>
                  <div class="col-md-2">
                    <img src="${data.image}" class="img-fluid rounded-start" alt="...">
                  </div>
                  
                  <div class="col-md-4">
                    <div class="card-body">
                      <h5 class="card-title text-danger">Main Features</h5>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.storage}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.displaySize}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.chipSet}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.memory}</small></p>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="card-body">
                      <h5 class="card-title fw-bold text-danger">Sensor Info:</h5>
                      <small class="text-muted">${data.mainFeatures.sensors[0] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[1] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[2] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[3] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[4] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[5] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[6] || ''}</small></br>
                      <small class="text-muted">${data.mainFeatures.sensors[7] || ''}</small></br>
                      
                    </div>
                </div>

                
                <div class="col-md-4">
                    <div class="card-body">
                      <h5 class="card-title fw-bold text-danger">Other Info:</h5>
                      
                      
                      
                    </div>
                </div>

    </div>      
    `

    singlePhoneDetailsDisplay.appendChild(div);
    console.log(data);
}