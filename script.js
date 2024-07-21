const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");


const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

let darkMode = localStorage.getItem("dark-mode") === 'true' || darkModeMediaQuery.matches;

if (darkMode) {
    document.body.classList.add("dark-mode");
    lightIcon.style.display = "block";
    darkIcon.style.display = "none";
} else {
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
}

darkModeMediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        darkMode = true;
    } else {
        darkMode = false;
    }
    document.body.classList.toggle("dark-mode", darkMode);

    if (darkMode) {
        lightIcon.style.display = "block";
        darkIcon.style.display = "none";
    } else {
        lightIcon.style.display = "none";
        darkIcon.style.display = "block";
    }
});

function toggleDarkMode() {
    // Toggle darkMode variable
    darkMode = !darkMode;

    // Store darkMode variable in localStorage
    localStorage.setItem("dark-mode", darkMode);

    // Toggle dark-mode class on body
    document.body.classList.toggle("dark-mode", darkMode);

    // Toggle light and dark icons
    if (darkMode) {
        lightIcon.style.display = "block";
        darkIcon.style.display = "none";
    } else {
        lightIcon.style.display = "none";
        darkIcon.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section');

    // Function to handle scrolling to a section
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(`#${targetId}`);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Function to highlight the active dot based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === current) {
                dot.classList.add('active');
            }
        });
    });
});

function checkScreenSize() {
  var banner = document.getElementById('notification-banner');
  if (window.innerWidth < 768) { 
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

function closeBanner() {
  var banner = document.getElementById('notification-banner');
  banner.style.display = 'none';
}

window.onload = checkScreenSize;

window.onresize = checkScreenSize;

document.getElementById('close-banner').addEventListener('click', closeBanner);


