import React, {useState} from "react";
import classnames from 'classnames'
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Alert} from 'reactstrap'
import Dropzone from "react-dropzone";
import { uploadFile } from "react-s3";
import HashLoader from "react-spinners/HashLoader";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY

const config_aws = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'testing',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}


const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 80,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function FilePreview(props){
    const file = props.file
    return(
        <>
            <div style={thumb} key={file.name} id="files">
                <div style={thumbInner}>
                    <img
                        alt="dropzone-img"
                        src={file.preview}
                        style={img}
                    />
                </div>
                {!props.uploadSuccess.includes(file.name)
                    ?
                    ""
                    :
                    <div id="remove-btn">
                        <i name={file.name} id={props.id} onClick={props.onRemove} className="far fa-2x fa-times-circle"></i>
                    </div>
                }
                {!props.uploadFailures.includes(file.name)
                    ?
                    ""
                    :
                    <div id="remove-btn">
                        <i name={file.name} id={props.id} onClick={props.onRemove} className="far fa-2x fa-times-circle"></i>
                    </div>
                }
            </div>

            { props.uploadSuccess.includes(file.name)
                ?
                <div className="aws-upload">
                    <div className="aws-button-success">
                        Success
                    </div>
                </div>
                :
                    props.uploadFailures.includes(file.name)
                    ?
                    <div className="aws-upload">
                        <div className="aws-button-fail">
                            Failed
                        </div>
                        <button className="aws-button retry" id={props.id} file={file} name={file.name} onClick={props.onRetry}>
                            Retry
                        </button>
                    </div>

                    :
                    <div className="aws-upload">
                        <div className="aws-button">
                            Uploading...
                        </div>
                    </div>
            }   
        </>
    )
}

function CreateCampaignDetails(props) {
    const [mainFile, setMainFile] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [campaignFiles, setCampaignFiles] = useState([]);

    const [documentFilesUploaded, setDocumentFilesUploaded] = useState([]);
    const [campaignFilesUploaded, setCampaignFilesUploaded] = useState([]);

    const [uploadSuccess, setUploadSuccess] = useState([]);
    const [uploadFailures, setUploadFailures] = useState([]);   

    const [mainLoading, setMainLoading] = useState(false);
    const [docLoading, setDocLoading] = useState(false);
    const [camLoading, setCamLoading] = useState(false);

    // https://github.com/react-dropzone/react-dropzone/tree/master/examples/previews
    const mainThumbs = mainFile.map(file => {
        return(
            <FilePreview key={file.name} file={file} onRemove={onRemove} onRetry={onRetry} id="main" uploadSuccess={uploadSuccess}uploadFailures={uploadFailures}/>        )
    });

    const documentThumbs = documentFiles.map(file => {
        return(
            <FilePreview key={file.name} file={file} onRemove={onRemove} onRetry={onRetry} id="document" uploadSuccess={uploadSuccess} uploadFailures={uploadFailures}/>
        )
    });

    const campaignThumbs = campaignFiles.map((file, i) => {
        return(
            <FilePreview key={file.name + i} file={file} onRemove={onRemove}  onRetry={onRetry} id="campaign" uploadSuccess={uploadSuccess} uploadFailures={uploadFailures}/>
        )
    });

    function onRemove(e){
        e.preventDefault()
        var filename = e.target.getAttribute('name')

        var filteredArray = uploadSuccess.filter(e => e !== filename)
        setUploadSuccess(filteredArray)
        filteredArray = uploadFailures.filter(e => e !== filename)
        setUploadFailures(filteredArray)

        var newFiles;
        if (e.target.getAttribute('id') === "main"){
            newFiles = mainFile.filter(function(item) {
                return item.path !==  filename
            })
            setMainFile(newFiles)
        }
        else if (e.target.getAttribute('id') === "document"){
            newFiles = documentFiles.filter(function(item) {
                return item.path !==  filename
            })
            setDocumentFiles(newFiles)
        }
        else if (e.target.getAttribute('id') === "campaign"){
            newFiles = campaignFiles.filter(function(item) {
               return item.path !==  filename
           })
           setCampaignFiles(newFiles)
       }
    }

    // automatic uploads
    async function onUpload(theFile, id){
        var filename = theFile.name

        if (id === "main"){
            await uploadFile(theFile, config_aws)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)

                props.setData({
                    ...props.data,
                    mainPicture: filename,
                    errors:{
                        ...props.data.errors,
                        mainPic: ""
                    }
                }) 
           
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
                var filteredArray = uploadSuccess.filter(e => e !== filename)
                setUploadSuccess(filteredArray)
            }) 
        }
        else if (id === "document"){
            await uploadFile(theFile, config_aws)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)

                setDocumentFilesUploaded(documentFilesUploaded.concat(theFile))  
                
                var _pics = props.data.camPics
                documentFilesUploaded.concat(theFile).forEach(pic => {
                    _pics.push(pic.name)
                });
                props.setData({
                    ...props.data,
                    camPics: _pics,
                    errors:{
                        ...props.data.errors,
                        camPics: ""
                    }
                })   
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
                var filteredArray = uploadSuccess.filter(e => e !== filename)
                setUploadSuccess(filteredArray)
            })         
        }
        else if (id === "campaign"){
            await uploadFile(theFile, config_aws)
            .then(() => {
                setCampaignFilesUploaded(campaignFilesUploaded.concat(theFile))  

                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)
                
                var _supppics = props.data.supportPics
                campaignFilesUploaded.concat(theFile).forEach(pic => {
                    _supppics.push(pic.name)
                });
                props.setData({
                    ...props.data,
                    supportPics: _supppics,
                    errors:{
                        ...props.data.errors,
                        supportPics: ""
                    }
                })    
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
                var filteredArray = uploadSuccess.filter(e => e !== filename)
                setUploadSuccess(filteredArray)
            })       
        }
    }

    async function onRetry(e){
        e.preventDefault()
        var fileToUpload;
        var filename = e.target.getAttribute('name')
        var id = e.target.getAttribute('id')
        var theFile;

        if (id === "main"){
            setMainLoading(true)
            mainFile.forEach(file => {
                if(file.name === filename){
                    theFile = file
                }
            });
            await uploadFile(theFile, config_aws)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)

                props.setData({
                    ...props.data,
                    mainPicture: filename,
                    errors:{
                        ...props.data.errors,
                        mainPic: ""
                    }
                }) 
           
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
            }) 
            setMainLoading(false)
        }
        else if (e.target.getAttribute('id') === "document"){
            setDocLoading(true)
            documentFiles.forEach(file => {
                if(file.name === filename){
                    theFile = file
                }
            });
            await uploadFile(theFile, config_aws)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)

                fileToUpload = documentFiles.filter(function(item) {
                    return item.path ===  filename
                })
                setDocumentFilesUploaded(documentFilesUploaded.concat(fileToUpload))  
                
                var _pics = props.data.camPics
                documentFilesUploaded.concat(theFile).forEach(pic => {
                    _pics.push(pic.name)
                });
                props.setData({
                    ...props.data,
                    camPics: _pics,
                    errors:{
                        ...props.data.errors,
                        camPics: ""
                    }
                })   
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
            })   
            setDocLoading(false)     
        }
        else if (e.target.getAttribute('id') === "campaign"){
            setCamLoading(true)
            campaignFiles.forEach(file => {
                if(file.name === filename){
                    theFile = file
                }
            });
            await uploadFile(theFile, config_aws)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)

                fileToUpload = campaignFiles.filter(function(item) {
                    return item.path ===  filename
                })
                setCampaignFilesUploaded(campaignFilesUploaded.concat(fileToUpload))  
                
                var _supppics = props.data.supportPics
                campaignFilesUploaded.concat(theFile).forEach(pic => {
                    _supppics.push(pic.name)
                });
                props.setData({
                    ...props.data,
                    supportPics: _supppics,
                    errors:{
                        ...props.data.errors,
                        supportPics: ""
                    }
                })    
            })
            .catch(err => {
                console.log(err)
                let failStatus = uploadFailures
                failStatus.push(filename)
                setUploadFailures(failStatus)
            })          
        }
        setCamLoading(false)
    }

    const EN = props.EN
    return(
        <div className='campaign-details'>
            <h2>
                {EN ? 'Details' : 'Detalles'}
            </h2>
            <hr />

            <Form container='true' spacing={3} style={{ alignItems:'flex-start' }}>
                <FormGroup item='true' xs={12} sm={6}>
                    <FormLabel>
                        {EN ? 'Campaign Category' : 'Categoría de campaña'}
                    </FormLabel>
                    {[EN ? 'Healthcare' : 'Salud',
                     EN ? 'Education' : 'Educación',
                     EN ? 'Small Business' : 'Pequeños negocios',
                     EN ? 'Nutrition' : 'Alimentación'].map((val, index) => (
                        <FormCheck
                            key={index}
                            name={'campaigncategory'}
                            value={val.toLowerCase()}
                            type='radio'
                            id={`category${index}`}
                            label={val}
                            group='category'
                            // defaultChecked= {props.data.campaignCategory}
                            onChange={props.handleChange}
                        />
                    ))}
                </FormGroup>
                <FormGroup>
                    <FormLabel>{EN ? 'Name of your Campaign' : 'Título de su campaña'}</FormLabel>
                    <FormControl
                        type='campaign-name'
                        as='input'
                        name='campaignname'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter your campaign name' : 'Llene el título de su campaña'}
                        // value={props.data.campaignName}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.campaignname === false},
                            {'is-invalid': props.data.errors.campaignname }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.campaignname}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>{EN ? 'Amount (in USD)' : 'Cantidad ($USD)'}</FormLabel>
                    <FormControl
                        type='number'
                        as='input'
                        name='amount'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter the amount (USD)' : 'Llene con la cantidad de su campaña en $USD'}
                        // value={props.data.amount}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.amount === false},
                            {'is-invalid': props.data.errors.amount }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.amount}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>{EN ? 'Short Description' : 'Breve descripción'}</FormLabel>
                    <FormControl
                        type='description'
                        as="input"
                        autoComplete="off" 
                        name='description'
                        placeholder={EN ? 'Short description of your campaign' : 'Breve descripción de su campaña'}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.description === false},
                            {'is-invalid': props.data.errors.description }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.description}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>
                        {EN ? 'Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs.' : 'Su historia (recomendamos se refiera a su propia historia, las necesidades que quiere cubrir con los fondos, por qué está abriendo una campaña, cómo va a gastar los fondos, y qué podrá hacer con los fondos). Escriba de 2 a 6 párrafos añadiendo detalles.'}
                    </FormLabel>
                    <FormControl
                        type='story'
                        autoComplete="off" 
                        as="textarea"
                        name='story'
                        style={{minHeight:'100px'}}
                        placeholder={EN ? 'Tell us your story' : 'Cuéntanos su historia'}
                        // value={props.data.story}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.story === false},
                            {'is-invalid': props.data.errors.story }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.story}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>{EN ? 'Itemized budget for each item you will purchase with the donations.' : 'Presupuesto específico de cada cosa que comprará con los fondos.'}</FormLabel>
                    <FormControl
                        type='itemized-budget'
                        as='textarea'
                        name='itemizedbudget'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter the amount (USD) and item descriptions' : 'Llene con las cosas que comprará y los precios en $USD'}
                        // value={props.data.itemizedBudget}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.itemizedbudget === false},
                            {'is-invalid': props.data.errors.itemizedbudget }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.itemizedbudget}</div>
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Main Campaign picture' : 'Imagen principal de la campaña'}</FormLabel>
                    <div className="pictures-info">
                        {EN ? 'Your title picture that represents your campaign.' : 'Imagen que representará su campaña.'}
                        {
                            EN
                        ?
                            <div><br />Requirements:
                                <ul>
                                    <li>Maximum of 1 picture</li>
                                    <li>Maximum size: 1 MB</li>
                                </ul>
                            </div>
                        :
                            <div><br />Requisitos:
                                <ul>
                                    <li>Máximo de 1 imágen</li>
                                    <li>Tamaño máximo: 1 MB</li>
                                </ul>
                            </div>
                        }     
                    </div>

                    <Dropzone accept='image/*' onDrop={(acceptedFiles) => {
                        var isDuplicate = false
                        var isValid = true
                        acceptedFiles.forEach(file => {
                            let fileName = file.name
                            var idxDot = fileName.lastIndexOf(".") + 1;
                            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                            if (extFile!=="jpg" && extFile!=="jpeg" && extFile!=="png"){
                               isValid = false
                            }   
                            campaignFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            mainFile.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            documentFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                        })
                        if(isValid){
                            if(!isDuplicate){
                                if (acceptedFiles.concat(mainFile).length <= 1){
                                    var totalSize = 0
                                    acceptedFiles.concat(mainFile).forEach(file => {
                                        totalSize += file.size
                                    });
                                    if(totalSize < 1000000){
                                        setMainFile(acceptedFiles.concat(mainFile).map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)
                                        })));
                                        setMainLoading(true)
                                        acceptedFiles.forEach(async (file, i) => {
                                            await onUpload(file, "main").then(()=>{
                                                if (i === acceptedFiles.length -1) {
                                                    setMainLoading(false) 
                                                } 
                                            })
                                        }); 
                                    }else{
                                        alert(EN ? 'File too big.' : 'La imágen son demasiado grandes.')
                                    }
                                }else{
                                    alert(EN ? 'Only 1 picture allowed.' : 'Solo se permite 1 imágen.')
                                }
                            }else{
                                alert(EN ? 'Picture already used' : 'Imagen ya utilizada')
                            }
                        }else{
                            alert(EN ? "Only png/jpg/jpeg and png files are allowed!" : "Solamente se acepta archivos png./jpg/jpeg!")
                        }                        
                            
                        }} name="mainImage" multiple={true}>
                        {({getRootProps, getInputProps}) => (
                             <section className="container" id="upload-zone">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    {EN
                                    ?
                                        <p id="info-text" >Drag 'n' drop files here, or click <b>here</b> to select files. </p>
                                    :
                                        <p id="info-text" >Arrastra y suelta archivos aquí, o haz clic <b>aquí</b> para seleccionar archivos</p>
                                    }
                                    <i className="fas fa-4x fa-file-upload"></i>
                                </div>
                            </section>
                        )}
                    </Dropzone>

                    { props.data.errors.mainPic
                    ?
                        <Alert color="danger" id='alert'>
                            {props.data.errors.mainPic}
                        </Alert>
                    :
                        ''
                    }
                   
                    <aside>
                        <h6>{EN ? "File ready for Upload:" : "Archivo:" }</h6>
                        <ul>{mainThumbs}</ul>
                        {
                            mainFile.length === 0
                            ?
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select your files" : "same but spanish" }</h6>
                            :
                            ""
                        }
                        <div className="sweet-loading">
                            <div className='loader-wrapper'>
                                <HashLoader
                                    color={"#ea8737"}
                                    loading={mainLoading}
                                />
                            </div>
                        </div>
                    </aside>                   
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Documents' : 'Documentos '}</FormLabel>
                    <div className="pictures-info">
                        {EN ? 'Documents that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)' : 'Documentos que apoyen su aplicación (historia médica, récipe médico, fotos de su negocio pequeño, etc.)'}  <br />
                        {EN ? 'These docuemnts are only seen by Yakera to validate your campaign. They will not be posted on the site.' : 'Solomente Yakera ve estos documentos para validar su campaña. No se publicarán en el sitio.'}
                        {
                            EN
                        ?
                            <div><br />Requirements:
                                <ul>
                                    <li>Maximum of 2 pictures</li>
                                    <li>Minimum of 1 picture</li>
                                    <li>Maximum size: 1 MB</li>
                                </ul>
                            </div>
                        :
                            <div><br />Requisitos:
                                <ul>
                                    <li>Máximo de 2 imágenes</li>
                                    <li>Mínimo de 1 imagen</li>
                                    <li>Tamaño máximo: 1 MB</li>
                                </ul>
                            </div>
                        }                              
                    </div>
                    <Dropzone accept='image/*' onDrop={(acceptedFiles) => {
                        var isDuplicate = false
                        var isValid = true
                        acceptedFiles.forEach(file => {
                            let fileName = file.name
                            var idxDot = fileName.lastIndexOf(".") + 1;
                            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                            if (extFile!=="jpg" && extFile!=="jpeg" && extFile!=="png"){
                               isValid = false
                            }   
                            campaignFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            mainFile.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            documentFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                        })
                        if(isValid){
                            if(!isDuplicate){
                                if (acceptedFiles.concat(documentFiles).length <= 2){
                                    var totalSize = 0
                                    acceptedFiles.concat(documentFiles).forEach(file => {
                                        totalSize += file.size
                                        
                                    });
                                    if(totalSize < 1000000){
                                        setDocumentFiles(acceptedFiles.concat(documentFiles).map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)
                                        })));
                                        setDocLoading(true)
                                        acceptedFiles.forEach(async (file, i) => {
                                            await onUpload(file, "document").then(()=>{
                                                if (i === acceptedFiles.length -1) {
                                                    setDocLoading(false) 
                                                } 
                                            })
                                        }); 
                                    }else{
                                        alert(EN ? 'Files too big' : 'Las imágenes son demasiado grandes')
                                    }
                                }else{
                                    alert(EN ? 'Only 2 pictures allowed.' : 'Solo se permiten 2 imágenes. ')
                                }
                            }else{
                                alert(EN ? 'Picture already used' : 'Imagen ya utilizada')
                            }
                        }else{
                            alert(EN ? "Only png/jpg/jpeg and png files are allowed!" : "Solamente se acepta archivos png./jpg/jpeg!")
                        }
                        }} name="documents" multiple={true}>
                        {({getRootProps, getInputProps}) => (
                             <section className="container" id="upload-zone">
                             <div {...getRootProps({className: 'dropzone'})}>
                                 <input {...getInputProps()} />
                                 {EN
                                    ?
                                        <p id="info-text" >Drag 'n' drop files here, or click <b>here</b> to select files. </p>
                                    :
                                        <p id="info-text" >Arrastra y suelta archivos aquí, o haz clic <b>aquí</b> para seleccionar archivos</p>
                                    }
                                 <i className="fas fa-4x fa-file-upload"></i>
                             </div>
                         </section>
                        )}
                    </Dropzone>

                    { props.data.errors.camPics
                    ?
                        <Alert color="danger" id='alert'>
                            {props.data.errors.camPics}
                        </Alert>
                    :
                        ''
                    }
                    
                    <aside>
                        <h6>{EN ? "Files ready for Upload:" : "Archivos:" }</h6>
                        <ul>{documentThumbs}</ul>
                        {
                            documentFiles.length === 0
                            ?
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select your files" : "same but spanish" }</h6>
                            :
                            ""
                        }
                        <div className="sweet-loading">
                            <div className='loader-wrapper'>
                                <HashLoader
                                    color={"#ea8737"}
                                    loading={docLoading}
                                />
                            </div>
                        </div> 
                    </aside>
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Campaign pictures' : 'Otras fotos de la campaña'}</FormLabel>
                    <div className="pictures-info">
                        {EN ? 'Pictures that support your campaign. These pictures will get uploaded to the site.' : 'Imágenes que apoyan su campaña. Estas imágenes se subirán al sitio.'}
                        
                        {
                            EN
                        ?
                            <div><br />Requirements:
                                <ul>
                                    <li>Maximum of 4 pictures</li>
                                    <li>Minimum of 1 picture</li>
                                    <li>Maximum size: 20 MB</li>
                                </ul>
                            </div>
                        :
                            <div><br />Requisitos:
                                <ul>
                                    <li>Máximo de 4 imágenes</li>
                                    <li>Mínimo de 1 imagen</li>
                                    <li>Tamaño máximo: 20 MB</li>
                                </ul>
                            </div>
                        }                    
                    </div>
                    <Dropzone accept='image/*' onDrop={(acceptedFiles) => {
                        var isDuplicate = false
                        var isValid = true
                        acceptedFiles.forEach(file => {
                            let fileName = file.name
                            var idxDot = fileName.lastIndexOf(".") + 1;
                            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                            if (extFile!=="jpg" && extFile!=="jpeg" && extFile!=="png"){
                               isValid = false
                            }   
                            campaignFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            mainFile.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                            documentFiles.forEach(camFile => {
                                if (file.path === camFile.path){
                                    isDuplicate = true
                                }
                            })
                        })
                        if(isValid){
                            if(!isDuplicate){
                                if (acceptedFiles.length + campaignFiles.length <= 4){
                                    var totalSize = 0
                                    acceptedFiles.concat(campaignFiles).forEach(file => {
                                        totalSize += file.size                                
                                    });
                                    if(totalSize < 20000000){
                                        setCampaignFiles(acceptedFiles.concat(campaignFiles).map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)
                                        })));
                                        acceptedFiles.forEach(async (file, i)  =>   {
                                            setCamLoading(true)
                                            await onUpload(file, "campaign").then(()=>{
                                                if (i === acceptedFiles.length -1) {
                                                    setCamLoading(false) 
                                                } 
                                            })
                                        });
                                    }else{
                                        alert(EN ? 'Files too big' : 'Las imágenes son demasiado grandes')
                                    }
                                }else{
                                    alert(EN ? 'Only 4 pictures allowed.' : 'Solo se permiten 4 imágenes.')
                                }
                            }else{
                                alert(EN ? 'Picture already used' : 'Imagen ya utilizada')
                            }
                        }else{
                            alert(EN ? "Only png/jpg/jpeg and png files are allowed!" : "Solamente se acepta archivos png./jpg/jpeg!")
                        }
                    }} name="campaignImages" multiple={true}>
                            {({getRootProps, getInputProps}) => (
                                <section className="container" id="upload-zone">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        
                                        {EN
                                        ?
                                            <p id="info-text" >Drag 'n' drop files here, or click <b>here</b> to select files. </p>
                                        :
                                            <p id="info-text" >Arrastra y suelta archivos aquí, o haz clic <b>aquí</b> para seleccionar archivos</p>
                                        }
                                    
                                        <i className="fas fa-4x fa-file-upload"></i>
                                    </div>
                                </section>
                            )}
                    </Dropzone>

                    { props.data.errors.supportPics
                    ?
                        <Alert color="danger" id='alert'>
                            {props.data.errors.supportPics}
                        </Alert>
                    :
                        ''
                    }
                   
                    <aside>
                        <h6>{EN ? "Files ready for Upload:" : "Archivos:" }</h6>
                        <ul>{campaignThumbs}</ul>
                        {
                            campaignFiles.length === 0
                            ?
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select your files" : "same but spanish" }</h6>
                            :
                            ""
                        }
                        <div className="sweet-loading">
                            <div className='loader-wrapper'>
                                <HashLoader
                                    color={"#ea8737"}
                                    loading={camLoading}
                                />
                            </div>
                        </div> 
                    </aside> 
                </FormGroup>
            </Form>

        </div>
    )
}

export default CreateCampaignDetails;