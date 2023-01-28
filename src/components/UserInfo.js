export default class UserInfo {
  constructor({nameSelector, professionSelector}) {
    this._nameSelector = nameSelector;
    this._professionSelector = professionSelector;
  }
  getUserInfo() {
    const profileFormInfo = {
        nameSelector: this._nameSelector.textContent, 
        professionSelector: this._professionSelector.textContent
    }
      return profileFormInfo
  }

  setUserInfo({name, profession}) {
    this._nameSelector.textContent = name;
    this._professionSelector.textContent = profession;
  }
}