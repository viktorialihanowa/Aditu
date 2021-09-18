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
'use strict';
var multiItemSlider = (function() {
    return function(selector, config) {
        var
            _mainElement = document.querySelector(selector), // основный элемент блока
            _sliderWrapper = _mainElement.querySelector('.popular__wrapper'), // обертка для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.popular__item'), // элементы (.slider-item)
            _sliderControls = _mainElement.querySelectorAll('.popular-btn'), // элементы управления
            _sliderControlLeft = _mainElement.querySelector('.popular__prew'), // кнопка "LEFT"
            _sliderControlRight = _mainElement.querySelector('.popular__next'), // кнопка "RIGHT"
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
            _positionLeftItem = 0, // позиция левого активного элемента
            _transform = 0, // значение транфсофрмации .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)  Изначально рассчитывается в процентак
            // _step = _itemWidth, // величина шага (для трансформации), меняем на пиксели
            _items = []; // массив элементов


        // наполнение массива _items
        _sliderItems.forEach(function(item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
            getMin: 0,
            getMax: _items.length - 1,
        }
        var _transformItem = function(direction) {
            if (direction === 'right') {
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {



                    return;
                }
                if (!_sliderControlLeft.classList.contains('popular-btn_show')) {

                    _sliderControlLeft.classList.add('popular-btn_show');
                }
                if (_sliderControlRight.classList.contains('popular-btn_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                    _sliderControlRight.classList.remove('popular-btn_show');
                }
                _positionLeftItem++;
                _transform -= _step;

            }
            if (direction === 'left') {
                if (_positionLeftItem <= position.getMin) {

                    return;
                }
                if (!_sliderControlRight.classList.contains('popular-btn_show')) {
                    _sliderControlRight.classList.add('popular-btn_show');
                }
                if (_sliderControlLeft.classList.contains('popular-btn_show') && _positionLeftItem - 1 <= position.getMin) {
                    _sliderControlLeft.classList.remove('popular-btn_show');
                }
                _positionLeftItem--;


                _transform += _step;


            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед" - работает
        var _controlClick = function(e) {
            if (e.target.classList.contains('popular-btn')) {
                e.preventDefault();
                var direction = e.target.classList.contains('popular__next') ? 'right' : 'left';
                _transformItem(direction);
            }
        };

        var _setUpListeners = function() {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControls.forEach(function(item) {
                item.addEventListener('click', _controlClick);
            });
        }

        // инициализация
        _setUpListeners();

        return {
            right: function() { // метод right
                _transformItem('right');
            },
            left: function() { // метод left
                _transformItem('left');
            }
        }

    }
}());

var slider = multiItemSlider('.popular')