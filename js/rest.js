
var rowData = document.getElementById('rowData')
var searchContainer = document.getElementById('searchContainer');


$('.nav-header i').on('click' , function(){
    
    // $('.nav-tab ').animate({width: 'toggle'} , 2000)
    $('.nav-tab ').toggleClass('d-none')
})







$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})

function displayMeals(arr) {
    console.log(arr)
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}
//============================================================================================
async function getMealDetails(mealID) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await res.json();
    displayMealDetails(data.meals[0])
    $(".inner-loading-screen").fadeOut(300)
}

function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const size = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li class="bg-info-subtle m-2 p-1 text-black rounded-2">${size} ${ingredient}</li>`;
        }
    }

    const tags = meal.strTags?.split(",") || [];
    const tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");

    const cartoona = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
            <h3>Recipes:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
        </div>
    `;
    
    rowData.innerHTML = cartoona;
}

//==============================================================================================
        //!search
        function showSearchInputs() {
            searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)"  class=" form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}


async function searchByName(kind) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${kind}`)
    response = await response.json()
    
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByFLetter(kind) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${kind}`)
    response = await response.json()
    
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}
//================================================================================================
//!category
async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    
    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)
}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
//===========================================================================================
//!area
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    
    rowData.innerHTML = cartoona
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    
    
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)
}
//=============================================================================================
//!ingredents 
async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);
    
    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)
    
}
function displayIngredients(arr) {
    let cartoona = "";
    
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </div>
        `
    }
    
    rowData.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    
    
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

} 
//=================================================================================================
//!contact
// const nameInput = document.getElementById('nameInput')
// const sign = document.getElementById('sign')
// var nameAlert= document.getElementById('nameAlert')
// console.log(nameAlert)
// var email = document.getElementById('emailInput')
// console.log(email )
// var emailAlret = document.getElementById('emailAlert')
// console.log(emailAlret )
// var phone = document.getElementById('phoneInput')
// console.log(phone )
// var phoneAlert = document.getElementById('phoneAlert')
// var age = document.getElementById('ageInput')
// console.log(phoneAlert)
// var ageAlert = document.getElementById('ageAlert')
// console.log(ageAlert )
// var password = document.getElementById('passwordInput')
// var passwordAlert = document.getElementById('passwordAlert')
// var repassword = document.getElementById('repasswordInput')
// var repasswordAlert = document.getElementById('repasswordAlert')



function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="validation(regex , element , alretel)" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="validation(regex , element , alretel)" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="validation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="validation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="validation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="validation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    nameInput = document.getElementById('nameInput')
    sign = document.getElementById('sign')
    nameAlert= document.getElementById('nameAlert')

    email = document.getElementById('emailInput')

    emailAlret = document.getElementById('emailAlert')

    phone = document.getElementById('phoneInput')

    phoneAlert = document.getElementById('phoneAlert')
    age = document.getElementById('ageInput')
    ageAlert = document.getElementById('ageAlert')
    password = document.getElementById('passwordInput')
    passwordAlert = document.getElementById('passwordAlert')
    repassword = document.getElementById('repasswordInput')
    repasswordAlert = document.getElementById('repasswordAlert')


    sign.addEventListener('input' , function(e){
        console.log('hello')
        e.preventDefault()
        validation(/^[a-zA-Z ]+$/ ,nameInput ,  nameAlert)
        validation(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,email , emailAlret )
        validation(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ , phone ,phoneAlert )
        validation(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/ ,age , ageAlert )
        validation(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/ , password , passwordAlert)
    })
}



function validation(regex , element , alretel){
    var pattern = regex ;
    if(pattern.test(element.value)){
        console.log('valid')
        alretel.classList.add('d-none')
        return true
    }else{
        console.log(' not valid')
        alretel.classList.remove('d-none')
        return false
    }
}
