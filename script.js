$(document).ready(function () {

    //Handling form submission
    $('#taxForm').submit(function (event) {
        event.preventDefault();
        clearErrorIcons();
        const age = $('#age').val();
        const income = parseFloat($('#income').val());
        const extraIncome = $('#extraIncome').val().length === 0 ? 0 : parseFloat($('#extraIncome').val);
        const deductions = $('#deductions').val().length === 0 ? 0 : parseFloat($('#extraIncome').val);
        //Handling fields validation
        if (!validateInputs(age, income, extraIncome, deductions)) return;
        const tax = calculateTax(age, income, extraIncome, deductions);
        displayModal(tax);
    });

    //Function to validate inputs
    function validateInputs(age, income, extraIncome, deductions) {
        let isValid = true;
        if (!age) {
            showErrorIcon('age', 'Please enter a valid age');
            isValid = false;
        }
        if (isNaN(income) || income <= 0) {
            showErrorIcon('income', 'Please enter a valid income');
            isValid = false;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            showErrorIcon('extraIncome', 'Please enter a valid income');
            isValid = false;
        }
        if (isNaN(deductions) || deductions < 0) {
            showErrorIcon('deductions', 'Please enter a valid income');
            isValid = false;
        }
        return isValid;
    }

    //Function to calculate tax
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

    //Function to display Modal
    function displayModal(tax) {
        const modal = $('#modal');
        $('#taxResult').text(`Tax to be paid: ${tax.toFixed(2)}`);
        modal.show();
        $('#close').click(function () {
            modal.hide();
        });
    }

    //Function to show error message
    function showErrorIcon(fieldId, message) {
        $(`#${fieldId}ErrorIcon`).css('display', 'inline-block').attr('title', message);
    }

    //Function to clear error message
    function clearErrorIcons() {
        $('.error-icon').hide();
    }
});
