import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import "./LoginSignUp.css";
import Loader from "../layout/loader/Loader";
import { Link, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  signUp,
} from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const signupTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/man.png");
  const [avatarPreview, setAvatarPreview] =
    useState("/man.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));

    console.log("Form submitted");
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(signUp(myForm));
  };

  //creating canvas of a image file

  const createCanvas = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx2 = canvas.getContext("2d");
        ctx2.drawImage(img, 0, 0, width, height);
        const dataurl = canvas.toDataURL("image/png");
        console.log(dataurl);
        setAvatarPreview(dataurl);
        setAvatar(dataurl);
      };
    };
  };

  //to convert BAS64
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  // setAvatarPreview(reader.result);
  // setAvatar(reader.result);

  const signUpDataChange = async (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      createCanvas(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Login Successful");
      history.push(redirect);
    }
  }, [error, alert, dispatch, isAuthenticated, history]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      signupTab.current.classList.remove(
        "shiftToNeutralForm"
      );
      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab === "signUp") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove(
        "shiftToNeutral"
      );

      signupTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
              <div>
                <div className='login_signUp_toggle'>
                  <p
                    onClick={(e) => switchTabs(e, "login")}
                  >
                    SIGNIN
                  </p>
                  <p
                    onClick={(e) => switchTabs(e, "signUp")}
                  >
                    SIGN UP
                  </p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className='loginForm'
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className='loginEmail'>
                  <MailOutlineIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e) =>
                      setLoginEmail(e.target.value)
                    }
                  />
                </div>
                <div className='loginPassword'>
                  <LockOutlinedIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e) =>
                      setLoginPassword(e.target.value)
                    }
                  />
                </div>
                <Link to='/password/forgot'>
                  Forgot Password ?
                </Link>
                <input
                  type='submit'
                  value='Login'
                  className='loginBtn'
                />
              </form>

              <form
                className='signUpForm'
                ref={signupTab}
                encType='multipart/form-data'
                onSubmit={signUpSubmit}
              >
                <div className='signupName'>
                  <FaceIcon />
                  <input
                    type='text'
                    placeholder='Name'
                    required
                    name='name'
                    value={name}
                    onChange={signUpDataChange}
                  />
                </div>
                <div className='singUpEmail'>
                  <MailOutlineIcon />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={signUpDataChange}
                  />
                </div>
                <div className='singUpPassword'>
                  <LockOutlinedIcon />
                  <input
                    type='password'
                    placeholder='Password'
                    required
                    name='password'
                    value={password}
                    onChange={signUpDataChange}
                  />
                </div>
                <div id='signUpImage'>
                  <img
                    src={avatarPreview}
                    alt='Avatar Preview'
                  />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/*'
                    onChange={signUpDataChange}
                  />
                </div>
                <input
                  type='submit'
                  value='SignUp'
                  className='signUpBtn'
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
