document.addEventListener("DOMContentLoaded", function() {
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const yearsOutput = document.querySelector(".lower-container .years");
    const monthsOutput = document.querySelector(".lower-container .months");
    const daysOutput = document.querySelector(".lower-container .days");
    const icon = document.querySelector(".icon-arrow");
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }
    function setError(input, message) {
        input.style.borderColor = "red";
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }
    function clearError(input) {
        input.style.borderColor = "";
        const errorElement = input.nextElementSibling;
        if (errorElement) {
            errorElement.style.display = "none";
        }
    }
    function calculateAge() {
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        let isValid = true;
        if (!day) {
            setError(dayInput, "This field is required");
            isValid = false;
        } else if (isNaN(day) || day < 1 || day > 31) {
            setError(dayInput, "Must be a valid day");
            isValid = false;
        } else {
            clearError(dayInput);
        }
        if (!month) {
            setError(monthInput, "This field is required");
            isValid = false;
        } else if (isNaN(month) || month < 1 || month > 12) {
            setError(monthInput, "Must be a valid month");
            isValid = false;
        } else {
            clearError(monthInput);
        }
        const currentYear = new Date().getFullYear();
        if (!year) {
            setError(yearInput, "This field is required");
            isValid = false;
        } else if (isNaN(year) || year < 1900) {
            setError(yearInput, "Must be a valid year");
            isValid = false;
        } else if (year > currentYear) {
            setError(yearInput, "Must be in the past");
            isValid = false;
        } else {
            clearError(yearInput);
        }
        if (!isValid) {
            return;
        }
        if (month === 2 && isLeapYear(year)) {
            months[1] = 29;
        } else {
            months[1] = 28;
        }
        if (day > months[month - 1]) {
            setError(dayInput, "Must be a valid day");
            return;
        }
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();
        if (ageDays < 0) {
            ageMonths--;
            ageDays += months[(today.getMonth() - 1 + 12) % 12];
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        yearsOutput.innerHTML = `${ageYears} <span class="name"></span>`;
        monthsOutput.innerHTML = `${ageMonths} <span class="name"></span>`;
        daysOutput.innerHTML = `${ageDays} <span class="name"></span>`;
    }
    icon.addEventListener("click", calculateAge);
});