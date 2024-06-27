import "../assets/css/style.css";
import SignupImg from "../assets/img/sign-up-img.svg";
import Logo from "../assets/img/logo.svg";

export default function Login() {
  return (
    <div className="Container">
      <div className="form-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <img src={Logo} alt="" className="logo" />
            <h2 className="title">تسجيل الدخول</h2>
            <div className="input-feild">
              <i className="fas fa-user focus-color"></i>
              <input type="email" placeholder="البريد الالكتروني" />
            </div>
            <div className="input-feild">
              <i className="fas fa-lock focus-color"></i>
              <input type="password" placeholder="كلمة المرور" />
            </div>
            <input type="submit" value={"تسجيل الدخول"} className="btn solid" />
          </form>
          <form className="sign-up-form">
            <h2 className="title">انشاء حساب</h2>
            <div className="input-feild">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="البريد الالكتروني" />
            </div>
            <div className="input-feild">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="كلمة المرور" />
            </div>
            <input type="submit" value={"انشاء حساب"} className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        {/* <div className="panel right-panel">
          <div className="content">
            <h3>one of us ?</h3>
            <p>loeeeeeeeeeeeeeeeeeeeeeee</p>
            <button className="btn transparent" id="sign-up-btn">
              تسجيل دخول
            </button>
          </div>
          <img src={LoginImg} className="image" alt="" />
        </div> */}
        <div className="panel left-panel">
          <div className="content">
            <h3>اليس لديك حساب ؟</h3>
            <p>قم بإنشاء حساب لزيادة انتاجيتك في ادارة مهامك</p>
            <button className="btn transparent" id="sign-up-btn">
              تسجيل حساب
            </button>
          </div>
          <img src={SignupImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
