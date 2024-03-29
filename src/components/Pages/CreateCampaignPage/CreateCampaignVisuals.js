import React, { useState, useEffect } from "react";
import CreateCampaignDetails from "./CreateCampaignDetails.js";
import CampaignIntroPage from "./CreateCampaignIntro";
import { Alert } from "reactstrap";
import HashLoader from "react-spinners/HashLoader";
import "./CreateCampaignPage.css";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import { MultiStepForm, Step } from "react-multi-form-custom";
import { Button } from "react-bootstrap";
import CampaignLastPage from "./CreateCampaignLast";
import CampaignThirdPage from "./CreateCampaignThird";
import CampaignSummary from "./CreateCampaignSummary.js";
import { validateFields } from "../Register/Validation";
import SuccessCard from "./CampaignSuccessCard.js";

function CreateCampaignVisuals(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [categoryError, setCategoryError] = useState("");
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [storyError, setStoryError] = useState("");
  const [publicStoryError, setPublicStoryError] = useState("");
  const [moneyUseError, setMoneyUseError] = useState("");
  const [budgetError, setBudgetError] = useState("");
  const [mainImageError, setMainImageError] = useState("");
  const [supportImagesError, setSupportImagesError] = useState("");
  const [camImagesError, setCamImagesError] = useState("");
  const [idImagesError, setIdImagesError] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const EN = props.EN;

  let isMobile = width < 700 ? true : false;

  const handleWindowSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  const validateCategory = () => {
    if (!props.data.campaigncategory) {
      setCategoryError(
        EN
          ? "The category has not been selected"
          : "La categoría no ha sido seleccionada"
      );
      return false;
    } else {
      setCategoryError("");
      return true;
    }
  };

  let emptyWarning = props.EN
    ? "This field cannot be empty"
    : "Este campo no puede estar vacío";
  let emptyPicWarning = props.EN
    ? "No files uploaded"
    : "No hay archivos subidos";

  
  const validateMaxChars = (value, amount, setError) => {
    if (value.length > amount) {
      setError(
        EN
          ? `The maximum number of characters allowed is ${amount}`
          : `El número máximo de caracteres permitidos es de ${amount}`
      );
      return false;
    }

    return true;
  }

  const validateMinChars = (value, amount, setError) => {
    if (value.length < amount) {
      setError(
        EN
          ? `The minimum number of characters allowed is ${amount}`
          : `El número mínimo de caracteres permitidos es de ${amount}`
      );
      return false;
    }

    return true;
  }

  const validateTitle = (optional = "") => {
    if (optional) {
      setNameError("");
      return true;
    }

    if (!props.data.campaignname) {
      setNameError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.campaignname);

      if (invalid) {
        setNameError(invalid);
        return false;
      }

      setNameError("");
      return true;
    }
  };

  const validateAmount = (optional = "") => {
    if (optional) {
      let invalid = validateFields.validateNumber(optional);

      if (invalid) {
        setAmountError(invalid);
        return false;
      } else {
        if (optional.includes(".") || optional.includes(",")) {
          setAmountError(
            EN
              ? "Number must be an integer. Don't use dots or commas to separate a number"
              : "Número debe ser entero. No use puntos o comas para separar el número"
          );
          return false;
        }
      }

      setAmountError("");
      return true;
    }

    if (!props.data.amount) {
      setAmountError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateNumber(props.data.amount);

      if (invalid) {
        setAmountError(invalid);
        return false;
      } else {
        if (
          props.data.amount.includes(".") ||
          props.data.amount.includes(",")
        ) {
          setAmountError(
            EN
              ? "Number must be an integer. Don't use dots or commas to separate a number"
              : "Número debe ser entero. No use puntos o comas para separar el número"
          );
          return false;
        }
      }

      setAmountError("");
      return true;
    }
  };

  const validateDescription = (optional = "") => {
    if (optional) {
      let validLength = validateMaxChars(optional, 250, setDescriptionError);

      if (!validLength) {
        return false;
      }

      setDescriptionError("");
      return true;
    }

    if (!props.data.description) {
      setDescriptionError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.description);

      if (invalid) {
        setDescriptionError(invalid);
        return false;
      }

      let validLength = validateMaxChars(props.data.description, 250, setDescriptionError);

      if (!validLength) {
        return false;
      }

      setDescriptionError("");
      return true;
    }
  };

  const validateStory = (optional = "") => {
    if (optional) {
      let validLength = validateMinChars(optional, 250, setStoryError);

      if (!validLength) {
        return false;
      }

      setStoryError("");
      return true;
    }

    if (!props.data.story) {
      setStoryError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.story);

      if (invalid) {
        setStoryError(invalid);
        return false;
      }

      let validLength = validateMinChars(props.data.story, 250, setStoryError);

      if (!validLength) {
        return false;
      }


      setStoryError("");
      return true;
    }
  };

  const validatePublicStory = (optional = "") => {
    if (optional) {
      let validLength = validateMinChars(optional, 250, setPublicStoryError);

      if (!validLength) {
        return false;
      }

      setPublicStoryError("");
      return true;
    }

    if (!props.data.publicstory) {
      setPublicStoryError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.publicstory);

      if (invalid) {
        setPublicStoryError(invalid);
        return false;
      }

      let validLength = validateMinChars(props.data.publicstory, 250, setPublicStoryError);

      if (!validLength) {
        return false;
      }


      setPublicStoryError("");
      return true;
    }
  };

  const validateMoneyUse = (optional = "") => {
    if (optional) {
      let validLength = validateMinChars(optional, 250, setMoneyUseError);

      if (!validLength) {
        return false;
      }

      setMoneyUseError("");
      return true;
    }

    if (!props.data.moneyuse) {
      setMoneyUseError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.moneyuse);

      if (invalid) {
        setMoneyUseError(invalid);
        return false;
      }

      let validLength = validateMinChars(props.data.moneyuse, 250, setMoneyUseError);

      if (!validLength) {
        return false;
      }


      setMoneyUseError("");
      return true;
    }
  };

  const validateBudget = (optional = "") => {
    if (optional) {
      setBudgetError("");
      return true;
    }

    if (!props.data.itemizedbudget) {
      setBudgetError(emptyWarning);
      return false;
    } else {
      let invalid = validateFields.validateName(props.data.itemizedbudget);

      if (invalid) {
        setBudgetError(invalid);
        return false;
      }

      setBudgetError("");
      return true;
    }
  };

  const validateMainImage = () => {
    if (!props.data.mainPicture) {
      setMainImageError(emptyPicWarning);
      return false;
    } else {
      setMainImageError("");
      return true;
    }
  };

  const validateSupportImages = () => {
    if (props.data.supportPics.length === 0) {
      setSupportImagesError(emptyPicWarning);
      return false;
    } else {
      setSupportImagesError("");
      return true;
    }
  };

  const validateCamImages = () => {
    if (props.data.camPics.length === 0) {
      setCamImagesError(emptyPicWarning);
      return false;
    } else {
      setCamImagesError("");
      return true;
    }
  };

  const validateIdImages = () => {
    if (props.data.idPics.length === 0) {
      setIdImagesError(emptyPicWarning);
      return false;
    } else {
      setIdImagesError("");
      return true;
    }
  };

  const validatePage = (page) => {
    if (page === 1) {
      return validateCategory();
    } else if (page === 2) {
      let title = validateTitle();
      let amount = validateAmount();
      let description = validateDescription();

      if (title && amount && description) {
        return true;
      } else {
        return false;
      }
    } else if (page === 3) {
      let story = validateStory();
      let publicStory = validatePublicStory();
      let money = validateMoneyUse();
      let budget = validateBudget();

      if (story && publicStory && money && budget) {
        return true;
      } else {
        return false;
      }
    } else if (page === 4) {
      let mainImage = validateMainImage();
      let support = validateSupportImages();
      let cam = validateCamImages();
      let idImages = validateIdImages();

      if (mainImage && support && cam && idImages) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const [isUploading, setIsUploading] = useState("");
  const [isUploadingCampaign, setIsUploadingCampaign] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps + 1) {
      if (validatePage(step)) {
        setStep((step) => step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    }
  };

  const submitCampaign = async (event) => {
    setIsUploadingCampaign(true);
    await props.submit(event);

    if (props.success) {
      setOpenSuccess(true);
    }
  };

  if (props.success && !openSuccess) {
    setOpenSuccess(true);
  } else if (props.error) {
    setIsUploadingCampaign(false);
  }

  return (
    <div className="create-page">
      <SuccessCard
        EN={EN}
        open={openSuccess}
        onClose={() => {
          window.location.href = "/profile";
        }}
        isMobile={isMobile}
      />
      {!EN ? <WhatsAppButton EN={EN}></WhatsAppButton> : ""}
      <div id="background">
        <MultiStepForm pillSize={50} activeStep={step} inactiveColor={"#aaa"}>
          <Step label={1}>
            <CampaignIntroPage
              EN={EN}
              handleChange={props.handleChange}
              isMobile={isMobile}
              categoryError={categoryError}
            />
          </Step>
          <Step label={2}>
            <CreateCampaignDetails
              EN={EN}
              data={props.data}
              handleChange={props.handleChange}
              setData={props.setData}
              setIsUploading={setIsUploading}
              isMobile={isMobile}
              errors={{ nameError, amountError, descriptionError }}
              validations={{
                validateTitle,
                validateAmount,
                validateDescription,
              }}
            />
          </Step>
          <Step label={3}>
            <CampaignThirdPage
              EN={EN}
              data={props.data}
              handleChange={props.handleChange}
              setData={props.setData}
              isMobile={isMobile}
              errors={{
                storyError,
                publicStoryError,
                moneyUseError,
                budgetError,
              }}
              validations={{
                validateStory,
                validatePublicStory,
                validateMoneyUse,
                validateBudget,
              }}
            />
          </Step>
          <Step label={4}>
            <CampaignLastPage
              EN={EN}
              data={props.data}
              handleChange={props.handleChange}
              setData={props.setData}
              setIsUploading={setIsUploading}
              isMobile={isMobile}
              errors={{
                mainImageError,
                supportImagesError,
                camImagesError,
                idImagesError,
              }}
            />
          </Step>
          <Step label={"✓"}>
            <CampaignSummary
              step={step}
              data={props.data}
              EN={EN}
              isMobile={isMobile}
            />
          </Step>
        </MultiStepForm>
        {props.error ? (
          <Alert color="danger" id="alert">
            {props.error}
          </Alert>
        ) : (
          ""
        )}
        {props.loader ? (
          <div className="sweet-loading">
            <div
              className="loader-wrapper"
              style={{ marginLeft: "-10px", marginBottom: "10px" }}
            >
              <HashLoader color={"#ea8737"} loading={props.loader} />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="center-btn">
          {step > 1 ? (
            <Button onClick={prevStep} className="step-btn left-btn">
              {EN ? "Previous" : "Regresar"}
            </Button>
          ) : (
            ""
          )}
          {step < 5 ? (
            <Button
              onClick={nextStep}
              id={!props.data.campaigncategory ? "disabled-create" : ""}
              disabled={!props.data.campaigncategory}
              className={`step-btn right-btn ${
                !props.data.campaigncategory && `btn-disabled`
              }`}
            >
              {EN ? "Next" : "Siguiente"}
            </Button>
          ) : (
            ""
          )}
          {step === 5 ? (
            <Button
              onClick={submitCampaign}
              id={isUploadingCampaign || isUploading ? "disabled-create" : ""}
              disabled={isUploadingCampaign || isUploading}
              className={`step-btn right-btn ${
                (isUploadingCampaign || isUploading) && `btn-disabled`
              }`}
            >
              {EN ? "Create Campaign" : "Crear Campaña"}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCampaignVisuals;
