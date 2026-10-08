/* =========================================
   RYAN MONTADOR - JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================
     MENU MOBILE
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (menuToggle && nav) {
    function fecharMenu() {
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    }

    function abrirMenu() {
      nav.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Fechar menu");
    }

    // Abre ou fecha ao clicar no botão
    menuToggle.addEventListener("click", () => {
      const menuAberto = nav.classList.contains("active");

      if (menuAberto) {
        fecharMenu();
      } else {
        abrirMenu();
      }
    });

    // Fecha ao selecionar uma seção
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        fecharMenu();
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener("click", (event) => {
      const clicouNoMenu = nav.contains(event.target);
      const clicouNoBotao = menuToggle.contains(event.target);

      if (!clicouNoMenu && !clicouNoBotao) {
        fecharMenu();
      }
    });

    // Fecha ao pressionar ESC
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        fecharMenu();
      }
    });

    // Reseta o menu ao voltar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        fecharMenu();
      }
    });
  }

  /* =====================================
     ANO AUTOMÁTICO NO RODAPÉ
  ===================================== */

  const anoAtual = document.querySelector("#current-year");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* =====================================
     ANIMAÇÕES AO ROLAR - SALVATECK
  ===================================== */

  const elementosReveal = document.querySelectorAll(
    ".section-heading, " +
      ".service-card, " +
      ".about-image, " +
      ".about-content, " +
      ".advantage-card, " +
      ".portfolio-item, " +
      ".process-step, " +
      ".contact-box",
  );

  const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !movimentoReduzido) {
    elementosReveal.forEach((elemento) => {
      elemento.classList.add("reveal-on-scroll");
    });

    const grupos = document.querySelectorAll(
      ".services-grid, " +
        ".advantages-grid, " +
        ".portfolio-grid, " +
        ".process-grid",
    );

    grupos.forEach((grupo) => {
      Array.from(grupo.children).forEach((card, index) => {
        card.style.setProperty("--reveal-delay", `${(index % 3) * 110}ms`);
      });
    });

    const observerReveal = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px",
      },
    );

    elementosReveal.forEach((elemento) => {
      observerReveal.observe(elemento);
    });

    document.documentElement.classList.add("reveal-ready");
  }
});
