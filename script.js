function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}



  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const targetValue = counter.getAttribute('data-target');
    const isPercent = targetValue.includes('%');
    const target = parseFloat(targetValue);
    const duration = 2000; // Total duration in ms
    const frameRate = 30;  // Updates per second
    const totalSteps = Math.floor(duration / (1000 / frameRate));
    let currentStep = 0;

    const startValue = parseFloat(counter.innerText.replace('%', '')) || 0;
    const increment = (target - startValue) / totalSteps;

    const counterInterval = setInterval(() => {
      currentStep++;
      let currentValue = startValue + increment * currentStep;

      if (currentStep >= totalSteps) {
        currentValue = target;
        clearInterval(counterInterval);
      }

      counter.innerText = isPercent
        ? Math.round(currentValue) + '%'
        : Math.round(currentValue).toLocaleString();
    }, 1000 / frameRate);
  });

