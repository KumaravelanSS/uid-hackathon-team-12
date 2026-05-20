document.getElementById('sportsform').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('student-name').value.trim();
    const regNo = document.getElementById('register-number').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const mobile = document.getElementById('mobile-number').value.trim();
    const dept = document.getElementById('department').value.trim();
    const year = document.getElementById('year-of-study').value.trim();
    const categorySelect = document.getElementById('sports-category');
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
    const categoryValue = categorySelect.value;
    const teamSize = parseInt(document.getElementById('team-size').value, 10);
    const teamName = document.getElementById('team-name').value.trim();

    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => span.style.display = 'none');

    const previewBox = document.getElementById('preview-box');
    previewBox.style.display = 'none';

    let isValid = true;

    if (name === "") {
        document.getElementById('err-name').style.display = 'inline';
        isValid = false;
    }

    if (regNo === "") {
        document.getElementById('err-reg').style.display = 'inline';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('err-email').style.display = 'inline';
        isValid = false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        document.getElementById('err-mobile').style.display = 'inline';
        isValid = false;
    }

    if (dept === "") {
        document.getElementById('err-dept').style.display = 'inline';
        isValid = false;
    }

    if (year === "") {
        document.getElementById('err-year').style.display = 'inline';
        isValid = false;
    }

    if (categoryValue === "") {
        document.getElementById('err-cat').style.display = 'inline';
        isValid = false;
    }

    if (isNaN(teamSize) || teamSize < 2 || teamSize > 6) {
        document.getElementById('err-size').style.display = 'inline';
        isValid = false;
    }

    if (teamName === "") {
        document.getElementById('err-team').style.display = 'inline';
        isValid = false;
    }

    if (isValid) {
        const alertBox = document.getElementById('registration-alert');
        alertBox.textContent = "Registration form submitted successfully!";
        alertBox.style.color = "green";
        alertBox.style.fontWeight = "bold";

        const previewText = document.getElementById('preview-text');
        previewText.innerHTML = `
            <strong>Team Name:</strong> ${teamName} <br>
            <strong>Sport:</strong> ${categoryText} <br>
            <strong>Team Size:</strong> ${teamSize} members <br>
            <strong>Captain Name:</strong> ${name} (${regNo}) <br>
            <strong>Contact:</strong> ${email} | ${mobile} <br>
            <strong>Department/Year:</strong> ${dept} - Year ${year}
        `;

        previewBox.style.display = 'block';
        document.getElementById('sportsform').reset();
    }
});
