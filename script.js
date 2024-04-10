$(document).ready(function () {
    $('#taxForm').submit(function (event) {
        event.preventDefault();
        clearErrorIcons();
        const age = $('#age').val();
        const income = parseFloat($('#income').val());
        const extraIncome = parseFloat($('#extraIncome').val()) || 0;
        const deductions = parseFloat($('#deductions').val()) || 0;
        if (!validateInputs(age, income, extraIncome, deductions)) return;
        const tax = calculateTax(age, income, extraIncome, deductions);
        displayModal(tax);
    });

    function validateInputs(age, income, extraIncome, deductions) {
        let isValid = true;
        if (!age) {
            showErrorIcon('age');
            isValid = false;
        }
        if (isNaN(income) || income <= 0) {
            showErrorIcon('income');
            isValid = false;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            showErrorIcon('extraIncome');
            isValid = false;
        }
        if (isNaN(deductions) || deductions < 0) {
            showErrorIcon('deductions');
            isValid = false;
        }
        return isValid;
    }

    function calculateTax(age, income, extraIncome, deductions) {
        let taxableIncome = income + extraIncome - deductions;
        if (taxableIncome <= 800000) {
            return 0;
        } else {
            let taxRate;
            if (age === '<40') {
                taxRate = 0.3;
            } else if (age === '≥40 & <60') {
                taxRate = 0.4;
            } else {
                taxRate = 0.1;
            }
            return (taxableIncome - 800000) * taxRate;
        }
    }

    function displayModal(tax) {
        const modal = $('#modal');
        $('#taxResult').text(`Tax to be paid: ${tax.toFixed(2)} Lakhs`);
        modal.show();
        $('.close').click(function () {
            modal.hide();
        });
        $(window).click(function (event) {
            if ($(event.target).is(modal)) {
                modal.hide();
            }
        });
    }

    function showErrorIcon(fieldId) {
        $(`#${fieldId}ErrorIcon`).css('display', 'inline-block');
    }

    function clearErrorIcons() {
        $('.error-icon').hide();
    }
});
