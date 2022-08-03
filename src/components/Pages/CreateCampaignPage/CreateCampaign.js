import React, { useState, useEffect } from "react";
import { validateFields } from "../Register/Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";
import Author from "../../author";
import api from "../../../services/api";
import TokenService from "../../../services/token";
import useLanguage from "../../../hooks/useLanguage.tsx";

function CreateCampaign() {
  const initialState = {
    campaignname: "",
    campaigncategory: "",
    amount: "",
    story: "",
    description: "",
    itemizedbudget: "",
    mainPicture: "",
    camPics: [],
    supportPics: [],
    idPics: [],
    errors: {
      campaignname: null,
      amount: null,
      story: null,
      publicstory: null,
      description: null,
      moneyuse: null,
      itemizedbudget: null,
      mainPic: null,
      camPics: null,
      supportPics: null,
      idPics: null,
    },
  };
  const [data, setData] = useState(initialState);
  const [errorMessage, setError] = useState("");
  const [successMessage, setSuccess] = useState("");
  const [loader, setLoader] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const EN = useLanguage();

  useEffect(() => {
    function startup() {
      if (TokenService.getLocalAccessToken()) {
        if (TokenService.isRecipient()) {
          // only allow recipients to this page
          getProfile();
        } else {
          // redirect donors to their page
          window.location = "/donor-hub";
        }
      } else {
        window.location = "/login";
      }
    }
    startup();
  }, []);

  async function getProfile() {
    try {
      await api.get("/profile");
      setHasLoaded(true);
    } catch (err) {
      setError("Profile not found");
      setHasLoaded(true);
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      window.location.replace("/login");
    }
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    name = name.toLowerCase();

    setData({
      ...data,
      [name]: value,
    });

    if (value !== "") {
      setError("");
      setData({
        ...data,
        [name]: value,
        errors: {
          ...data.errors,
          [name]: "",
        },
      });
    }

    return;
  };

  function validateData() {
    let emptyWarning = EN
      ? "This field cannot be empty"
      : "Este campo no puede estar vacío";
    let emptyPicWarning = EN ? "No files uploaded" : "No hay archivos subidos";
    let nameError,
      amountError,
      storyError,
      publicStoryError,
      descriptionError,
      moneyError,
      budgetError,
      mainPicError,
      camPicsError,
      supportPicsError,
      idPicsError;

    if (!data.amount) {
      amountError = emptyWarning;
    } else {
      amountError = validateFields.validateNumber(data.amount + "");
    }
    if (!data.campaignname) {
      nameError = emptyWarning;
    } else {
      nameError = validateFields.validateName(data.campaignname);
    }
    if (!data.story) {
      storyError = emptyWarning;
    } else {
      storyError = validateFields.validateName(data.story);
    }
    if (!data.publicstory) {
      publicStoryError = emptyWarning;
    } else {
      publicStoryError = validateFields.validateName(data.publicstory);
    }
    if (!data.description) {
      descriptionError = emptyWarning;
    } else {
      descriptionError = validateFields.validateName(data.description);
    }
    if (!data.moneyuse) {
      moneyError = emptyWarning;
    } else {
      moneyError = validateFields.validateName(data.moneyuse);
    }
    if (!data.itemizedbudget) {
      budgetError = emptyWarning;
    } else {
      budgetError = validateFields.validateName(data.itemizedbudget);
    }

    if (!data.mainPicture) {
      mainPicError = emptyPicWarning;
    }
    if (data.supportPics.length === 0) {
      supportPicsError = emptyPicWarning;
    }
    if (data.camPics.length === 0) {
      camPicsError = emptyPicWarning;
    }
    if (data.idPics.length === 0) {
      idPicsError = emptyPicWarning;
    }
    setData({
      ...data,
      errors: {
        campaignname: nameError,
        amount: amountError,
        story: storyError,
        publicstory: publicStoryError,
        moneyuse: moneyError,
        itemizedbudget: budgetError,
        description: descriptionError,
        mainPic: mainPicError,
        camPics: camPicsError,
        supportPics: supportPicsError,
        idPics: idPicsError,
      },
    });

    if (
      !amountError &&
      !storyError &&
      !publicStoryError &&
      !descriptionError &&
      !nameError &&
      !moneyError &&
      !budgetError &&
      !mainPicError &&
      !camPicsError &&
      !supportPicsError &&
      !idPicsError
    ) {
      return true;
    }

    return false;
  }

  function linkify(text) {
    //copied from https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    let formattedStory = linkify(
      data.story + "\n" + data.publicstory + "\n" + data.moneyuse
    );
    formattedStory = formattedStory.replace(/\n/g, " <br />");

    let isValidated = validateData();
    if (isValidated) {
      setLoader(true);
      submitToBackend(formattedStory);
    } else {
      setError(
        EN ? "Some fields are not valid." : "Algunos campos no son válidos."
      );
    }
  }

  async function submitToBackend(story) {
    const categories = {
      "small business": "small_business",
      healthcare: "healthcare",
      education: "education",
      nutrition: "nutrition",

      "pequeños negocios": "small_business",
      salud: "healthcare",
      educación: "education",
      alimentación: "nutrition",
    };

    var pics = [];
    data.camPics.forEach((picName) => {
      pics.push({ url: "https://assets.yakera.org/" + picName });
    });
    var support = [];
    data.supportPics.forEach((picName) => {
      support.push({ url: "https://assets.yakera.org/" + picName });
    });

    var id = [];
    data.idPics.forEach((picName) => {
      id.push({ url: "https://assets.yakera.org/" + picName });
    });

    const payload = {
      title: data.campaignname,
      targetAmount: data.amount,
      story: story,
      category: categories[data.campaigncategory],
      description: data.description,
      itemizedBudget: data.itemizedbudget,
      language: EN ? "en" : "es",
      mainPicture: {
        url: "https://assets.yakera.org/" + data.mainPicture,
      },
      pictures: pics,
      supportDocs: support,
      personalID: id,
    };

    //console.log(payload)
    try {
      await api.post("/campaigns", payload);
      setSuccess(
        EN
          ? "Your campaign has been created successfully!"
          : "¡Tu campaña se ha creado con éxito!"
      );
      setLoader(false);
    } catch (error) {
      console.log("Error: " + error);
      setError(
        EN
          ? "Something on our server went wrong, please try again"
          : "Se produjo un error en nuestro servidor. Vuelve a intentarlo."
      );
      setLoader(false);
    }
  }
  if (!hasLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <CreateCampaignVisuals
          EN={EN}
          success={successMessage}
          error={errorMessage}
          data={data}
          setData={setData}
          handleChange={handleChange}
          validate={validateData}
          submit={submit}
          loader={loader}
        />
        <Author />
      </div>
    );
  }
}

export default CreateCampaign;
