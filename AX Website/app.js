const revealTargets = document.querySelectorAll(".reveal");
const sectionTargets = document.querySelectorAll("[data-section]");
const navLinks = document.querySelectorAll("[data-nav]");
const railLinks = document.querySelectorAll("[data-dot]");
const progressBar = document.querySelector(".scroll-progress__bar");
const tiltCards = document.querySelectorAll(".tilt-card");
const parallaxTargets = document.querySelectorAll("[data-parallax]");
const popupLinks = document.querySelectorAll("[data-popup-link]");
const copyLinkButtons = document.querySelectorAll("[data-copy-url]");
let toastTimer;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, { threshold: 0.18 });

revealTargets.forEach((target) => revealObserver.observe(target));

if (sectionTargets.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const current = entry.target.dataset.section;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === current);
      });
      railLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.dot === current);
      });
    });
  }, { threshold: 0.42 });

  sectionTargets.forEach((section) => sectionObserver.observe(section));
}

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
};

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

parallaxTargets.forEach((target) => {
  target.addEventListener("pointermove", (event) => {
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    target.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
  });

  target.addEventListener("pointerleave", () => {
    target.style.transform = "";
  });
});

popupLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const preferredWidth = Number(link.dataset.popupWidth) || 500;
    const preferredHeight = Number(link.dataset.popupHeight) || 960;
    const popupWidth = Math.min(preferredWidth, window.screen.availWidth - 40);
    const popupHeight = Math.min(preferredHeight, window.screen.availHeight - 60);
    const left = Math.max(window.screen.availLeft || 0, Math.floor(((window.screen.availWidth || window.screen.width) - popupWidth) / 2));
    const topBase = window.screen.availTop || 0;
    const top = Math.max(topBase, Math.floor(topBase + ((window.screen.availHeight || window.screen.height) - popupHeight) / 2));
    const features = [
      `width=${popupWidth}`,
      `height=${popupHeight}`,
      `left=${left}`,
      `top=${top}`,
      "noopener",
      "noreferrer",
      "resizable=yes",
      "scrollbars=yes"
    ].join(",");

    const popup = window.open(link.href, "_blank", features);
    if (popup) {
      try {
        popup.resizeTo(popupWidth, popupHeight);
        popup.moveTo(left, top);
      } catch (error) {
      }
      popup.focus();
    }
  });
});

const fallbackCopyText = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const showToast = (message) => {
  let toast = document.querySelector(".copy-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "copy-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
};

copyLinkButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.copyUrl;
    if (!url) {
      return;
    }

    const originalLabel = button.textContent;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        fallbackCopyText(url);
      }

      button.textContent = "복사됨";
      showToast("랜딩페이지 URL이 복사되었습니다");
      setTimeout(() => {
        button.textContent = originalLabel;
      }, 1400);
    } catch (error) {
      button.textContent = "복사실패";
      showToast("링크 복사에 실패했습니다");
      setTimeout(() => {
        button.textContent = originalLabel;
      }, 1400);
    }
  });
});
