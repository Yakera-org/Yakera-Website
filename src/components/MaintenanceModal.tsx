import React from "react";

const MaintenanceModal = ({
  EN,
  config,
}: {
  EN: boolean;
  config: "donation" | "create-campaign";
}): JSX.Element => {
  console.log(config);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#00000050",
        position: "fixed",
        zIndex: "100",
        top: "0",
        left: "0",
        overflow: "hidden",
        transition: "0.5s",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "25%",
          left: "25%",
          width: "50%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#EFEFEF",
            padding: "20px",
            borderRadius: "4px",
            minHeight: "200px",
          }}
        >
          <div className="close-icon">
            <i
              onClick={() => {
                if (config === "donation") window.location.reload();
                window.location.href = "/";
              }}
              className="fas fa-2x fa-times"
            ></i>
          </div>
          <h1 id="red">
            {EN
              ? "We are sorry, we are no longer accepting new campaigns"
              : "Lo sentimos, ya no admitimos nuevas donaciones"}
          </h1>
          <p
            style={{
              fontSize: "18px",
              letterSpacing: "1px",
              fontFamily: "Intro-Light",
              padding: "30px",
              textAlign: "justify",
            }}
          >
            {EN ? (
              config === "donation" ? (
                <>
                  Due to unforeseen obstacles, we will discontinue our
                  operations and close the platform.
                  <br />
                  <br />
                  Starting on September 5th, making donations will no longer be
                  possible in Yakera. However, the total balance of the
                  campaigns will be transferred to the recipients before
                  Yakera’s closure.
                </>
              ) : (
                <>
                  Due to unforeseen obstacles, we will discontinue our
                  operations and close the platform. From August 28th, we will
                  no longer accept new campaigns on the site.
                </>
              )
            ) : config === "donation" ? (
              <>
                Desde Yakera lamentamos profundamente comunicarte que debido a
                algunos obstáculos que se nos han presentado, nos vemos en la
                obligación de detener las operaciones y cerrar la plataforma{" "}
                <br />
                <br />
                Es por ello que desde el 5 de septiembre no podrán realizarse
                nuevas donaciones desde nuestra página. De esta forma podemos
                organizar los aportes ya existentes para enviarlos a sus
                beneficiarios antes del cierre.'
              </>
            ) : (
              <>
                Desde Yakera lamentamos profundamente comunicarte que debido a
                algunos obstáculos que se nos han presentado, nos vemos en la
                obligación de detener las operaciones y cerrar la plataforma. Es
                por ello que desde el 28 de agosto no aceptamos nuevas campañas
                en nuestra página.
                <br />
                <br />
                Te mandamos un abrazo y mucha fuerza en tus circunstancias
                actuales.
              </>
            )}
          </p>

          <button
            style={{
              borderRadius: "4px",
              color: "white",
              backgroundColor: "#FF7D7D",
              padding: "10px 20px",
              border: "none",
              outline: "none",
              fontSize: "18px",
            }}
            onClick={() => {
              if (config === "donation") window.location.reload();
              window.location.href = "/";
            }}
          >
            {EN ? "I understand" : "Entiendo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;
