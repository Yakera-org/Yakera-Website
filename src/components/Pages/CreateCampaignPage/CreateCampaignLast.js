import React, { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Alert } from "reactstrap";
import S3 from "aws-s3";
import HashLoader from "react-spinners/HashLoader";
import imageCompression from "browser-image-compression";
import FilePreview from "./FilePreview";
import DroppingZone from "./DroppingZone";
import DroppingZoneMain from "./DroppingZoneMain";
import CropImage from "./CropImage";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const config_aws_pic = {
  bucketName: S3_BUCKET,
  region: REGION,
  dirName: "pictures",
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};
const config_aws_file = {
  bucketName: S3_BUCKET,
  region: REGION,
  dirName: "files",
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const S3Client_picture = new S3(config_aws_pic);
const S3Client_file = new S3(config_aws_file);

function CreateCampaignLast(props) {
  const [mainFile, setMainFile] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [campaignFiles, setCampaignFiles] = useState([]);
  const [idFiles, setIdFiles] = useState([]);

  const [uploadSuccess, setUploadSuccess] = useState([]);
  const [uploadFailures, setUploadFailures] = useState([]);

  const [mainLoading, setMainLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);
  const [camLoading, setCamLoading] = useState(false);
  const [idLoading, setIdLoading] = useState(false);

  const EN = props.EN;
  const isMobile = props.isMobile;

  // https://github.com/react-dropzone/react-dropzone/tree/master/examples/previews

  const cropZone = mainFile.map((file, i) => {
    return (
      <CropImage
        image={file}
        setLoading={setMainLoading}
        onUpload={onUpload}
        EN={EN}
        key={file.name + i}
        file={file}
        onRemove={onRemove}
        onRetry={onRetry}
        id="main"
        uploadSuccess={uploadSuccess}
        uploadFailures={uploadFailures}
      />
    );
  });

  // const mainThumbs = mainFile.map(file => {
  //     return(
  //         // <FilePreview EN={EN} key={file.name} file={file} onRemove={onRemove} onRetry={onRetry} id="main" uploadSuccess={uploadSuccess}uploadFailures={uploadFailures}/>
  //     )
  // });

  const documentThumbs = documentFiles.map((file, i) => {
    return (
      <FilePreview
        EN={EN}
        key={file.name + i}
        file={file}
        onRemove={onRemove}
        onRetry={onRetry}
        id="document"
        uploadSuccess={uploadSuccess}
        uploadFailures={uploadFailures}
      />
    );
  });

  const campaignThumbs = campaignFiles.map((file, i) => {
    return (
      <FilePreview
        EN={EN}
        key={file.name + i}
        file={file}
        onRemove={onRemove}
        onRetry={onRetry}
        id="campaign"
        uploadSuccess={uploadSuccess}
        uploadFailures={uploadFailures}
      />
    );
  });

  const idThumbs = idFiles.map((file, i) => {
    return (
      <FilePreview
        EN={EN}
        key={file.name + i}
        file={file}
        onRemove={onRemove}
        onRetry={onRetry}
        id="ids"
        uploadSuccess={uploadSuccess}
        uploadFailures={uploadFailures}
      />
    );
  });

  function onRemove(e) {
    e.preventDefault();
    var filename = e.target.getAttribute("name");

    props.setIsUploading(true);

    var filteredArray = uploadSuccess.filter((e) => e !== filename);
    setUploadSuccess(filteredArray);
    filteredArray = uploadFailures.filter((e) => e !== filename);
    setUploadFailures(filteredArray);

    var newFiles;
    if (e.target.getAttribute("id") === "main") {
      newFiles = mainFile.filter(function (item) {
        return item.path !== filename;
      });
      setMainFile(newFiles);

      props.setData({
        ...props.data,
        mainPicture: "",
        errors: {
          ...props.data.errors,
          mainPic: "",
        },
      });
    } else if (e.target.getAttribute("id") === "document") {
      newFiles = documentFiles.filter(function (item) {
        return item.path !== filename;
      });
      setDocumentFiles(newFiles);

      let _pics = [];
      newFiles.forEach((pic) => {
        _pics.push(pic.name);
      });

      props.setData({
        ...props.data,
        camPics: _pics,
        errors: {
          ...props.data.errors,
          camPics: "",
        },
      });
    } else if (e.target.getAttribute("id") === "campaign") {
      newFiles = campaignFiles.filter(function (item) {
        return item.path !== filename;
      });
      setCampaignFiles(newFiles);

      let _supppics = [];
      newFiles.forEach((pic) => {
        _supppics.push(pic.name);
      });

      props.setData({
        ...props.data,
        supportPics: _supppics,
        errors: {
          ...props.data.errors,
          supportPics: "",
        },
      });
    } else if (e.target.getAttribute("id") === "ids") {
      newFiles = idFiles.filter(function (item) {
        return item.path !== filename;
      });
      setIdFiles(newFiles);

      let _idpics = [];
      newFiles.forEach((pic) => {
        _idpics.push(pic.name);
      });

      props.setData({
        ...props.data,
        idPics: _idpics,
        errors: {
          ...props.data.errors,
          idPics: "",
        },
      });
    }
    props.setIsUploading(false);
  }

  // automatic uploads
  async function onUpload(theFile, id) {
    var filename = theFile.name;
    props.setIsUploading(true);

    theFile = await compressFile(theFile);

    if (id === "main") {
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          props.setData({
            ...props.data,
            mainPicture: data.key,
            errors: {
              ...props.data.errors,
              mainPic: "",
            },
          });
        })
        .catch((err) => {
          console.error(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
          var filteredArray = uploadSuccess.filter((e) => e !== filename);
          setUploadSuccess(filteredArray);
        });
    } else if (id === "document") {
      await S3Client_file.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _pics = props.data.camPics;
          _pics.push(data.key);

          props.setData({
            ...props.data,
            camPics: _pics,
            errors: {
              ...props.data.errors,
              camPics: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
          var filteredArray = uploadSuccess.filter((e) => e !== filename);
          setUploadSuccess(filteredArray);
        });
    } else if (id === "campaign") {
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _supppics = props.data.supportPics;
          _supppics.push(data.key);

          props.setData({
            ...props.data,
            supportPics: _supppics,
            errors: {
              ...props.data.errors,
              supportPics: "",
            },
          });
        })
        .catch((err) => {
          console.error(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
          var filteredArray = uploadSuccess.filter((e) => e !== filename);
          setUploadSuccess(filteredArray);
        });
    } else if (id === "ids") {
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _idpics = props.data.idPics;
          _idpics.push(data.key);

          props.setData({
            ...props.data,
            idPics: _idpics,
            errors: {
              ...props.data.errors,
              idPics: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
          var filteredArray = uploadSuccess.filter((e) => e !== filename);
          setUploadSuccess(filteredArray);
        });
    }
    props.setIsUploading(false);
  }

  async function onRetry(e) {
    e.preventDefault();
    var filename = e.target.getAttribute("name");
    var id = e.target.getAttribute("id");
    var theFile;

    props.setIsUploading(true);

    if (id === "main") {
      setMainLoading(true);
      mainFile.forEach((file) => {
        if (file.name === filename) {
          theFile = file;
        }
      });

      theFile = await compressFile(theFile);
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          props.setData({
            ...props.data,
            mainPicture: data.key,
            errors: {
              ...props.data.errors,
              mainPic: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
        });
      setMainLoading(false);
    } else if (e.target.getAttribute("id") === "document") {
      setDocLoading(true);
      documentFiles.forEach((file) => {
        if (file.name === filename) {
          theFile = file;
        }
      });
      theFile = await compressFile(theFile);
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _pics = props.data.camPics.push(data.key);
          props.setData({
            ...props.data,
            camPics: _pics,
            errors: {
              ...props.data.errors,
              camPics: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
        });
      setDocLoading(false);
    } else if (e.target.getAttribute("id") === "campaign") {
      setCamLoading(true);
      campaignFiles.forEach((file) => {
        if (file.name === filename) {
          theFile = file;
        }
      });
      theFile = await compressFile(theFile);
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _supppics = props.data.supportPics.push(data.key);
          props.setData({
            ...props.data,
            supportPics: _supppics,
            errors: {
              ...props.data.errors,
              supportPics: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
        });
      setCamLoading(false);
    } else if (e.target.getAttribute("id") === "ids") {
      setIdLoading(true);
      idFiles.forEach((file) => {
        if (file.name === filename) {
          theFile = file;
        }
      });
      theFile = await compressFile(theFile);
      await S3Client_picture.uploadFile(theFile)
        .then((data) => {
          let statusArray = uploadSuccess;
          statusArray.push(filename);
          setUploadSuccess(statusArray);

          var _idpics = props.data.idPics.push(data.key);
          props.setData({
            ...props.data,
            idPics: _idpics,
            errors: {
              ...props.data.errors,
              idPics: "",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          let failStatus = uploadFailures;
          failStatus.push(filename);
          setUploadFailures(failStatus);
        });
      setIdLoading(false);
    }

    props.setIsUploading(false);
  }

  async function compressFile(img) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(img, options);

      return compressedFile;
    } catch (error) {
      console.log(error);
      return img;
    }
  }

  return (
    <div className="campaign-details">
      <FormGroup className="mb-3">
        <div className="label-last">
          <h2 className={isMobile ? "subtitle-text-mobile" : "subtitle-text"}>
            <span>
              {EN ? "Main Campaign picture" : "Imagen principal de la campaña"}
            </span>
          </h2>
        </div>
        <div className="pictures-info">
          {EN
            ? "Your title picture that represents your campaign."
            : "Será la portada de tu campaña y lo primero que las personas verán."}
          {EN ? (
            <div>
              <br />
              <p className="category-label">Requirements: </p>
              <ul className="bold-text">
                <li>Maximum of 1 picture</li>
                <li>Maximum size: 6 MB</li>
              </ul>
            </div>
          ) : (
            <div>
              <br />
              <p className="category-label">Requisitos: </p>
              <ul className="bold-text">
                <li>Máximo 1 imagen</li>
                <li>Tamaño máximo: 6 MB</li>
              </ul>
            </div>
          )}
        </div>

        <DroppingZoneMain
          campaignFiles={campaignFiles}
          mainFile={mainFile}
          file={mainFile}
          idFiles={idFiles}
          tag={"main"}
          documentFiles={documentFiles}
          EN={EN}
          setFile={setMainFile}
          setLoading={setMainLoading}
          onUpload={onUpload}
          numberOfFilesLimit={1}
          totalSizeLimit={6000000}
        />

        {
          /*props.data.errors.mainPic*/ props.errors.mainImageError ? (
            <Alert color="danger" id="alert">
              {/*props.data.errors.mainPic*/}
              {props.errors.mainImageError}
            </Alert>
          ) : (
            ""
          )
        }

        <aside>
          <ul>{cropZone}</ul>
          {/* <h6>{EN ? "File ready for Upload:" : "Archivo:" }</h6> */}
          {/* <ul>{mainThumbs}</ul> */}
          {mainFile.length === 0 ? (
            <h6
              style={{
                fontSize: "15px",
                color: "grey",
                fontFamily: "Intro-Light",
              }}
            >
              {EN
                ? "Please select files to upload!"
                : "¡Seleccione los archivos para cargar!"}
            </h6>
          ) : (
            ""
          )}
          <div className="sweet-loading">
            <div className="loader-wrapper">
              <HashLoader color={"#ea8737"} loading={mainLoading} />
            </div>
          </div>
        </aside>
      </FormGroup>

      <FormGroup className="mb-3">
        <div className="img-label">
          <h2 className={isMobile ? "subtitle-text-mobile" : "subtitle-text"}>
            <span>
              {EN ? "Campaign pictures" : "Otras fotos de la campaña"}
            </span>
          </h2>
        </div>
        <div className="pictures-info">
          {EN
            ? "Pictures that support your campaign. These pictures will get uploaded to the site."
            : "Imágenes que apoyan la historia de tu campaña. Estas imágenes serán publicadas en el sitio."}

          {EN ? (
            <div>
              <br />
              <p className="category-label">Requirements: </p>
              <ul className="bold-text">
                <li>Maximum of 4 pictures</li>
                <li>Minimum of 1 picture</li>
                <li>Maximum size: 20 MB</li>
              </ul>
            </div>
          ) : (
            <div>
              <br />
              <p className="category-label">Requisitos: </p>
              <ul className="bold-text">
                <li>Máximo 4 imágenes</li>
                <li>Mínimo 1 imagen</li>
                <li>Tamaño máximo: 20 MB</li>
              </ul>
            </div>
          )}
        </div>
        <DroppingZone
          campaignFiles={campaignFiles}
          file={campaignFiles}
          mainFile={mainFile}
          idFiles={idFiles}
          documentFiles={documentFiles}
          tag={"campaign"}
          EN={EN}
          setFile={setCampaignFiles}
          setLoading={setCamLoading}
          onUpload={onUpload}
          numberOfFilesLimit={4}
          totalSizeLimit={20000000}
        />

        {
          /*props.data.errors.camPics*/ props.errors.camImagesError ? (
            <Alert color="danger" id="alert">
              {/*props.data.errors.camPics*/}
              {props.errors.camImagesError}
            </Alert>
          ) : (
            ""
          )
        }

        <aside>
          <h6>{EN ? "Files ready for Upload:" : "Archivos:"}</h6>
          <ul>{campaignThumbs}</ul>
          {campaignFiles.length === 0 ? (
            <h6
              style={{
                fontSize: "15px",
                color: "grey",
                fontFamily: "Intro-Light",
              }}
            >
              {EN
                ? "Please select files to upload!"
                : "¡Seleccione los archivos para cargar!"}
            </h6>
          ) : (
            ""
          )}
          <div className="sweet-loading">
            <div className="loader-wrapper">
              <HashLoader color={"#ea8737"} loading={camLoading} />
            </div>
          </div>
        </aside>
      </FormGroup>

      <FormGroup className="mb-3">
        <div className="img-label">
          <h2 className={isMobile ? "subtitle-text-mobile" : "subtitle-text"}>
            <span>{EN ? "Documents" : "Documentos "}</span>
          </h2>
        </div>
        <div className="pictures-info">
          {EN
            ? "Documents that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)"
            : "Sube documentos que apoyen tu historia (fotos de historia médica, recetas médicas, fotos del pequeño negocio, etc.)"}{" "}
          <br />
          {EN
            ? "These docuemnts are only seen by Yakera to validate your campaign. They will not be posted on the site."
            : "Estos archivos solo son necesarios para la evaluación de la campaña y no serán publicados en el sitio."}
          {EN ? (
            <div>
              <br />
              <p className="category-label">Requirements: </p>
              <ul className="bold-text">
                <li>Maximum of 2 pictures</li>
                <li>Minimum of 1 picture</li>
                <li>Maximum size: 10 MB</li>
              </ul>
            </div>
          ) : (
            <div>
              <br />
              <p className="category-label">Requisitos: </p>
              <ul className="bold-text">
                <li>Máximo 2 imágenes</li>
                <li>Mínimo 1 imagen</li>
                <li>Tamaño máximo: 10 MB</li>
              </ul>
            </div>
          )}
        </div>
        <DroppingZone
          campaignFiles={campaignFiles}
          mainFile={mainFile}
          idFiles={idFiles}
          documentFiles={documentFiles}
          file={documentFiles}
          tag={"document"}
          EN={EN}
          setFile={setDocumentFiles}
          setLoading={setDocLoading}
          onUpload={onUpload}
          numberOfFilesLimit={2}
          totalSizeLimit={10000000}
        />

        {
          /*props.data.errors.supportPics*/ props.errors.supportImagesError ? (
            <Alert color="danger" id="alert">
              {/*props.data.errors.supportPics*/}
              {props.errors.supportImagesError}
            </Alert>
          ) : (
            ""
          )
        }

        <aside>
          <h6>{EN ? "Files ready for Upload:" : "Archivos:"}</h6>
          <ul>{documentThumbs}</ul>
          {documentFiles.length === 0 ? (
            <h6
              style={{
                fontSize: "15px",
                color: "grey",
                fontFamily: "Intro-Light",
              }}
            >
              {EN
                ? "Please select files to upload!"
                : "¡Seleccione los archivos para cargar!"}
            </h6>
          ) : (
            ""
          )}
          <div className="sweet-loading">
            <div className="loader-wrapper">
              <HashLoader color={"#ea8737"} loading={docLoading} />
            </div>
          </div>
        </aside>
      </FormGroup>

      <FormGroup className="mb-3">
        <div className="img-label">
          <h2 className={isMobile ? "subtitle-text-mobile" : "subtitle-text"}>
            <span>{EN ? "CC/DNI/CI/Passport" : "CC/DNI/CI/Pasaporte "}</span>
          </h2>
        </div>
        <div className="pictures-info">
          {EN ? (
            <div>
              <br />
              <p className="category-label">Requirements: </p>
              <ul className="bold-text">
                <li>Maximum of 2 pictures</li>
                <li>Minimum of 1 picture</li>
                <li>Maximum size: 10 MB</li>
              </ul>
            </div>
          ) : (
            <div>
              <br />
              <p className="category-label">Requisitos: </p>
              <ul className="bold-text">
                <li>Máximo 2 imágenes</li>
                <li>Mínimo 1 imagen</li>
                <li>Tamaño máximo: 10 MB</li>
              </ul>
            </div>
          )}
        </div>
        <DroppingZone
          campaignFiles={campaignFiles}
          mainFile={mainFile}
          idFiles={idFiles}
          documentFiles={documentFiles}
          file={idFiles}
          tag={"ids"}
          EN={EN}
          setFile={setIdFiles}
          setLoading={setIdLoading}
          onUpload={onUpload}
          numberOfFilesLimit={2}
          totalSizeLimit={10000000}
        />

        {
          /*props.data.errors.idPics*/ props.errors.idImagesError ? (
            <Alert color="danger" id="alert">
              {/*props.data.errors.idPics*/}
              {props.errors.idImagesError}
            </Alert>
          ) : (
            ""
          )
        }

        <aside>
          <h6>{EN ? "Files ready for Upload:" : "Archivos:"}</h6>
          <ul>{idThumbs}</ul>
          {idFiles.length === 0 ? (
            <h6
              style={{
                fontSize: "15px",
                color: "grey",
                fontFamily: "Intro-Light",
              }}
            >
              {EN
                ? "Please select files to upload!"
                : "¡Seleccione los archivos para cargar!"}
            </h6>
          ) : (
            ""
          )}
          <div className="sweet-loading">
            <div className="loader-wrapper">
              <HashLoader color={"#ea8737"} loading={idLoading} />
            </div>
          </div>
        </aside>
      </FormGroup>
    </div>
  );
}

export default CreateCampaignLast;
