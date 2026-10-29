'use strict';

/**
 * Validates whether a given string is in DD-MM-YYYY format and represents a real calendar date.
 * Strictly rejects non-existent dates such as 31-02-2026, 29-02-2023, 31-04-2026, etc.
 *
 * @param {string} dobString - Date of birth string in DD-MM-YYYY format.
 * @returns {boolean} - True if valid calendar date, false otherwise.
 */
function isValidDob(dobString) {
    if (!dobString || typeof dobString !== 'string') {
        return false;
    }

    var regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    var match = dobString.trim().match(regex);
    if (!match) {
        return false;
    }

    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);

    // Realistic range for date of birth
    if (year < 1900 || year > 2100) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    // Check leap year
    var isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    var daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    return true;
}

/**
 * Validates whether a given phone number strictly matches the (999) 999-9999 format.
 * Rejects unformatted, partial, alphabetic, or incorrectly spaced strings.
 *
 * @param {string} phoneString - Phone number string.
 * @returns {boolean} - True if format matches (999) 999-9999, false otherwise.
 */
function isValidPhone(phoneString) {
    if (!phoneString || typeof phoneString !== 'string') {
        return false;
    }

    var regex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return regex.test(phoneString.trim());
}

/**
 * Converts a valid DD-MM-YYYY string to a JavaScript Date object (UTC-based).
 *
 * @param {string} dobString - Date of birth string in DD-MM-YYYY format.
 * @returns {Date|null} - JavaScript Date instance or null if invalid.
 */
function parseDobToDate(dobString) {
    if (!isValidDob(dobString)) {
        return null;
    }

    var parts = dobString.trim().split('-');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    return new Date(Date.UTC(year, month - 1, day));
}

module.exports = {
    isValidDob: isValidDob,
    isValidPhone: isValidPhone,
    parseDobToDate: parseDobToDate
};

