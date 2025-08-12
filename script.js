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



  // Function to handle login when "Check" button is clicked
async function checkResult() {
  const ID = document.getElementById('studentID').value.trim();
  const password = document.getElementById('studentPass').value.trim();
  const messageEl = document.getElementById('message');

  // Basic input validation
  if (!ID || !password) {
    messageEl.textContent = 'Please enter both ID and password.';
    return;
  }

  try {
    // Send login data to backend API
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID, password }),
    });

    // Parse JSON response
    const data = await res.json();

    // If login fails, show error message
    if (!res.ok) {
      messageEl.textContent = data.message || 'Login failed';
      return;
    }

    // If user is admin, redirect to admin panel
    if (data.role === 'admin') {
      window.location.href = '/admin.html'; // Change to your admin page URL
      return;
    }

    // If user is student, show their results
    if (data.role === 'student') {
      messageEl.textContent = '';

      // Hide login box and show results box
      document.querySelector('.login-box').style.display = 'none';
      document.querySelector('.results-box').style.display = 'block';

      // Display student image
      document.getElementById('studentImage').src = data.data.image || '';

      // Display personal details
      const detailsBox = document.getElementById('studentDetails');
      detailsBox.innerHTML = `
        <p><strong>Name:</strong> ${data.data.name || 'N/A'}</p>
        <p><strong>Gender:</strong> ${data.data.gender || 'N/A'}</p>
        <p><strong>Class:</strong> ${data.data.studentClass || 'N/A'}</p>
        <p><strong>Guardian:</strong> ${data.data.guardian || 'N/A'}</p>
        <p><strong>Teacher:</strong> ${data.data.teacher || 'N/A'}</p>
        <p><strong>Contact:</strong> ${data.data.contact || 'N/A'}</p>
      `;

      // Build results table with marks for each subject
      const resultsTable = document.getElementById('resultsTable');
      resultsTable.innerHTML = ''; // Clear existing rows

      const marks = data.data.marks || {};

      for (const subject in marks) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>${capitalize(subject)}</strong></td>
          <td>${marks[subject].term1 ?? 'N/A'}</td>
          <td>${marks[subject].term2 ?? 'N/A'}</td>
          <td>${marks[subject].term3 ?? 'N/A'}</td>
        `;
        resultsTable.appendChild(row);
      }

      // Show term positions
      document.getElementById('term1Position').textContent = `Term 1 Position: ${data.data.positions?.term1 ?? 'N/A'}`;
      document.getElementById('term2Position').textContent = `Term 2 Position: ${data.data.positions?.term2 ?? 'N/A'}`;
      document.getElementById('term3Position').textContent = `Term 3 Position: ${data.data.positions?.term3 ?? 'N/A'}`;
    }
  } catch (error) {
    messageEl.textContent = 'Error connecting to server.';
    console.error('Login error:', error);
  }
}

// Helper function to capitalize first letter of subject names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to handle "Go Back" button, resetting UI
function goBack() {
  document.querySelector('.results-box').style.display = 'none';
  document.querySelector('.login-box').style.display = 'block';

  // Clear inputs and messages
  document.getElementById('studentID').value = '';
  document.getElementById('studentPass').value = '';
  document.getElementById('message').textContent = '';
}


// funcion to add students 



