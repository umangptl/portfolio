/**
 * Portfolio Website - Main JavaScript
 * Author: Umang Patel
 * Description: Handles dark mode, navigation, animations, and interactions
 */

// ==========================================
// DARK MODE MANAGEMENT
// ==========================================

class DarkModeManager {
  constructor() {
    this.lightIcon = document.getElementById("light-icon");
    this.darkIcon = document.getElementById("dark-icon");
    this.darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkMode =
      localStorage.getItem("dark-mode") === "true" ||
      this.darkModeMediaQuery.matches;

    this.init();
  }

  init() {
    this.updateIcons();
    this.darkModeMediaQuery.addEventListener("change", (e) =>
      this.handleSystemThemeChange(e)
    );
  }

  updateIcons() {
    document.body.classList.toggle("dark-mode", this.darkMode);
    this.lightIcon.style.display = this.darkMode ? "block" : "none";
    this.darkIcon.style.display = this.darkMode ? "none" : "block";
  }

  handleSystemThemeChange(e) {
    this.darkMode = e.matches;
    this.updateIcons();
  }

  toggle() {
    this.darkMode = !this.darkMode;
    localStorage.setItem("dark-mode", this.darkMode);
    this.updateIcons();
  }
}

const darkModeManager = new DarkModeManager();

function toggleDarkMode() {
  darkModeManager.toggle();
}

// ==========================================
// NAVIGATION & SCROLL EFFECTS
// ==========================================

class NavigationManager {
  constructor() {
    this.dots = document.querySelectorAll(".dot");
    this.sections = document.querySelectorAll("section");
    this.navLinks = document.querySelectorAll(".nav-links a");
    this.header = document.querySelector("header");

    this.init();
  }

  init() {
    this.setupSmoothScroll();
    this.setupScrollEffects();
    this.setupHeaderScroll();
  }

  setupSmoothScroll() {
    // Navigation links smooth scroll
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e, link));
    });

    // Dot navigation smooth scroll
    this.dots.forEach((dot) => {
      dot.addEventListener("click", () => this.handleDotClick(dot));
    });
  }

  handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    this.scrollToSection(targetId);
  }

  handleDotClick(dot) {
    const targetId = dot.getAttribute("data-target");
    this.scrollToSection(targetId);
  }

  scrollToSection(targetId) {
    const targetSection = document.querySelector(`#${targetId}`);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }

  setupScrollEffects() {
    window.addEventListener("scroll", () => this.updateActiveSection());
  }

  updateActiveSection() {
    let current = "";

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    // Update active states
    this.dots.forEach((dot) => {
      dot.classList.toggle(
        "active",
        dot.getAttribute("data-target") === current
      );
    });

    this.navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  setupHeaderScroll() {
    if (!this.header) return;

    window.addEventListener("scroll", () => {
      this.header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }
}

// ==========================================
// ANIMATION MANAGER
// ==========================================

class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };
  }

  init() {
    this.setupScrollAnimations();
    this.setupParallax();
    this.setupArchiveAnimations();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    document
      .querySelectorAll(".experience-item, .project-item, .skill-category")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
      });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }

  setupParallax() {
    const heroSection = document.querySelector(".home");
    const heroContent = document.querySelector(".hero-content");

    if (!heroSection || !heroContent) return;

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / window.innerHeight;
      }
    });
  }

  setupArchiveAnimations() {
    const projectRows = document.querySelectorAll(".projects-table tbody tr");
    projectRows.forEach((row, index) => {
      row.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
      row.style.opacity = "0";
    });
  }
}

// ==========================================
// MOBILE NOTIFICATION BANNER
// ==========================================

class NotificationBanner {
  constructor() {
    this.banner = document.getElementById("notification-banner");
    this.closeBtn = document.getElementById("close-banner");

    if (this.banner && this.closeBtn) {
      this.init();
    }
  }

  init() {
    this.checkScreenSize();
    this.closeBtn.addEventListener("click", () => this.close());
    window.addEventListener("resize", () => this.checkScreenSize());
  }

  checkScreenSize() {
    if (!this.banner) return;
    this.banner.style.display = window.innerWidth < 768 ? "block" : "none";
  }

  close() {
    if (this.banner) {
      this.banner.style.display = "none";
    }
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  new NavigationManager();
  new AnimationManager().init();
  new NotificationBanner();
});
