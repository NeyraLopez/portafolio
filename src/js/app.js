const cards = document.querySelectorAll('.proyecto');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

cards.forEach(card => observer.observe(card));

function navegacionFija(){
    const header = document.querySelector('.header')
    const sobreMi = document.querySelector('.sobre-mi')

    document.addEventListener('scroll', function(){ //metodo bottom
      if(sobreMi.getBoundingClientRect().bottom <= 0){//getBoundingClientRect para cordenadas del elemento
        header.classList.add('fixed'); //clase para mantener el nav fijo
        //console.log('ya lo pasaste')
      }else{
        header.classList.remove('fixed');
        //console.log('Aun no lo pasaste')
      }
    })
}

navegacionFija();

function resaltarEnlace(){
  const sections = document.querySelectorAll('section')
  const enlaces = document.querySelectorAll('.navegacion-principal a')

  let actual = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if(window.scrollY >= (sectionTop - sectionHeight / 3)){
      actual = section.id;
      console.log(actual);
    }
  })

  enlaces.forEach(enlace => {
    enlace.classList.remove('active')
    if(enlace.getAttribute('href') === '#' + actual ){
      enlace.classList.add('active')
    }else{
      enlace.classList.remove('active')
    }
  })
}
//resaltarEnlace();
//window.addEventListener('scroll', resaltarEnlace);

window.addEventListener('scroll', resaltarEnlace);

function scrollNav(){
  const navLinks = document.querySelectorAll('.navegacion-principal a')

  navLinks.forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const sectionScroll = e.target.getAttribute('href');
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({behavior: 'smooth'});
    })
  })

}

scrollNav();