import React from "react";
import EditPageVisual from "./EditPageVisual";
import api from "../../../../services/api";
import { userServices } from "../UserService";
import TokenService from "../../../../services/token";
import "./EditPage.scss";
import { validateFields } from "../../../../services/Validation";
import LanguageService from "../../../../services/language";

function EditPage() {
  const [EN, setEN] = React.useState(false);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [activeChange, setActiveChange] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setEN(LanguageService.getLanguage() === "en");
    getUser();
  }, []);

  async function getUser() {
    try {
      const user = await userServices.getUserData();
      setData(user);
    } catch (errors) {
      userServices.timedOut();
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setActiveChange(true);
    setError("");
    switch (e.target.name) {
      case "phone":
      case "address":
      case "reserveUsername":
        setData({
          ...data,
          user: {
            ...data.user,
            [e.target.name]: e.target.value,
          },
        });
        break;
      case "email":
      case "name":
        setData({
          ...data,
          user: {
            ...data.user,
            zelleInfo: {
              ...data.user.zelleInfo,
              [e.target.name]: e.target.value,
            },
          },
        });
        break;
      case "acceptZelle":
        setData({
          ...data,
          user: {
            ...data.user,
            zelleInfo: {
              ...data.user.zelleInfo,
              isAccepting: !data.user?.zelleInfo?.isAccepting,
            },
          },
        });
        break;
      case "location":
      case "age":
      case "bio":
        setData({
          ...data,
          user: {
            ...data.user,
            donorInfo: {
              ...data.user.donorInfo,
              [e.target.name]: e.target.value,
            },
          },
        });
        break;
      default:
        break;
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    if (validate(data)) backendPatch(await setProfilePicture());
  }
  function validate(data) {
    let zelleEmail = data.user?.zelleInfo?.email;
    if (zelleEmail) {
      if (validateFields.validateEmail(zelleEmail)) {
        setError(
          EN
            ? "Please check the Zelle Email."
            : "Por favor, revise el correo electrónico de Zelle."
        );
        setSubmitLoading(false);
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  async function setProfilePicture() {
    const currentPicture = data.user.profilePicture;
    if (typeof currentPicture === "string") {
      // string is a random yakera profile
      return currentPicture;
    } else {
      // compress file
      const compressedImage = await userServices.compressFile(currentPicture);
      // upload to aws
      const newImageName = await userServices.uploadtoAWS(compressedImage);
      if (typeof newImageName === "string") return newImageName;
    }
  }

  const backendPatch = async (profilePicture) => {
    try {
      const payload = {
        address: data.user.address,
        phone: data.user.phone,
        reserveUsername: data.user.reserveUsername,
        profilePicture: profilePicture,
        zelleInfo: {
          email: data.user.zelleInfo?.email,
          name: data.user.zelleInfo?.name,
          isAccepting: data.user.zelleInfo?.isAccepting,
        },
        donorInfo: {
          location: data.user.donorInfo?.location,
          age: data.user.donorInfo?.age,
          bio: data.user.donorInfo?.bio,
        },
      };
      await api.patch("/profile/update", payload);
      setSuccess(
        EN
          ? "Profile updated successfully!"
          : "¡Tu perfil ya está actualizado!'"
      );
      setActiveChange(false);
    } catch (err) {
      console.error("Error. " + err);
      setError(
        EN
          ? "Sorry, something went wrong, please try again."
          : "Lo sentimos, algo salió mal, por favor inténtalo de nuevo."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="edit-page">
      <EditPageVisual
        EN={EN}
        data={data}
        loading={loading}
        submitLoading={submitLoading}
        type={TokenService.identifyUserType(data?.user?.role)}
        activeChange={activeChange}
        onSubmit={onSubmit}
        handleChange={handleChange}
        success={success}
        error={error}
      />
    </div>
  );
}

export default EditPage;
