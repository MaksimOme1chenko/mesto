export default class UserInfo {
  constructor(name, profession, avatar) {
    this._name = name;
    this._profession = profession;
    this._avatar = avatar
  }
  getUserInfo() {
    const profileFormInfo = {
        nameSelector: this._name.textContent, 
        professionSelector: this._profession.textContent
    }
      return profileFormInfo
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent =  name;
    this._profession.textContent =  about;
    this._avatar.src =  avatar;
  }
}