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



  // function to handle the log in page 
  

const scriptURL = "https://script.google.com/macros/s/AKfycbxHrsZ_TMmtSfRkEwuj0c-QbDUjzLdjWBDbbTcN8vuHUqOzue1N9-S6w_lrqFwV-tFykg/exec";

async function checkResult() {
    const userID = document.getElementById("studentID").value.trim();
    const userPass = document.getElementById("studentPass").value.trim();
    const message = document.getElementById("message");
    const adminID = "admin123";
    const adminPassword = "password";

    if (!userID || !userPass) {
        message.textContent = "Please enter both ID and Password.";
        return;
    }

    // ✅ Check if user is admin first
    if (userID === adminID && userPass === adminPassword) {
        window.location.href = "ADMIN.html";
        return; // 🔥 Prevent the rest of the function from running
    }

    try {
        const response = await fetch(scriptURL);
        const data = await response.json();

        if (!Array.isArray(data)) {
            message.textContent = "Data format error. Check Google Sheets structure.";
            return;
        }

        let matchedUser = data.find(user =>
            String(user.ID).trim() === userID &&
            String(user.Password).trim() === userPass
        );

        if (matchedUser) {
            displayResults(matchedUser);
        } else {
            message.textContent = "Incorrect ID or Password. Please try again.";
        }
    } catch (error) {
        message.textContent = "Error fetching data. Try again later.";
    }
}



function displayResults(student) {
    document.querySelector(".login-box").style.display = "none";
    document.querySelector(".results-box").style.display = "block";

    document.getElementById("studentDetails").innerHTML = `
        <p><strong>Name:</strong> ${student.Name}</p>
        <p><strong>Gender:</strong> ${student.Gender}</p>
        <p><strong>ID:</strong> ${student.ID}</p>
        <p><strong>Class:</strong> ${student.Class}</p>
        <p><strong>Guardian:</strong> ${student.Guardian}</p>
        <p><strong>Teacher:</strong> ${student.Teacher}</p>
        <p><strong>Contact:</strong> ${student.Contact}</p>
    `;

    const studentImage = document.getElementById("studentImage");

if (student.Image && student.Image.trim() !== "") {
    let imageURL = student.Image.trim();
    console.log("Original Image URL from Google Sheets:", imageURL);

    // ✅ Convert Google Drive link if needed
    const match = imageURL.match(/\/d\/(.+?)\//);
    if (match) {
        const fileID = match[1];
        // Use alternative Google link
        imageURL = `https://lh3.googleusercontent.com/d/${fileID}=s400`;
        console.log("Converted Google Drive Image URL:", imageURL);
    }

    studentImage.src = imageURL;
    studentImage.style.display = "flex";

    studentImage.onerror = function () {
        console.error("Image failed to load:", imageURL);
        studentImage.style.display = "none";
    };
} else {
    console.warn("No image found for student.");
    studentImage.style.display = "none";
}

    

    // Populate Results Table
    const resultsTable = document.getElementById("resultsTable");
    resultsTable.innerHTML = `
        <tr>
            <th>Subject</th>
            <th>Term 1</th>
            <th>Term 2</th>
            <th>Term 3</th>
        </tr>
    `;

    const subjects = [
        "Math", "English", "Science", "Social Studies", "History",
        "Geography", "Physics", "Chemistry", "Biology", "ICT",
        "Religious Studies", "Physical Education", "Art"
    ];

    subjects.forEach(subject => {
        resultsTable.innerHTML += `
            <tr>
                <td>${subject}</td>
                <td>${student[`${subject} Term 1 Marks`] || "-"}</td>
                <td>${student[`${subject} Term 2 Marks`] || "-"}</td>
                <td>${student[`${subject} Term 3 Marks`] || "-"}</td>
            </tr>
        `;
    });

    document.getElementById("term1Position").textContent = `Term 1 Position: ${student["Term 1 Position"] || "N/A"}`;
    document.getElementById("term2Position").textContent = `Term 2 Position: ${student["Term 2 Position"] || "N/A"}`;
    document.getElementById("term3Position").textContent = `Term 3 Position: ${student["Term 3 Position"] || "N/A"}`;
}

function goBack() {
    document.querySelector(".results-box").style.display = "none";
    document.querySelector(".login-box").style.display = "block";
}

