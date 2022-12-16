const validateInput = (input, validateConfig) => {
  const error = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    showError(validateConfig, input, error)
  } else {
    hideError(validateConfig, input, error)

  }
}

const showError = (validateConfig, input, error) => {
  error.textContent = '';
  error.classList.remove(validateConfig.errorClassActive)
  input.classList.remove(validateConfig.inputErrorClass)
}

const hideError = (validateConfig, input, error) => {
  error.textContent = input.validationMessage;
  error.classList.add(validateConfig.errorClassActive)
  input.classList.add(validateConfig.inputErrorClass)
}

const resetInputs = (validateConfig, form) => { 
  const popupInputs = form.querySelectorAll(validateConfig.inputSelector)
  popupInputs.forEach((errorinput) => {
    errorinput.classList.remove(validateConfig.inputErrorClass);
  })
}

const resetErrors = (validateConfig, form) => {
  const errors = form.querySelectorAll(validateConfig.errorClass);
  errors.forEach(error => {
    if(error.textContent){
      error.textContent = ''
    }
  })
}


const toggleButtonState = (inputs, saveButton, validateConfig) => {
  const formValid = inputs.every(input => input.validity.valid);
  if (formValid) {
    enableButton(saveButton, validateConfig)
  } else {
    disableButton(saveButton, validateConfig)
  }
}

const enableButton = (saveButton, validateConfig) => {
  saveButton.classList.remove(validateConfig.inactiveButtonClass);
  saveButton.disabled = false;
}

const disableButton = (saveButton, validateConfig) => {
  saveButton.classList.add(validateConfig.inactiveButtonClass);
  saveButton.disabled = true;
}


const enableValidation = (validateConfig) => {
  const forms = [...document.querySelectorAll(validateConfig.formSelector)]
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(validateConfig.inputSelector)]
    const saveButton = form.querySelector(validateConfig.submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', function () {    
          validateInput(input, validateConfig)
          toggleButtonState(inputs, saveButton, validateConfig)
        })
    })
  })

}

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active', 
  errorClass: '.popup__input-error'
}

enableValidation(validateConfig); 


