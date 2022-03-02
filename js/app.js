//Error Hide
document.getElementById('api-error').style.display = "none";

//Onclick handler
const searchMobile = () => {
    const searchInputField = document.getElementById('search-field');
    const emptyInputResultDisplay = document.getElementById('empty');
    document.getElementById('api-error').style.display = "none";
    document.getElementById('brand-info').style.display = "none";
    const singlePhoneDetailsDisplay = document.getElementById('phone-details');
    const otherDetailsDisplay = document.getElementById('other-info');
    const sensorDetailsDisplay = document.getElementById('sensor-info');
    sensorDetailsDisplay.textContent = '';
    singlePhoneDetailsDisplay.textContent = '';
    otherDetailsDisplay.textContent = '';
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
    // Display 20 Device 
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
    const otherDetailsDisplay = document.getElementById('other-info');
    const sensorDetailsDisplay = document.getElementById('sensor-info');
    sensorDetailsDisplay.textContent = '';
    singlePhoneDetailsDisplay.textContent = '';
    otherDetailsDisplay.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
            <div class="row g-0">
            <div class="card-header text-center text-warning"><h3> ${data.name}</h3> <small class="text-muted release-date">${data.releaseDate || "No Release Date Found"}</small></div>
                  <div class="col-md-6">
                    <img src="${data.image}" class="img-fluid rounded-start" alt="...">
                  </div>
                  
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title text-danger">Main Features</h5>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.storage}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.displaySize}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.chipSet}</small></p>
                      <p class="card-text"><small class="text-muted">${data.mainFeatures.memory}</small></p>
                    </div>
                  </div>

                  

    </div>      
    `
    // ---------------Sensor Information Start----------------
    console.log(data.mainFeatures.sensors.length);
    if (data.mainFeatures.sensors.length == 0) {

        sensorDetailsDisplay.innerHTML = `<div class="card text-dark bg-light " >
        <div class="card-header py-3">Sensor Information:</div>
        <div class="card-body">
          
          <h5 class="card-title">Not Available</h5>
        </div>
      </div>`;
    } else {

        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        const h4 = document.createElement('h4');
        h4.innerText = 'Sensor Info:';
        h4.classList.add('text-danger');
        ul.appendChild(h4)
        for (const element of data.mainFeatures.sensors) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = element;
            // console.log(`${key}: ${value}`);
            ul.appendChild(li);
        }
        sensorDetailsDisplay.appendChild(ul);
    }
    // ---------------Sensor Information End----------------

    // ---------------Other Information Start----------------
    if (data.others == undefined) {

        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        const h4 = document.createElement('h4');
        h4.innerText = 'Other Info:';
        h4.classList.add('text-danger');
        ul.appendChild(h4);
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = "Not Available!";
        ul.appendChild(li);
        otherDetailsDisplay.appendChild(ul);
    } else {

        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        const h4 = document.createElement('h4');
        h4.innerText = 'Other Info:';
        h4.classList.add('text-danger');
        ul.appendChild(h4)
        for (const [key, value] of Object.entries(data.others)) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = `${key}: ${value}`;
            // console.log(`${key}: ${value}`);
            ul.appendChild(li);
        }
        otherDetailsDisplay.appendChild(ul);
    }
    //------------- Other Information End ---------------

    singlePhoneDetailsDisplay.appendChild(div);

    // console.log(data.other.length == 0);
}

// const otherInfo = data => {
//     console.log(data);
//     const otherInfo = document.getElementById('other-info');
//     for (const [key, value] of Object.entries(info.others)) {
//         console.log(`${key}: ${value}`);
// }
