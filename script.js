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



// script for the admin panel 

  document.addEventListener("contextmenu", e => e.preventDefault());

  document.onkeydown = function(e) {
    if (
      e.keyCode == 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
      return false;
    }
  };

    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('mainContent');
    const cornerToggle = document.getElementById('cornerToggle');

    function toggleSidebar() {
      sidebar.classList.toggle('hidden');
      main.classList.toggle('full-width');

      // Show corner toggle if sidebar is hidden
      if (sidebar.classList.contains('hidden')) {
        cornerToggle.style.display = 'block';
      } else {
        cornerToggle.style.display = 'none';
      }
    }
 
    // TAB switching logic - only added, original JS is untouched
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
  
        // Add active class to clicked tab and corresponding content
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  
    // YOUR ORIGINAL JAVASCRIPT BELOW (unchanged)
  
    const SHEETDB_URL = "https://sheetdb.io/api/v1/4t7b2o251izk0";
    let students = [];
    let selectedStudent = null;
  
    async function fetchStudents() {
      const res = await fetch(SHEETDB_URL);
      students = await res.json();
      populateTable();
    }
  
    function populateTable() {
      const tbody = document.querySelector("#studentsTable tbody");
      tbody.innerHTML = "";
      students.forEach(st => {
        const row = `<tr>
          <td>${st.ID}</td>
          <td>${st.Name}</td>
          <td>${st.Class}</td>
          <td><button onclick='openModal("${st.ID}")'>Edit Grade</button></td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }
  
    function filterTable() {
      const query = document.getElementById("searchInput").value.toLowerCase();
      const rows = document.querySelectorAll("#studentsTable tbody tr");
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    }
  
    function openModal(id) {
      selectedStudent = students.find(s => s.ID === id);
      document.getElementById("modalID").innerText = id;
      document.getElementById("termSelect").value = "1";
      document.getElementById("subjectSelect").value = "Math";
      loadGrade();
      document.getElementById("editModal").style.display = "flex";
    }
  
    function closeModal() {
      document.getElementById("editModal").style.display = "none";
    }
  
    function loadGrade() {
      const term = document.getElementById("termSelect").value;
      const subject = document.getElementById("subjectSelect").value;
      const key = `${subject} Term ${term} Marks`;
      const grade = selectedStudent[key] || "";
      document.getElementById("gradeInput").value = grade;
    }
  
    document.getElementById("termSelect").onchange = loadGrade;
    document.getElementById("subjectSelect").onchange = loadGrade;
  
    async function saveGrade() {
      const term = document.getElementById("termSelect").value;
      const subject = document.getElementById("subjectSelect").value;
      const key = `${subject} Term ${term} Marks`;
      const newGrade = document.getElementById("gradeInput").value;
  
      const body = { [key]: newGrade };
      await fetch(`${SHEETDB_URL}/ID/${selectedStudent.ID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: body })
      });
  
      selectedStudent[key] = newGrade;
      alert("Grade updated!");
      closeModal();
    }
  
    fetchStudents();
 
  
    document.getElementById("studentForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const status = document.getElementById("status");
      status.textContent = "Uploading image...";
  
      // Get form values
      const formData = new FormData(form);
      const imageFile = formData.get("image");
  
      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append("upload_preset", "student_upload");
  
      const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dppemrnmw/image/upload", {
        method: "POST",
        body: cloudinaryData
      });
  
      if (!cloudinaryRes.ok) {
        status.textContent = "❌ Image upload failed.";
        return;
      }
  
      const cloudinaryResult = await cloudinaryRes.json();
      const imageUrl = cloudinaryResult.secure_url;
  
      // Prepare data to send to SheetDB
      const dataToSend = {
        data: {
          id: formData.get("id"),
          password: formData.get("password"),
          name: formData.get("name"),
          gender: formData.get("gender"),
          class: formData.get("class"),
          guardian: formData.get("guardian"),
          teacher: formData.get("teacher"),
          contact: formData.get("contact"),
          image: imageUrl,
          role: formData.get("role")
        }
      };
  
      status.textContent = "Sending to SheetDB...";
  
      // Send to SheetDB
      const sheetRes = await fetch("https://sheetdb.io/api/v1/4t7b2o251izk0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
  
      if (sheetRes.ok) {
        status.textContent = "✅ Student added successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Failed to send data to Google Sheets.";
      }
    });
 
    document.getElementById("studentForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const status = document.getElementById("status");
      const submitButton = form.querySelector("button[type='submit']");
  
      submitButton.disabled = true;
      status.textContent = "Uploading image...";
  
      // Get form values
      const formData = new FormData(form);
      const imageFile = formData.get("image");
  
      try {
        // Upload image to Cloudinary
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", imageFile);
        cloudinaryData.append("upload_preset", "student_upload");
  
        const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dppemrnmw/image/upload", {
          method: "POST",
          body: cloudinaryData
        });
  
        if (!cloudinaryRes.ok) {
          throw new Error("Image upload failed");
        }
  
        const cloudinaryResult = await cloudinaryRes.json();
        const imageUrl = cloudinaryResult.secure_url;
  
        // Prepare data to send to SheetDB
        const dataToSend = {
          data: {
            ID: formData.get("id"),
            Password: formData.get("password"),
            Name: formData.get("name"),
            Gender: formData.get("gender"),
            Class: formData.get("class"),
            Guardian: formData.get("guardian"),
            Teacher: formData.get("teacher"),
            Contact: formData.get("contact"),
            Image: imageUrl,
            Role: formData.get("role"),
            // Marks and positions can be added later in a separate form
          }
        };
  
        status.textContent = "Sending to SheetDB...";
  
        // Send to SheetDB
        const sheetRes = await fetch("https://sheetdb.io/api/v1/4t7b2o251izk0", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        });
  
        if (!sheetRes.ok) {
          throw new Error("Failed to send data to Google Sheets");
        }
  
        status.textContent = "✅ Student added successfully!";
        form.reset();
  
      } catch (error) {
        status.textContent = `❌ ${error.message}`;
      } finally {
        submitButton.disabled = false;
      }
    });
  
  
    // this below if you want to add grades
    document.getElementById("gradesForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const status = document.getElementById("gradesStatus");
      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;
      status.textContent = "Submitting grades...";
  
      const studentID = form.studentID.value.trim();
      const term = form.term.value;
      const subject = form.subject.value;
      const marks = form.marks.value;
      const position = form.position.value.trim();
  
      const marksColumn = `${subject} ${term} Marks`;
      const positionColumn = `${term} Position`;
  
      const dataToSend = {
        data: {
          [marksColumn]: marks,
        }
      };
  
      if (position) {
        dataToSend.data[positionColumn] = position;
      }
  
      try {
        // Use PUT method and add studentId filter in URL to update existing record
        const response = await fetch(`https://sheetdb.io/api/v1/4t7b2o251izk0/ID/${studentID}`, {
          method: "PUT", // or PATCH (SheetDB supports both)
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        });
  
        if (!response.ok) throw new Error("Failed to submit grades");
  
        status.textContent = "✅ Grades updated successfully!";
        form.reset();
      } catch (error) {
        status.textContent = `❌ ${error.message}`;
        console.error("Error submitting grades:", error);
      } finally {
        submitButton.disabled = false;
      }
    });
  
    // Logout function
    function logout() {
      // Redirect to login page
      window.location.href = "index.html";
    }
  
  
    //this below is for view and edit students
    // Function to fetch all students and display them in the table
  
  
  
    const API_URL = "https://sheetdb.io/api/v1/4t7b2o251izk0";
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dppemrnmw/image/upload";
    const CLOUDINARY_PRESET = "student_upload";
  
    async function fetchAllStudents() {
      const status = document.getElementById("statusText");
      status.textContent = "Fetching students...";
      try {
        const response = await fetch(API_URL);
        const students = await response.json();
        populateStudentsTable(students);
        status.textContent = `✅ ${students.length} students found`;
      } catch (err) {
        status.textContent = "❌ Failed to fetch students";
        console.error(err);
      }
    }
  
    function populateStudentsTable(students) {
      const tbody = document.querySelector("#studentList tbody");
      tbody.innerHTML = "";
      students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.Name}</td>
            <td>${student.Class}</td>
            <td>${student.Gender}</td>
            <td>${student.Contact}</td>
            <td>${student.Guardian}</td>
            <td>${student.Teacher}</td>
            <td>
              <button class="edit-button" onclick='openEditModal(${JSON.stringify(student)})'>Edit</button>
              <button onclick='deleteStudent("${student.ID}")' class="edit-button" style="background:#e74c3c;">Delete</button>
            </td>
          `;
        tbody.appendChild(row);
      });
    }
  
    function searchStudents() {
      const input = document.getElementById("searchInput2").value.toLowerCase();
      const rows = document.querySelectorAll("#studentList tbody tr");
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
      });
    }
  
    function openEditModal(student) {
      document.getElementById("editID").value = student.ID || "";
      document.getElementById("editName").value = student.Name || "";
      document.getElementById("editClass").value = student.Class || "";
      document.getElementById("editGender").value = student.Gender || "";
      document.getElementById("editContact").value = student.Contact || "";
      document.getElementById("editGuardian").value = student.Guardian || "";
      document.getElementById("editTeacher").value = student.Teacher || "";
      document.getElementById("editPassword").value = student.Password || "";
      document.getElementById("imagePreview").src = student.Image || "";
  
      document.getElementById("editStudentModal").style.display = "block";
    }
  
    function closeModal2() {
      document.getElementById("editStudentModal").style.display = "none";
      document.getElementById("editImageInput").value = "";
    }
  
    async function saveEdit() {
      const id = document.getElementById("editID").value;
      const fileInput = document.getElementById("editImageInput");
      let imageUrl = document.getElementById("imagePreview").src;
  
      if (fileInput.files.length > 0) {
        const imageData = new FormData();
        imageData.append("file", fileInput.files[0]);
        imageData.append("upload_preset", CLOUDINARY_PRESET);
  
        try {
          const uploadRes = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: imageData
          });
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.secure_url;
        } catch (err) {
          alert("❌ Image upload failed");
          return;
        }
      }
  
      const updatedData = {
        data: {
          Name: document.getElementById("editName").value,
          Class: document.getElementById("editClass").value,
          Gender: document.getElementById("editGender").value,
          Contact: document.getElementById("editContact").value,
          Guardian: document.getElementById("editGuardian").value,
          Teacher: document.getElementById("editTeacher").value,
          Password: document.getElementById("editPassword").value,
          Image: imageUrl
        }
      };
  
      try {
        const res = await fetch(`${API_URL}/ID/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData)
        });
  
        if (!res.ok) throw new Error("Update failed");
  
        alert("✅ Student updated!");
        closeModal2();
        fetchAllStudents();
      } catch (err) {
        alert("❌ Failed to update student");
        console.error(err);
      }
    }
  
    async function deleteStudent(id) {
      const confirmDelete = confirm("Are you sure you want to delete this student?");
      if (!confirmDelete) return;
  
      try {
        const res = await fetch(`${API_URL}/ID/${id}`, {
          method: "DELETE"
        });
  
        if (!res.ok) throw new Error("Delete failed");
  
        alert("✅ Student deleted!");
        fetchAllStudents();
      } catch (err) {
        alert("❌ Failed to delete student");
        console.error(err);
      }
    }
  