(function () {
  "use strict";

 
  function generateStars(container, count, sizePx, spreadVh) {
    const shadows = [];
    const w = window.innerWidth;
    const h = window.innerHeight * spreadVh;
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * w);
      const y = Math.floor(Math.random() * h);
      shadows.push(`${x}px ${y}px #fff`);
    }
    container.style.width = sizePx + "px";
    container.style.height = sizePx + "px";
    container.style.boxShadow = shadows.join(",");
  }

  const starsFar  = document.querySelector(".layer--stars-far");
  const starsMid  = document.querySelector(".layer--stars-mid");
  const starsNear = document.querySelector(".layer--stars-near");

 
  generateStars(starsFar,  220, 2, 8);
  generateStars(starsMid,  140, 3, 8);
  generateStars(starsNear,  70, 4, 8);

  const layers = Array.from(document.querySelectorAll(".layer, .comet"));
  const speeds = layers.map((el) => parseFloat(el.dataset.speed) || 0);

  let targetScroll = window.scrollY;
  let currentScroll = targetScroll;
  const EASE = 0.08; 

  window.addEventListener(
    "scroll",
    () => {
      targetScroll = window.scrollY;
    },
    { passive: true }
  );

  function animate() {
    
    currentScroll += (targetScroll - currentScroll) * EASE;

    layers.forEach((el, i) => {
      const offset = -currentScroll * speeds[i];
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      generateStars(starsFar,  220, 2, 8);
      generateStars(starsMid,  140, 3, 8);
      generateStars(starsNear,  70, 4, 8);
    }, 200);
  });
})();
