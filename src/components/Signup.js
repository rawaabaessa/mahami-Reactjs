import "../assets/css/style.css";
import SignupImg from "../assets/img/sign-up-img.svg";
import Logo from "../assets/img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Signup() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("user")) || [];
    const existingUser = users.find((user) => user.email === formInput.email);
    if (existingUser) {
      setError("البريد الالكتروني موجود مسبقا");
      return;
    }
    const newUser = {
      id: uuidv4(),
      email: formInput.email,
      name: formInput.name,
      password: formInput.password,
    };
    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));
    setFormInput({
      email: "",
      name: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div className="Container">
      <div className="form-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <img src={Logo} alt="" className="logo" />
            <h2 className="title">تسجيل حساب</h2>
            <div className="input-feild">
              <i class="fa-solid fa-envelope focus-color"></i>
              <input
                type="email"
                placeholder="البريد الالكتروني"
                value={formInput.email}
                onChange={(e) => {
                  setFormInput({ ...formInput, email: e.target.value });
                }}
              />
            </div>
            <div className="input-feild">
              <i className="fas fa-user focus-color"></i>
              <input
                type="text"
                placeholder="الاسم"
                value={formInput.name}
                onChange={(e) => {
                  setFormInput({ ...formInput, name: e.target.value });
                }}
              />
            </div>
            <div className="input-feild">
              <i className="fas fa-lock focus-color"></i>
              <input
                type="password"
                value={formInput.password}
                onChange={(e) => {
                  setFormInput({ ...formInput, password: e.target.value });
                }}
                placeholder="كلمة المرور"
              />
            </div>
            <p className="text-danger">{error}</p>
            <input type="submit" value={"تسجيل حساب"} className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>لديك حساب في مهامي ؟</h3>
            <p>لاتفقد تركيزك و قم بتسجيل الدخول لزيادة انتاجيتك معنا</p>
            <Link to={"/"}>
              <button className="btn transparent" id="sign-up-btn">
                تسجيل دخول
              </button>
            </Link>
          </div>
          <img src={SignupImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
