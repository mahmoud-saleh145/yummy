let displayData = document.getElementById("displayData")
let search = document.getElementById("search")

closeSideNav()

$(document).ready(function () {
    getMeals("").then(() => {
        $(".loading-data").fadeOut(400)
        $(".loading").fadeOut(500, function () {
            $("body").css("overflow", "auto")
        })
    })
})

function reload() {
    window.location.reload()
}

function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500)
    $(".open-icon").removeClass("fa-bars")
    $(".open-icon").addClass("fa-x")
    $(".links li").eq(0).animate({ top: 0 }, 500)
    $(".links li").eq(1).animate({ top: 0 }, 600)
    $(".links li").eq(2).animate({ top: 0 }, 700)
    $(".links li").eq(3).animate({ top: 0 }, 800)
    $(".links li").eq(4).animate({ top: 0 }, 900)
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .side-nav-content").innerWidth()
    $(".side-nav-menu").animate({ left: -boxWidth }, 500)
    $(".open-icon").addClass("fa-bars")
    $(".open-icon").removeClass("fa-x")
    $(".links li").animate({ top: 200 }, 500)

}

$(".side-nav-menu .open-icon").click(() => {

    if ($(".side-nav-menu").offset().left == 0) {
        closeSideNav()
    } else {
        openSideNav()
    }
})

async function getMeals(meal) {
    let mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let mealData = await mealResponse.json()
    displayMeals(mealData.meals)
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `     
         <div class="col-lg-3 col-md-4 col-6">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="card position-relative border-0 overflow-hidden">
                <img src="${arr[i].strMealThumb}" class="rounded w-100">
                <div class="layer position-absolute d-flex align-items-center">
                     <h3 class="ps-2">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    displayData.innerHTML = cartoona
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function getCategories() {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    closeSideNav()
    let categoriesResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let categoriesData = await categoriesResponse.json()
    displayCategories(categoriesData.categories)
    $(".loading-data").fadeOut(400, function () {
        $("body").css("overflow", "auto")
    })
}

function displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-lg-3 col-md-4 col-6">
                <div onclick="getCategoriesMeal('${arr[i].strCategory}')" class="card position-relative border-0 overflow-hidden" >
                    <img src="${arr[i].strCategoryThumb}" class="rounded w-100">
                    <div class="layer position-absolute text-center">
                         <h3 class="ps-2">${arr[i].strCategory}</h3>
                         <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>`
    }
    search.innerHTML = ""
    displayData.innerHTML = cartoona + `<span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>`
}

async function getCategoriesMeal(category) {
    $(".loading-data").fadeIn(100)
    let categoriesMealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let categoriesMealData = await categoriesMealResponse.json()
    displayMeals(categoriesMealData.meals.slice(0, 20))
    $(".loading-data").fadeOut(100)
}

async function getArea() {
    $(".loading-data").fadeIn(100)
    closeSideNav()
    let areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaData = await areaResponse.json()
    displayArea(areaData.meals)
    $(".loading-data").fadeOut(400)
}

function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
             <div class="col-lg-3 col-md-4 col-6">
                <div onclick="getAreaMeal('${arr[i].strArea}')" class="card border-0 overflow-hidden text-center text-white cursor-pointer">
                        <i class="main-icon fa-solid fa-house-laptop"></i>
                        <h3 class="ps-2">${arr[i].strArea}</h3>
                </div>        
            </div>`
    }
    search.innerHTML = ""
    displayData.innerHTML = cartoona + `<span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>`
}

async function getAreaMeal(area) {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    let areaMealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let areaMealData = await areaMealResponse.json()
    displayMeals(areaMealData.meals.slice(0, 20))
    $(".loading-data").fadeOut(100, function () {
        $("body").css("overflow", "auto")
    })
}

async function getIngredients() {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    closeSideNav()
    let ingredientsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ingredientsData = await ingredientsResponse.json()
    displayIngredients(ingredientsData.meals.slice(0, 20))
    $(".loading-data").fadeOut(400, function () {
        $("body").css("overflow", "auto")
    })
}

function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
             <div class="col-lg-3 col-md-4 col-6">
                <div onclick="getIngredientsMeal('${arr[i].strIngredient}')" class="card border-0 overflow-hidden text-center text-white cursor-pointer">
                        <i class="main-icon fa-solid fa-drumstick-bite"></i>
                        <h3 class="ps-2">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
                </div>        
            </div>`
    }
    search.innerHTML = ""
    displayData.innerHTML = cartoona + `<span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>`
}

async function getIngredientsMeal(ingredient) {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    let ingredientMealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let ingredientMealData = await ingredientMealResponse.json()
    displayMeals(ingredientMealData.meals.slice(0, 20))
    $(".loading-data").fadeOut(100, function () {
        $("body").css("overflow", "auto")
    })
}

async function getMealDetails(id) {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    closeSideNav()
    let MealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let MealDetailsData = await MealDetailsResponse.json()
    displayMealsDetails(MealDetailsData.meals[0])
    $(".loading-data").fadeOut(400, function () {
        $("body").css("overflow", "auto")
    })
}

function displayMealsDetails(arr) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="recipes p-2 rounded ">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }

    let tagStr = arr.strTags?.split(",")
    if (!tagStr) tagStr = []
    let tags = ''
    for (let i = 1; i < tagStr.length; i++) {
        tags += `<li class="tags p - 2 rounded ">${tagStr[i]}</li>`
    }


    let cartoona = `
    <span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>
    <div class="col-md-4">
        <div class="p-3">
            <img src="${arr.strMealThumb}" class="w-100 rounded-2">
            <h2>${arr.strMeal}</h2>
        </div>
    </div>
    <div class="col-md-8">
        <div class="">
            <p class="fs-2 fw-semibold mb-0">Instructions</p>
            <p>${arr.strInstructions}</p>
            <h3><span class="fw-bold">Area :</span> ${arr.strArea}</h3>
            <h3><span class="fw-bold">Category :</span> ${arr.strCategory}</h3>
            <h3 class="fw-bold mb-4">Recipes :</h3>

            <ul class="row gap-3">
                ${ingredients}
            </ul>
            <h3 class="fw-bold mb-4">Tags :</h3>
            <ul class="row gap-3 mb-4">
                 ${tags}
            </ul>
            <a class="btn btn-success" href="${arr.strSource}">Source</a>
            <a class="btn btn-danger" href="${arr.strYoutube}">Youtube</a>
        </div>
    </div>
`
    search.innerHTML = ""
    displayData.innerHTML = cartoona
}

function displaySearch() {
    closeSideNav()
    displayData.innerHTML = ""
    let cartoona = `
    <span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>
    <div class="container w-75">
        <div class="row pt-4 me-1">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" class="form-control mb-2" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLitter(this.value)" maxLength="1" type="text" class="form-control" placeholder="Search By First Letter">
            </div>
        </div>
    </div>`

    search.innerHTML = cartoona
}

async function searchByName(name) {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    let searchByNameResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    searchByNameData = await searchByNameResponse.json()
    searchByNameData.meals ? displayMeals(searchByNameData.meals) : displayMeals([])
    $(".loading-data").fadeOut(400, function () {
        $("body").css("overflow", "auto")
    })
}

async function searchByLitter(litter) {
    $(".loading-data").fadeIn(100, function () {
        $("body").css("overflow", "hidden")
    })
    let searchByLitterResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
    searchByLitterData = await searchByLitterResponse.json()
    searchByLitterData.meals ? displayMeals(searchByLitterData.meals) : displayMeals([])
    $(".loading-data").fadeOut(400, function () {
        $("body").css("overflow", "auto")
    })
}

let inputNameTouched = false;
let inputEmailTouched = false;
let inputPhoneTouched = false;
let inputAgeTouched = false;
let inputPasswordTouched = false;
let inputRePasswordTouched = false;

function displayContact() {
    closeSideNav()
    let cartoona = `
    <span class="position-absolute top-0 end-0 w-auto cursor-pointer me-4 mt-3"><i class='fa-solid fa-x fs-1' onclick="reload()"></i></span>
     <section class="contact vh-100 d-flex align-items-center justify-content-center w-75 m-auto">
        <div class="container text-center">
            <div class="row gy-4">
                <div class="col-md-6">
                    <input onkeyup="validation()" type="text" class="form-control" placeholder="Enter Your Name" id="inputName">
                     <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validation()" type="email" class="form-control" placeholder="Enter Your Email" id="inputEmail">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validation()" type="text" class="form-control" placeholder="Enter Your Phone" id="inputPhone">
                      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validation()" type="number" class="form-control" placeholder="Enter Your Age" id="inputAge">
                     <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validation()" type="password" class="form-control" placeholder="Enter Your Password" id="inputPassword">
                       <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validation()" type="password" class="form-control" placeholder="RePassword" id="inputRePassword">
                       <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid rePassword
                        </div>
                </div>
            </div>
            <button type="submit" onclick="clearData()" id="submit" disabled class="btn btn-outline-danger mt-4">Submit</button>
        </div>
    </section>
    `
    search.innerHTML = ""
    displayData.innerHTML = cartoona

    document.getElementById("inputName").addEventListener("focus", () => {
        inputNameTouched = true
    })

    document.getElementById("inputEmail").addEventListener("focus", () => {
        inputEmailTouched = true
    })

    document.getElementById("inputPhone").addEventListener("focus", () => {
        inputPhoneTouched = true
    })

    document.getElementById("inputAge").addEventListener("focus", () => {
        inputAgeTouched = true
    })

    document.getElementById("inputPassword").addEventListener("focus", () => {
        inputPasswordTouched = true
    })

    document.getElementById("inputRePassword").addEventListener("focus", () => {
        inputRePasswordTouched = true
    })

}
function validation() {
    const submit = document.getElementById("submit");

    if (inputNameTouched) {
        if (validateName()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
    }
    if (inputEmailTouched) {

        if (validateEmail()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputPhoneTouched) {
        if (validatePhone()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputAgeTouched) {
        if (validateAge()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputPasswordTouched) {
        if (validatePass()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (inputRePasswordTouched) {
        if (validateRePass()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block")

        }
    }



    if (validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateAge() &&
        validatePass() &&
        validateRePass()) {
        submit.removeAttribute("disabled")
    } else {
        submit.setAttribute("disabled", true)
    }


}


function validateName() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("inputName").value))
}

function validateEmail() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("inputEmail").value))
}

function validatePhone() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("inputPhone").value))
}

function validateAge() {
    return (/^(0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/.test(document.getElementById("inputAge").value))
}

function validatePass() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("inputPassword").value))
}

function validateRePass() {
    return document.getElementById("inputRePassword").value == document.getElementById("inputPassword").value
}

function clearData() {
    document.getElementById("inputName").value = ""
    document.getElementById("inputEmail").value = ""
    document.getElementById("inputPhone").value = ""
    document.getElementById("inputAge").value = ""
    document.getElementById("inputPassword").value = ""
    document.getElementById("inputRePassword").value = ""

    inputNameTouched = false;
    inputEmailTouched = false;
    inputPhoneTouched = false;
    inputAgeTouched = false;
    inputPasswordTouched = false;
    inputRePasswordTouched = false;

    validation();
}


