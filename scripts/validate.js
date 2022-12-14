const validateInputs = (input, object) => {
  const error = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    error.textContent = '';
    error.classList.remove(object.errorClass)
    input.classList.remove(object.inputErrorClass)
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(object.errorClass)
    input.classList.add(object.inputErrorClass)

  }
}

const disabledButton = (inputs, saveButton, object) => {
  const formValid = inputs.every(input => input.validity.valid);
  
  if (formValid) {
    saveButton.classList.remove(object.inactiveButtonClass);
    saveButton.disabled = false;
  } else {
    saveButton.classList.add(object.inactiveButtonClass);
    saveButton.disabled = true;
  }
}

const enableValidation = (object) => {
  const forms = [...document.querySelectorAll(object.formSelector)]

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(object.inputSelector)]
    const saveButton = form.querySelector(object.submitButtonSelector);
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  
    inputs.forEach(input => {
      input.addEventListener('input', function () {    
          validateInputs(input, object)
          disabledButton(inputs, saveButton, object)
        })
    })
  })

}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active' 
  }); 


