import AuthModel from "../../data/auth-model.js";

export default class RegisterPresenter {
  constructor(view, auth) {
    this.view = view;
    this.auth = auth;
    this.model = new AuthModel();
  }

  async onSubmitRegister(name, email, password) {
    if (!name || !email || !password) {
      this.view.showMessage("Please fill in all fields", "red");
      return;
    }

    if (!this.model.validateEmail(email)) {
      this.view.showMessage("Please enter a valid email address", "red");
      return;
    }

    if (!this.model.validatePassword(password)) {
      this.view.showMessage(
        "Password must contain at least 8 characters, one letter, and one number",
        "red"
      );
      return;
    }

    try {
      const data = await this.model.register({ name, email, password });

      console.log("Registration Response:", data); 

      this.view.showMessage("Registration successful!", "green");

      const loginData = await this.model.login(email, password); 
      this.auth.login(loginData.loginResult.token);

      setTimeout(() => {
        window.location.hash = "#/login"; 
      }, 500);
    } catch (error) {
      console.error("Registration error:", error);
      this.view.showMessage(error.message || "Registration failed", "red");
    }
  }
}
