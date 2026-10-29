'use strict';

var assert = require('chai').assert;
var dobValidationHelper = require('../../../../../cartridges/app_custom_cartridge/cartridge/scripts/helpers/dobValidationHelper');

describe('dobValidationHelper', function () {
    describe('isValidDob', function () {
        it('should accept valid dates in DD-MM-YYYY format', function () {
            assert.isTrue(dobValidationHelper.isValidDob('28-10-2026'));
            assert.isTrue(dobValidationHelper.isValidDob('01-01-2000'));
            assert.isTrue(dobValidationHelper.isValidDob('31-12-1995'));
            assert.isTrue(dobValidationHelper.isValidDob('29-02-2024')); // Leap year
        });

        it('should reject missing or empty DOB', function () {
            assert.isFalse(dobValidationHelper.isValidDob(''));
            assert.isFalse(dobValidationHelper.isValidDob(null));
            assert.isFalse(dobValidationHelper.isValidDob(undefined));
            assert.isFalse(dobValidationHelper.isValidDob('   '));
        });

        it('should reject invalid DOB format (not DD-MM-YYYY)', function () {
            assert.isFalse(dobValidationHelper.isValidDob('2026/10/28'));
            assert.isFalse(dobValidationHelper.isValidDob('28/10/2026'));
            assert.isFalse(dobValidationHelper.isValidDob('28.10.2026'));
            assert.isFalse(dobValidationHelper.isValidDob('1-1-2020'));
            assert.isFalse(dobValidationHelper.isValidDob('28-10-26'));
            assert.isFalse(dobValidationHelper.isValidDob('invalid-date'));
        });

        it('should reject impossible calendar dates (non-existent dates)', function () {
            assert.isFalse(dobValidationHelper.isValidDob('31-02-2026'), 'February 31 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('29-02-2023'), 'February 29 in non-leap year must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('31-04-2026'), 'April 31 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('31-06-2026'), 'June 31 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('31-09-2026'), 'September 31 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('31-11-2026'), 'November 31 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('00-01-2020'), 'Day 0 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('15-13-2020'), 'Month 13 must be rejected');
            assert.isFalse(dobValidationHelper.isValidDob('15-00-2020'), 'Month 0 must be rejected');
        });
    });

    describe('isValidPhone', function () {
        it('should accept valid phone numbers in (999) 999-9999 format', function () {
            assert.isTrue(dobValidationHelper.isValidPhone('(123) 456-7890'));
            assert.isTrue(dobValidationHelper.isValidPhone('(999) 999-9999'));
            assert.isTrue(dobValidationHelper.isValidPhone('(555) 012-3456'));
        });

        it('should reject missing or empty phone numbers', function () {
            assert.isFalse(dobValidationHelper.isValidPhone(''));
            assert.isFalse(dobValidationHelper.isValidPhone(null));
            assert.isFalse(dobValidationHelper.isValidPhone(undefined));
            assert.isFalse(dobValidationHelper.isValidPhone('   '));
        });

        it('should reject unformatted 10-digit phone number', function () {
            assert.isFalse(dobValidationHelper.isValidPhone('1234567890'));
        });

        it('should reject phone numbers missing the space after area code', function () {
            assert.isFalse(dobValidationHelper.isValidPhone('(123)456-7890'));
        });

        it('should reject phone numbers with missing digits', function () {
            assert.isFalse(dobValidationHelper.isValidPhone('(123) 456-789'));
            assert.isFalse(dobValidationHelper.isValidPhone('(12) 456-7890'));
        });

        it('should reject alphabetic characters in phone number', function () {
            assert.isFalse(dobValidationHelper.isValidPhone('(ABC) 456-7890'));
            assert.isFalse(dobValidationHelper.isValidPhone('(123) ABC-7890'));
            assert.isFalse(dobValidationHelper.isValidPhone('(123) 456-ABCD'));
        });
    });

    describe('parseDobToDate', function () {
        it('should convert valid DD-MM-YYYY to a JavaScript Date object', function () {
            var date = dobValidationHelper.parseDobToDate('28-10-2026');
            assert.isNotNull(date);
            assert.instanceOf(date, Date);
            assert.strictEqual(date.getUTCFullYear(), 2026);
            assert.strictEqual(date.getUTCMonth(), 9); // October is index 9 (0-indexed)
            assert.strictEqual(date.getUTCDate(), 28);
        });

        it('should return null for invalid dates', function () {
            assert.isNull(dobValidationHelper.parseDobToDate('31-02-2026'));
            assert.isNull(dobValidationHelper.parseDobToDate('invalid'));
            assert.isNull(dobValidationHelper.parseDobToDate(''));
        });
    });
});

