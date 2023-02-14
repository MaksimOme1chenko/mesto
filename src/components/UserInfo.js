export default class UserInfo {
  constructor(nameSelector, professionSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._professionSelector = professionSelector;
    this._avatarSelector = avatarSelector
  }
  getUserInfo() {
    const profileFormInfo = {
        nameSelector: this._nameSelector.textContent, 
        professionSelector: this._professionSelector.textContent
    }
      return profileFormInfo
  }

  setUserInfo({ name, about, avatar }) {
    this._nameSelector.textContent =  name;
    this._professionSelector.textContent =  about;
    this._avatarSelector.src =  avatar;
  }
}