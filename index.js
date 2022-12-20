"use strict";

validate1();
validate2();
validate3();

function validate1()
{
    const txtEmail = document.querySelector("#mail1");
    txtEmail.addEventListener("input", () => {

        if (txtEmail.validity.typeMismatch)
        {
            //set message
            txtEmail.setCustomValidity("I am expecting an e-mail address!");
            //show message
            txtEmail.reportValidity();
        }
        else 
        {
            //set as valid
            txtEmail.setCustomValidity("");
        }
    });
}

function validate2()
{
    const txtEmail = document.querySelector("#mail2");
    const spanError = document.querySelector("#mail2 + span.error");
    const form = document.querySelector("#form2");

    spanError.addEventListener("input", () => {

        if (txtEmail.validity.valid)
        {
            spanError.textContent = ""; // Reset the content of the message
            spanError.className = "error"; // Reset the visual state of the message
        }
        else
        {
            showError();
        }
    });

    form.addEventListener("submit", (e) => {

        if (!txtEmail.validity.valid)
        {
            showError();
            e.preventDefault();
        }
    });

    function showError()
    {
        if (txtEmail.validity.valueMissing)
        {
            spanError.textContent = "You need to enter an e-mail address.";
        }
        else if (txtEmail.validity.typeMismatch)
        {
            spanError.textContent = "Entered value needs to be an e-mail address.";
        }
        else if (txtEmail.validity.tooShort)
        {
            spanError.textContent = `E-mail should be at least ${txtEmail.minLength} characters
            ; you entered ${txtEmail.value.length}.`
        }
    }
}

function validate3()
{
    const form = document.querySelector("#form3");
    const txtEmail = document.querySelector("#mail3");
    const spanError = txtEmail.nextElementSibling;

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    window.addEventListener("load", () => {

        const isValid = txtEmail.value.length === 0 || emailPattern.test(txtEmail.value);
        txtEmail.className = isValid ? "valid" : "invalid";
    });

    txtEmail.addEventListener("input", () => {

        const isValid = txtEmail.value.length === 0 || emailPattern.test(txtEmail.value);

        if (isValid)
        {
            txtEmail.className = "valid";
            spanError.textContent = "";
        }
        else
        {
            txtEmail.className = "invalid";
        }
    });

    form.addEventListener("submit", (e) => {

        const isShort = txtEmail.value.length < 8;
        const isEmpty = txtEmail.value.length === 0;
        const isMismatch = !emailPattern.test(txtEmail.value);

        if (isShort)
        {
            e.preventDefault();
            txtEmail.className = "invalid";
            spanError.textContent = `Email is too short, you need at least 8 Characters, you entered ${txtEmail.value.length}`;
        }
        else if (isEmpty)
        {
            e.preventDefault();
            txtEmail.className = "invalid";
            spanError.textContent = "You need to enter an Email Address";
        }
        else if (isMismatch)
        {
            e.preventDefault();
            txtEmail.className = "invalid";
            spanError.textContent = "The email you entered is invalid";
        }
        else
        {
            txtEmail.className = "valid";
        }
    });
}