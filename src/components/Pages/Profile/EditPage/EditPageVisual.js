import React from "react";
import HashLoader from "react-spinners/HashLoader";
import EditContent from "./EditContent";
import { Alert } from "reactstrap";
import classnames from 'classnames';

function EditPageVisual(props) {
  const EN = props.EN;
  const user = props.data.user;
  const type = props.type;
  const loading = props.loading;
  
  const EmailTemplate = EN
    ? `Delete Yakera Donor Account&body=Hello Yakera team, I would like to delete my account with email: ${user?.email}.`
    : `Hola equipo de Yakera, quisiera eliminar mi cuenta con el email: ${user?.email}.`;

  return (
    <div className="edit-container">
      <section className="banner">
        {EN ? " Edit Profile Details" : " Editar detalles del perfil"}
      </section>
      <div className="sub-banner">
        <a href="/profile">
          <i className="fas fa-arrow-left"></i>
          {EN ? " Return to my account" : " Volver a mi cuenta"}
        </a>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <HashLoader size={60} color={"#ea8737"} loading={true} />
        </div>
      ) : (
        <>
          <div className={props.changeType ? "hide" : ""}>
            <EditContent
              EN={EN}
              user={user}
              type={type}
              handleChange={props.handleChange}
            />
          </div>
            
          <div className={props.changeType ? "" : "hide"}>
            <div className={classnames({"hide" : type !== "recipient"}, "confirm-change-type-page")} 
            >
              <div className="heading2"> {EN ? "Are you sure?" : "¿Estás seguro?"} </div>
              <div className="subtext"> {EN ? "This will delete your campaigns and recipient validation data(??)" : "Esto eliminará sus campañas y datos de validación de destinatarios(??)"} </div>
              <div>
                <button
                  className={classnames("active", "change-type-buttons", "confirm-type-change-buttons")} 
                  onClick={props.handleConfirm}
                >
                {EN ? "Yes, change my account to a donor account" : "Sí, cambiar mi cuenta a una cuenta de donante"}
                </button>
              </div>
              <div>
                <button
                  className={classnames("active", "change-type-buttons","confirm-type-change-buttons")} 
                  id="reject-change-type-button" 
                  onClick={props.rejectChangeType}
                >
                {EN ? "No, take me back" : "No, llévame de vuelta"}
                </button>
              </div>
            </div>
            
            <div className={type === "recipient" ? "hide" : ""}>
              form
            </div>
          </div>

          <section className={classnames(
              "save-area",
              {"hide" : props.changeType}
              // { 'is-valid': props.data.errors.preference === false }
          )}>
            <button
              className={classnames("active", "change-type-buttons")} 
              id="change-type-button"
              onClick={type === "recipient" ? props.handleClick : ()=>window.location.href="/profile/edit/to-recipient"}
            >
            {EN ? "Change account type to " : "Cambiar tipo de cuenta al "}{type === "recipient" ? EN ? "donor" : "donante" : EN ? "recipient" : "receptor"}
            </button>
          
            {props.success ? (
              <Alert
                color="success"
                id="alert"
                style={{ width: "50%", marginLeft: "25%" }}
              >
                {props.success}
                <br />
                {EN ? "Head to your " : "Dirígete a tu "}{" "}
                <a
                  href="/profile"
                  style={{ color: "darkgreen", textDecoration: "underline" }}
                >
                  {type === "recipient"
                    ? EN
                      ? "Dashboard"
                      : "Mi Cuenta"
                    : "Donor Hub"}
                </a>
                .
              </Alert>
            ) : (
              ""
            )}
            {props.error ? (
              <Alert
                color="danger"
                id="alert"
                style={{ width: "50%", marginLeft: "25%" }}
              >
                {props.error}
              </Alert>
            ) : (
              ""
            )}
            <hr />
            <button
              className={classnames(
                  {"disabled" : !props.activeChange},
                  {"active" : props.activeChange},
                  {"hide" : props.changeType}
              )}
              onClick={props.onSubmit}
            >
              {!props.submitLoading ? (
                EN ? (
                  "Save changes"
                ) : (
                  "Guardar cambios"
                )
              ) : (
                // loader
                <div className="submit-loader-wrapper">
                  <HashLoader size={30} color={"#ea8837"} loading={true} />
                </div>
              )}
            </button>
            <p>
              {EN
                ? "Want to delete your account? Click "
                : "¿Te gustaría eliminar tu cuenta? Haz click "}
              <a href={`mailto:info@yakera.org?subject=${EmailTemplate}`}>
                {EN ? "here" : "aquí"}
              </a>
              {EN
                ? " to get in touch with one of the members of the team."
                : " para ponerte en contacto con un miembro de nuestro equipo."}
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default EditPageVisual;
