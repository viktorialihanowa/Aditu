var items = document.querySelectorAll(".actions__item");
var dots = document.querySelectorAll(".dots__item");
var slider = document.querySelector(".actions");
var counter = 0;
var timer;
items[0].classList.add("show");
dots[0].classList.add("active");


// Установить интервал
var startTimeout = function() {
    timer = setInterval(doActiveNextElement, 5000);
};

// Переклюючиться на нужный элемент
var switchActiveElement = function(evt) {
    clearInterval(timer);
    document.querySelector(".actions__item.show").classList.remove("show");
    document.querySelector(".dots__item.active").classList.remove("active");
    evt.target.classList.add("active");
    document.querySelector('.actions__item[index-data="' + evt.target.getAttribute("index-data") + '"]').classList.add("show");
    for (var i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
            counter = i;
        }
    }
    startTimeout();
    return;
};

//Сделать активным следующий элемент после активного
var doActiveNextElement = function() {
    if (dots[counter].classList.contains("active")) {
        dots[counter].classList.toggle("active");
        items[counter].classList.toggle("show");
        counter++;
        if (counter == items.length) {
            counter = 0;
        }
        dots[counter].classList.toggle("active");
        items[counter].classList.toggle("show");
    }
};

startTimeout();

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", switchActiveElement);
}