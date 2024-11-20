
$(document).ready(function(){
    $(".slide-one").owlCarousel({
          loop:true, 
          margin:0, 
          nav:false, 
          dots:false,
          smartSpeed:700,
         autoplay:true, 
        autoplayTimeout:4000, 
          responsive:{ 
              0:{
                  items:1
              },
              600:{
                  items:1
              },
              1000:{
                items:2
              },
              1200:{
                  items:3
              }
          }
      });
      $('.slide-two').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed:700,
        items: 1,
        navText: [
            `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
        ],
        
    });

    $('.owl-dots .owl-dot').each(function(index) {
        const thumbSrc = $('.slide-two .owl-item').not('.cloned').eq(index).find('img').attr('src');
        $(this).html(`<img src="${thumbSrc}" alt="Thumbnail ${index + 1}">`);
    });

    
});


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".article-card");
    const buttons = document.querySelectorAll(".page-btn");
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    const cardsPerPageDefault = 6;  // По умолчанию показываем 6 карточек
    const cardsPerPageMobile = 4;  // На мобильных устройствах показываем 4 карточки
    let currentPage = 1;

    // Определяем количество карточек в зависимости от ширины экрана
    function getCardsPerPage() {
        return window.innerWidth <= 570 ? cardsPerPageMobile : cardsPerPageDefault;
    }

    // Функция для отображения карточек на определённой странице
    function showPage(page) {
        const cardsPerPage = getCardsPerPage();  // Получаем актуальное количество карточек
        const totalPages = Math.ceil(cards.length / cardsPerPage);  // Общее количество страниц
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        // Скрываем все карточки
        cards.forEach((card, index) => {
            card.style.display = index >= start && index < end ? "block" : "none";
        });

        // Обновляем активность кнопок
        buttons.forEach(button => {
            const pageNum = parseInt(button.getAttribute("data-page"));
            if (pageNum === page) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        // Обновляем доступность кнопки "Next"
        if (page === totalPages) {
            nextButton.disabled = true;  // Отключаем кнопку "Next" на последней странице
        } else {
            nextButton.disabled = false;  // Включаем кнопку "Next" на всех остальных страницах
        }

        // Обновляем доступность кнопки "Prev"
        if (page === 1) {
            prevButton.disabled = true;  // Отключаем кнопку "Prev" на первой странице
        } else {
            prevButton.disabled = false;  // Включаем кнопку "Prev" на всех остальных страницах
        }
    }

    // Добавляем обработчики событий для кнопок страниц
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            currentPage = parseInt(button.getAttribute("data-page"));
            showPage(currentPage);
        });
    });

    // Логика для кнопки Next
    nextButton.addEventListener("click", () => {
        if (currentPage < Math.ceil(cards.length / getCardsPerPage())) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Логика для кнопки Prev
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Отображаем первую страницу по умолчанию
    showPage(currentPage);

    // Перерисовываем страницу при изменении размера окна
    window.addEventListener("resize", () => {
        showPage(currentPage);
    });
});