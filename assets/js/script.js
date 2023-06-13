window.addEventListener("DOMContentLoaded", (event) => {

    document.getElementsByTagName('body')[0].classList.add('loading-fadeout')

    setTimeout(() => {
      document.getElementsByTagName('body')[0].classList.remove('loading-fadeout')
      document.getElementsByTagName('body')[0].classList.remove('loading-body')
    }, 900)

    let workItems = document.querySelectorAll('.cd-slider .content')
    let modalCloses = document.querySelectorAll('.details-modal-close svg')
    let aboutOptions = document.querySelectorAll('.about--options a')

    for (let i = 0; i < workItems.length; i++) {
      workItems[i].addEventListener('click', function (e) {
        let href = e.currentTarget.getAttribute('data-href')

        window.open(href, '_blank')
      })
    }

    for (let i = 0; i < modalCloses.length; i++) {
      modalCloses[i].addEventListener('click', function (e) {
        let modal = e.currentTarget.parentElement.parentElement.parentElement
        modal.classList.add('fade-out-modal')

        setTimeout(() => {
          modal.firstElementChild.classList.remove('fade-out-modal')
          modal.classList.remove('details-opened')
          document.querySelector('body').classList.remove('details-opened')
        }, 400)
      })
    }

    for (let i = 0; i < aboutOptions.length; i++) {
      aboutOptions[i].addEventListener('click', function (e) {
        e.preventDefault()
        let modalId = e.currentTarget.getAttribute('href')

        if (document.querySelector(modalId)) {
          document.querySelector(modalId).classList.add('details-opened')
          document.querySelector('body').classList.add('details-opened')
        }
      })
    }
  
    document.getElementById('projectForm').addEventListener('submit', function (e) {
      e.preventDefault()

      let name = $('#name').val()
      let contact = $('#contact').val()
      let email = $('#email').val()
      let description = $('#description').val()

      $('#name').prop('disabled', true);
      $('#email').prop('disabled', true);
      $('#contact').prop('disabled', true);
      $('#description').prop('disabled', true);
      $('#formSubmit').prop('disabled', true);

      let text = "Demande de projet pour Cedric Datcha\nNom et Prénoms: "+name+"\nContact: "+contact+"\nEmail: "+email+"\nDescription: "+description;

      $.get("https://api.callmebot.com/whatsapp.php?phone=22553981497&apikey=2059680&text="+encodeURIComponent(text), function (data){
      });

      setTimeout(() => {
        $('#formSubmit span').html('Message Envoyé !');

        $('#name').prop('disabled', false);
        $('#email').prop('disabled', false);
        $('#contact').prop('disabled', false);
        $('#description').prop('disabled', false);
        $('#formSubmit').prop('disabled', false);

        $('#name').val('');
        $('#email').val('');
        $('#contact').val('');
        $('#description').val('');

        setTimeout(()=> {
          $('#formSubmit span').html('Envoyer');
        },1500)
      }, 1500)
    })
  });

  (function () {

    var autoUpdate = false,
      timeTrans = 4000;

    var cdSlider = document.querySelector('.cd-slider'),
      item = cdSlider.querySelectorAll("li"),
      nav = cdSlider.querySelector("nav");

    item[0].className = "current_slide";

    for (var i = 0, len = item.length; i < len; i++) {
      var color = item[i].getAttribute("data-color");

      item[i].firstElementChild.firstElementChild.style.backgroundColor = color;
    }

    // Detect IE
    // hide ripple effect on IE9
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    if (msie > 0) {
      var version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
      if (version === 9) { cdSlider.className = "cd-slider ie9"; }
    }

    if (item.length <= 1) {
      nav.style.display = "none";
    }

    function prevSlide() {
      var currentSlide = cdSlider.querySelector("li.current_slide"),
        prevElement = currentSlide.previousElementSibling,
        prevSlide = (prevElement !== null) ? prevElement : item[item.length - 1],
        prevColor = prevSlide.getAttribute("data-color"),
        el = document.createElement('span');

      currentSlide.className = "";
      prevSlide.className = "current_slide";

      nav.children[0].appendChild(el);

      var size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2,
        ripple = nav.children[0].querySelector("span");

      ripple.style.height = size + 'px';
      ripple.style.width = size + 'px';
      ripple.style.backgroundColor = prevColor;

      ripple.addEventListener("webkitTransitionEnd", function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      });

      ripple.addEventListener("transitionend", function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      });

    }

    function nextSlide() {
      var currentSlide = cdSlider.querySelector("li.current_slide"),
        nextElement = currentSlide.nextElementSibling,
        nextSlide = (nextElement !== null) ? nextElement : item[0],
        nextColor = nextSlide.getAttribute("data-color"),
        el = document.createElement('span');

      currentSlide.className = "";
      nextSlide.className = "current_slide";

      nav.children[1].appendChild(el);

      var size = (cdSlider.clientWidth >= cdSlider.clientHeight) ? cdSlider.clientWidth * 2 : cdSlider.clientHeight * 2,
        ripple = nav.children[1].querySelector("span");

      ripple.style.height = size + 'px';
      ripple.style.width = size + 'px';
      ripple.style.backgroundColor = nextColor;

      ripple.addEventListener("webkitTransitionEnd", function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      });

      ripple.addEventListener("transitionend", function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      });

    }

    updateNavColor();

    function updateNavColor() {
      var currentSlide = cdSlider.querySelector("li.current_slide");

      var nextColor = (currentSlide.nextElementSibling !== null) ? currentSlide.nextElementSibling.getAttribute("data-color") : item[0].getAttribute("data-color");
      var prevColor = (currentSlide.previousElementSibling !== null) ? currentSlide.previousElementSibling.getAttribute("data-color") : item[item.length - 1].getAttribute("data-color");

      if (item.length > 2) {
        nav.querySelector(".prev").style.backgroundColor = prevColor;
        nav.querySelector(".next").style.backgroundColor = nextColor;
      }
    }

    nav.querySelector(".next").addEventListener('click', function (event) {
      event.preventDefault();
      nextSlide();
      updateNavColor();
    });

    nav.querySelector(".prev").addEventListener("click", function (event) {
      event.preventDefault();
      prevSlide();
      updateNavColor();
    });

    //autoUpdate
    setInterval(function () {
      if (autoUpdate) {
        nextSlide();
        updateNavColor();
      };
    }, timeTrans);

  })();
