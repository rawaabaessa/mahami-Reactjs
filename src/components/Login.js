import "../assets/css/style.css";
import SignipImg from "../assets/img/sign-in-img.svg";
import Logo from "../assets/img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formInput, setformInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("user")) || [];
    const loggedUser = users.find(
      (user) =>
        user.email === formInput.email && user.password === formInput.password
    );
    if (loggedUser) {
      localStorage.setItem("loggedInUser", true);
      navigate("/dashboard", { state: loggedUser.id });
    } else {
      setError("البريد الالكتروني او كلمة المرور غير صحيحة");
    }
  };
  return (
    <div className="Container">
      <div className="form-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <img src={Logo} alt="" className="logo" />
            <h2 className="title">تسجيل الدخول</h2>
            <div className="input-feild">
              <i class="fa-solid fa-envelope focus-color"></i>
              <input
                type="email"
                placeholder="البريد الالكتروني"
                value={formInput.email}
                onChange={(e) => {
                  setformInput({ ...formInput, email: e.target.value });
                }}
              />
            </div>
            <div className="input-feild">
              <i className="fas fa-lock focus-color"></i>
              <input
                type="password"
                value={formInput.password}
                onChange={(e) => {
                  setformInput({ ...formInput, password: e.target.value });
                }}
                placeholder="كلمة المرور"
              />
            </div>
            <p className="text-danger">{error}</p>
            <input type="submit" value={"تسجيل الدخول"} className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>اليس لديك حساب ؟</h3>
            <p>لاتفقد تركيزك و قم بزيادة انتاجيتك معنا</p>
            <Link to={"/signup"}>
              <button className="btn transparent" id="sign-up-btn">
                تسجيل حساب
              </button>
            </Link>
          </div>
          <img src={SignipImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
