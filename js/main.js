// Фиксированный header 
let prevScrollpos = window.scrollY;
const staticHeader = document.querySelector('.static-header');
const fixedHeader = document.querySelector('.fixed-header');

window.onscroll = function () {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos === 0) {
        fixedHeader.style.transform = 'translateY(-100%)';
    } else {
        fixedHeader.style.transform = 'translateY(0)';
    }

    prevScrollpos = currentScrollPos;
}


// =====================================================================
// Находим все прогресс-бары
const progressRings = document.querySelectorAll('.progress-ring__circle');

progressRings.forEach(circle => {
    const r = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * r;
    const percent = parseFloat(circle.getAttribute('data-percent')) || 0;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    function setProgress() {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    setProgress();
});

// =====================================================================
// Слайдеры
$(document).ready(function () {
    var $slider = $('.cancer-treatment-methods__slider');

    $slider.on('init', function(event, slick){
        var totalSlides = slick.slideCount;
        
        // Проверяем, если слайдов меньше двух, скрываем дотсы
        if (totalSlides < 2) {
            $slider.find('.slick-dots').css('display', 'none');
        }
    });

    $slider.slick({
        arrows: false,
        dots: true,
        adaptiveHeight: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // responsive: [
        //   {
        //     breakpoint: 1801,
        //     settings: {
        //       slidesToShow: 4,
        //     }
        //   },
        // ],
    });
});



// =====================================================================
// Аккордион 
document.addEventListener("DOMContentLoaded", function () {
    const initiallyOpenItem = document.querySelector('.accordion-item.open');

    if (initiallyOpenItem) {
        const content = initiallyOpenItem.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
});

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        accordionItems.forEach((otherItem) => {
            otherItem.classList.remove('open');
            otherItem.querySelector('.accordion-content').style.maxHeight = '0';
        });

        if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});




// =====================================================================
// Табы 
// Находим все контейнеры с табами
const tabContainers = document.querySelectorAll('.tabs-container');

tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tabs-top__btns__item');
    const tabSlider = container.querySelector('.tab-slider');
    const tabContents = container.querySelectorAll('.tab-content');

    function setActiveTab(button) {
        // Удаляем активный класс у всех кнопок в текущем контейнере
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс только для текущей кнопки
        button.classList.add('active');
    }

    function showTabContent(tabId) {
        // Скрываем все контенты в текущем контейнере
        tabContents.forEach(content => content.classList.remove('active'));

        // Находим соответствующий контент и отображаем его
        const tabContent = container.querySelector(`#${tabId}`);
        tabContent.classList.add('active');
    }

    function animateTabSlider(activeButton) {
        // Анимируем сдвиг плашки к активной кнопке
        const offsetX = activeButton.getBoundingClientRect().left - tabSlider.getBoundingClientRect().left;
        tabSlider.style.transform = `translateX(${offsetX}px)`;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveTab(button);

            // Находим активные кнопки в текущем контейнере
            const activeButtons = container.querySelectorAll('.tabs-top__btns__item.active');
            // Проверяем, есть ли активные кнопки, кроме первой
            if (activeButtons.length > 1) {
                const activeButton = container.querySelector('.tabs-top__btns__item.active:last-child');
                animateTabSlider(activeButton);
            }

            // Показываем соответствующий контент
            const tabId = button.getAttribute('data-tab');
            showTabContent(tabId);
        });
    });
});

// =====================================================================
// Модальные окна
function createModal(modalElement, openButtons, closeButton) {
    // Открываем модальное окно при клике на кнопку(и)
    openButtons.forEach(function (openButton) {
        openButton.onclick = function () {
            showModal(modalElement);
        }
    });

    // Закрываем модальное окно при клике на крестик
    closeButton.onclick = function () {
        closeModal(modalElement);
    }

    // Закрываем модальное окно при клике на затемненный фон
    window.onclick = function (event) {
        if (event.target == modalElement) {
            closeModal(modalElement);
        }
    }

    // Функция для показа модального окна - с анимацией
    function showModal(modalElement) {
        modalElement.style.display = 'block';
        setTimeout(function () {
            modalElement.classList.add('show');
            document.body.classList.add('no-scroll');
        }, 10); // Задержка для активации анимации
    }

    // Функция для закрытия модального окна - с анимацией
    function closeModal(modalElement) {
        modalElement.classList.remove('show');
        setTimeout(function () {
            modalElement.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 300); // Задержка для завершения анимации
    }
}



// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modal')) {
    // Модальное окно для обратного зовнка
    const modalConsult = document.getElementById('modal');
    const openModalConsultBtn = document.querySelectorAll('.openModal'); // Выбираем все кнопки с классом 'openModal'
    const closeModalConsultBtn = document.getElementById('modalCloseBtn');

    createModal(modalConsult, openModalConsultBtn, closeModalConsultBtn);
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modalEducation')) {
    // Модальное окно для обратного зовнка
    const modalEducation = document.getElementById('modalEducation');
    const openModalEducation = document.querySelectorAll('.openModalEducation'); // Выбираем все кнопки с классом 'openModal'
    const modalEducationCloseBtn = document.getElementById('modalEducationCloseBtn');

    createModal(modalEducation, openModalEducation, modalEducationCloseBtn);
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modalActivity')) {
    // Модальное окно для обратного зовнка
    const modalActivity = document.getElementById('modalActivity');
    const openModalActivity = document.querySelectorAll('.openModalActivity'); // Выбираем все кнопки с классом 'openModal'
    const modalActivityCloseBtn = document.getElementById('modalActivityCloseBtn');

    createModal(modalActivity, openModalActivity, modalActivityCloseBtn);
}



// =====================================================================
// Отложенная загрузка яндекс карт
let ok1 = false;
let ok2 = false;

function loadMap(mapUrl, targetElementId) {
    if (!ok1) {
        ok1 = true;
        setTimeout(() => {
            let script = document.createElement('script');
            script.src = mapUrl;
            document.getElementById(targetElementId).replaceWith(script);
        }, 5000);
    } else if (!ok2) {
        ok2 = true;
        setTimeout(() => {
            let script = document.createElement('script');
            script.src = mapUrl;
            document.getElementById(targetElementId).replaceWith(script);
        }, 5000);
    }
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#yamap1')) {
    // Вешаем обработчик
    window.addEventListener('scroll', function () {
        loadMap('https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A69908116a82fc59d9a3dc8c7df07b3223f944d3741120d94090d4261663718d5&amp;width=100%25&amp;height=240&amp;lang=ru_RU&amp;scroll=true', 'yamap1');
    });
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#yamap2')) {
    // Вешаем обработчик
    window.addEventListener('scroll', function () {
        loadMap('https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A2df05731d1304c4b774d815175558fb49564f683a6d7548d60b488c08e5f044f&amp;width=100%25&amp;height=240&amp;lang=ru_RU&amp;scroll=true', 'yamap2');
    });
}