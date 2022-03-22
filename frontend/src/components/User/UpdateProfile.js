import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import "./updateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/man.png");
  const [avatarPreview, setAvatarPreview] =
    useState("/man.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  //to convert BAS64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateProfileDataChange = async (e) => {
    const file = e.target.files[0];
    const bas64 = await convertToBase64(file);
    // const image = await decodeBase64Image(bas64);
    setAvatarPreview(bas64);
    setAvatar(bas64);
    // const image = decodingBase64(bas64);

    // setAvatarPreview(image);
    // setAvatar(image);
    // console.log(image);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updateed Successful");
      dispatch(loadUser());
      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [alert, dispatch, error, history, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name} Profile Update`} />
          <div className='updateProfileContainer'>
            <div className='updateProfileBox'>
              <h2>Update Profile</h2>
              <form
                className='updateProfileForm'
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}
              >
                <div className='updateProfileName'>
                  <FaceIcon />
                  <input
                    type='text'
                    placeholder='Name'
                    required
                    name='name'
                    value={name}
                    onChange={updateProfileDataChange}
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
                    onChange={updateProfileDataChange}
                  />
                </div>

                <div id='updateProfileImage'>
                  <img
                    src={avatarPreview}
                    alt='Avatar Preview'
                  />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/*'
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type='submit'
                  value='updateProfile'
                  className='updateProfileBtn'
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

export default UpdateProfile;
