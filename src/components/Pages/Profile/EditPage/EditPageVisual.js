import React from "react";
import HashLoader from "react-spinners/HashLoader";
import EditContent from "./EditContent";
import { Alert } from "reactstrap";

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
          {EN ? " Return" : " Volver"}
        </a>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <HashLoader size={60} color={"#ea8737"} loading={true} />
        </div>
      ) : (
        <>
          <EditContent
            EN={EN}
            user={user}
            type={type}
            handleChange={props.handleChange}
          />

          <section className="save-area">
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
              className={props.activeChange ? "active" : "disabled"}
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
