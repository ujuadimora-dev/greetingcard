
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav__menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav__menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*---Christmas countdown------*/
const titleData = document.getElementById('title-data'),
      numberData = document.getElementById('number-data'),
      textData = document.getElementById('text-data'),
      msgChristmas = document.getElementById('msg-christmas');

const christmasCountdown = () => {
    let now = new Date(), // get today's date
        currentMonth = now.getMonth() + 1, // get the current month
        currentDay = now.getDate(); // get the current day of the month

    // calculate the year the next christmas will be
    let nextChristmasYear = now.getFullYear()
    if (currentMonth === 12 && currentDay > 25) {
        nextChristmasYear += 1;
    }
    let nextChristmasDate = `Dec 25, ${nextChristmasYear} 00:00:00 `,
        christmasDay = new Date(nextChristmasDate),
        timeLeft = christmasDay - now;

    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;

    // don't calculate the time left if it is not Christmas day
    if (currentMonth !== 12 || (currentMonth === 12 && currentDay !== 25)) {
        days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    }
    // show remaining days
    numberData.innerHTML = days < 10 ? `0${days}` : days;
    textData.innerHTML = `Days`;

    //show missing days
    if(currentDay == 24){
        numberData.innerHTML = hours < 10? `${hours}`: hours
        textData.innerHTML = 'Hours'
    }
    // show missing minutes, countdown, 0 hours left, show minutes (00:59)
    if(currentDay == 24 && hours === 0){
        numberData.innerHTML = minutes < 10? `${minutes}`: minutes
        textData.innerHTML = 'Minutes'
    }

    // show missing seconds, countdown, 0 hours  and 0 minitues left, show second (00:00:59)
    if(currentDay == 24 && hours === 0 && minutes === 0){
        numberData.innerHTML = seconds < 10? `${seconds}`: seconds
        textData.innerHTML = 'Seconds'
    }
    //show message on Christmas Day
    if (currentMonth ==12 && currentDay ==25){
        titleData.style.display = 'none'
        msgChristmas.style.display = 'block'
        msgChristmas.innerHTML = 'Today is Dec 25, Merry Christmas'
    }
    //show remaining days and rempve christmas message
    if (currentMonth ==12 && currentDay ==26){
        titleData.style.display = 'block'
        msgChristmas.style.display = 'none'
      
    }

    
    
}


setInterval(christmasCountdown, 1000);
