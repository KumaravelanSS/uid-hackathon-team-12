function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const now = new Date();
        clockElement.textContent = now.toLocaleString(); 
    }
}
updateClock();
setInterval(updateClock, 1000);

let totalSubmissions = 0;

const mobileInput = document.getElementById('mobile-number');
if (mobileInput) {
    mobileInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
}

const sportsFormElement = document.getElementById('sportsform');
if (sportsFormElement) {
    sportsFormElement.addEventListener('submit', function(event) {
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
        if (previewBox) previewBox.style.display = 'none';

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
            if (alertBox) {
                alertBox.textContent = "Registration form submitted successfully!";
                alertBox.style.color = "green";
                alertBox.style.fontWeight = "bold";
            }

            const previewText = document.getElementById('preview-text');
            if (previewText) {
                previewText.innerHTML = `<strong>Team Name:</strong> ${teamName} <br>
                    <strong>Sport:</strong> ${categoryText} <br>
                    <strong>Team Size:</strong> ${teamSize} members <br>
                    <strong>Captain Name:</strong> ${name} (${regNo}) <br>
                    <strong>Contact:</strong> ${email} | ${mobile} <br>
                    <strong>Department/Year:</strong> ${dept} - Year ${year}`;
            }

            if (previewBox) previewBox.style.display = 'block';

            totalSubmissions++;
            const globalCountElement = document.getElementById('global-project-count');
            if (globalCountElement) {
                globalCountElement.textContent = totalSubmissions;
            }

            sportsFormElement.reset();
        }
    });
}

let feedbackRecords = [];

const feedbackFormElement = document.getElementById('feedback-form');
if (feedbackFormElement) {
    feedbackFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const fbName = document.getElementById('fb-name').value.trim();
        const fbReg = document.getElementById('fb-reg').value.trim();
        const fbCatSelect = document.getElementById('fb-cat');
        const fbCatValue = fbCatSelect.value;
        const fbCatText = fbCatSelect.options[fbCatSelect.selectedIndex].text;
        const fbRatingSelect = document.getElementById('fb-rating');
        const fbRatingValue = fbRatingSelect.value;
        const fbComments = document.getElementById('fb-comments').value.trim();

        const fbAlert = document.getElementById('feedback-alert');
        const logsContainer = document.getElementById('logs-container');

        const errorSpans = document.querySelectorAll('.error-msg');
        errorSpans.forEach(span => span.style.display = 'none');

        let isFbValid = true;

        if (fbName === "") {
            document.getElementById('err-fb-name').style.display = 'inline';
            isFbValid = false;
        }

        if (fbReg === "") {
            document.getElementById('err-fb-reg').style.display = 'inline';
            isFbValid = false;
        }

        if (fbCatValue === "") {
            alert("Please select the Event Attended.");
            isFbValid = false;
        }

        if (fbRatingValue === "") {
            alert("Please provide a Rating score selection.");
            isFbValid = false;
        }

        if (fbComments.length < 20) {
            document.getElementById('err-fb-comm').style.display = 'inline';
            isFbValid = false;
        }

        if (isFbValid) {
            const ratingScore = parseInt(fbRatingValue, 10);
            
            feedbackRecords.push(ratingScore);

            const sum = feedbackRecords.reduce((acc, curr) => acc + curr, 0);
            const avgRating = (sum / feedbackRecords.length).toFixed(1);

            if (fbAlert) {
                fbAlert.textContent = "Feedback submitted successfully!";
                fbAlert.style.color = "green";
                fbAlert.style.fontWeight = "bold";
                fbAlert.style.marginBottom = "1rem";
            }

            const reviewLogCard = document.createElement('div');
            reviewLogCard.style.border = "1px solid gray";
            reviewLogCard.style.padding = "1rem";
            reviewLogCard.style.marginBottom = "1rem";
            reviewLogCard.style.background = "white";
            reviewLogCard.style.borderRadius = "4px";

            reviewLogCard.innerHTML = `
                <p><strong>Player:</strong> ${fbName} (${fbReg})</p>
                <p><strong>Event:</strong> ${fbCatText} | <strong>Rating Given:</strong> ${ratingScore}/5</p>
                <p><strong>Comments:</strong> "${fbComments}"</p>
                <hr style="border: 0; border-top: 1px dashed gray; margin: 0.5rem 0;">
                <p style="color: blue; font-weight: bold; margin: 0;">📊 Metrics Feed Summary: Total Reviews: ${feedbackRecords.length} | Average Rating Score: ${avgRating} / 5.0</p>
            `;

            if (logsContainer) {
                logsContainer.insertBefore(reviewLogCard, logsContainer.firstChild);
            }

            feedbackFormElement.reset();
        }
    });
}
