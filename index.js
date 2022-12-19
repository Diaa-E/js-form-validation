"use strict";

validate1();
validate2();

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