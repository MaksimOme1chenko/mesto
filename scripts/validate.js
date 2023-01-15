export class FormValidator {
  constructor(validateConfig, form) {
    this._form = form;
    this._validateConfig = validateConfig;
    this._popupInputs = this._form.querySelectorAll(this._validateConfig.inputSelector);
    this._saveButton = this._form.querySelector(this._validateConfig.submitButtonSelector);
    this._errors = this._form.querySelectorAll(this._validateConfig.errorClass);
  }

  _showError = (input, error) => {
    error.textContent = '';
    error.classList.remove(this._validateConfig.errorClassActive);
    input.classList.remove(this._validateConfig.inputErrorClass);
  }

  _hideError = (input, error) => {
    error.textContent = input.validationMessage;
    error.classList.add(this._validateConfig.errorClassActive);
    input.classList.add(this._validateConfig.inputErrorClass);
  }

  _validateInput = (input) => {
    const error = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      this._showError(input, error)
    } else {
      this._hideError(input, error)
    }
  }

  _toggleButtonState = () => {
    const formValid = Array.from(this._popupInputs).every(input => {
      return input.validity.valid});
    if (formValid) {
      this._enableButton()
    } else {
      this._disableButton()
    }
  }

  _enableButton = () => {
    this._saveButton.classList.remove(this._validateConfig.inactiveButtonClass);
    this._saveButton.disabled = false;
  }
  
  _disableButton = () => {
    this._saveButton.classList.add(this._validateConfig.inactiveButtonClass);
    this._saveButton.disabled = true;
  }

  resetErrors = () => {
    this._errors.forEach(error => {
      if(error.textContent){
        error.textContent = ''
      }
    })
  }

  resetInputs = () => { 
    this._popupInputs.forEach((errorinput) => {
      errorinput.classList.remove(this._validateConfig.inputErrorClass);
    })
    this._toggleButtonState()
  }

  enableValidation = () => {
    this._popupInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState();
      })
    })
  }
}



