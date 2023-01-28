export default class FormValidator {
  constructor(validateConfig, form) {
    this._form = form;
    this._validateConfig = validateConfig;
    this._popupInputs = this._form.querySelectorAll(this._validateConfig.inputSelector);
    this._saveButton = this._form.querySelector(this._validateConfig.submitButtonSelector);
    this._errors = this._form.querySelectorAll(this._validateConfig.errorClass);
  }

  _hideError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._validateConfig.errorClassActive);
    input.classList.remove(this._validateConfig.inputErrorClass);
  }

  _showError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._validateConfig.errorClassActive);
    input.classList.add(this._validateConfig.inputErrorClass);
  }

  _validateInput = (input) => {
    if (input.validity.valid) {
      this._hideError(input)
    } else {
      this._showError(input)
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

  resetInputs = () => { 
    this._popupInputs.forEach((errorinput) => {
      this._hideError(errorinput)
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



