import React, {useState} from "react";
import classnames from 'classnames'
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Alert} from 'reactstrap'
import S3 from "aws-s3"
import HashLoader from "react-spinners/HashLoader";
import imageCompression from 'browser-image-compression';
import FilePreview from "./FilePreview";
import DroppingZone from "./DroppingZone";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY

const config_aws_pic = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'pictures',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}
const config_aws_file = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'files',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}

const S3Client_picture = new S3(config_aws_pic)
const S3Client_file = new S3(config_aws_file)

function CreateCampaignDetails(props) {
    const [mainFile, setMainFile] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [campaignFiles, setCampaignFiles] = useState([]);

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

        props.setIsUploading(true)

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

            props.setData({
                ...props.data,
                mainPicture: "",
                errors:{
                    ...props.data.errors,
                    mainPic: ""
                }
            }) 
        }
        else if (e.target.getAttribute('id') === "document"){
            newFiles = documentFiles.filter(function(item) {
                return item.path !==  filename
            })
            setDocumentFiles(newFiles)

            let _pics = []
            newFiles.forEach(pic => {
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
        }
        else if (e.target.getAttribute('id') === "campaign"){
            newFiles = campaignFiles.filter(function(item) {
               return item.path !==  filename
           })
           setCampaignFiles(newFiles)

           let _supppics = []
            newFiles.forEach(pic => {
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
       }
       props.setIsUploading(false)
    }

    // automatic uploads
    async function onUpload(theFile, id){
        var filename = theFile.name
        props.setIsUploading(true)
        
        theFile = await compressFile(theFile)

        if (id === "main"){
            await S3Client_picture.uploadFile(theFile)
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
            await S3Client_file.uploadFile(theFile)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)
                
                var _pics = props.data.camPics
                _pics.push(filename)

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
            await S3Client_picture.uploadFile(theFile)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)
                
                var _supppics = props.data.supportPics
                _supppics.push(filename)

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
        props.setIsUploading(false)
    }

    async function onRetry(e){
        e.preventDefault()
        var filename = e.target.getAttribute('name')
        var id = e.target.getAttribute('id')
        var theFile;

        props.setIsUploading(true)

        if (id === "main"){
            setMainLoading(true)
            mainFile.forEach(file => {
                if(file.name === filename){
                    theFile = file
                }
            });

            theFile = await compressFile(theFile)
            await S3Client_picture.uploadFile(theFile)
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
            theFile = await compressFile(theFile)
            await S3Client_picture.uploadFile(theFile)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)
                
                var _pics = props.data.camPics.push(filename)
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
            theFile = await compressFile(theFile)
            await S3Client_picture.uploadFile(theFile)
            .then(() => {
                let statusArray = uploadSuccess
                statusArray.push(filename)
                setUploadSuccess(statusArray)
                
                var _supppics = props.data.supportPics.push(filename)
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

        props.setIsUploading(false)
    }

    async function compressFile(img) {

        const options = {
          maxSizeMB: 1,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(img, options);

          return compressedFile
        } catch (error) {
          console.log(error);
          return img
        }

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
                                    <li>Maximum size: 6 MB</li>
                                </ul>
                            </div>
                        :
                            <div><br />Requisitos:
                                <ul>
                                    <li>Máximo de 1 imágen</li>
                                    <li>Tamaño máximo: 6 MB</li>
                                </ul>
                            </div>
                        }     
                    </div>

                    <DroppingZone  
                        campaignFiles= {campaignFiles} 
                        mainFile= {mainFile} 
                        file= {mainFile} 
                        tag = {"main"} 
                        documentFiles= {documentFiles} 
                        EN = {EN}setFile={setMainFile} 
                        setLoading={setMainLoading} 
                        onUpload={onUpload} 
                        numberOfFilesLimit={1} 
                        totalSizeLimit={6000000} 
                    />

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
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select files to upload!" : "¡Seleccione los archivos para cargar!" }</h6>
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
                                    <li>Maximum size: 10 MB</li>
                                </ul>
                            </div>
                        :
                            <div><br />Requisitos:
                                <ul>
                                    <li>Máximo de 2 imágenes</li>
                                    <li>Mínimo de 1 imagen</li>
                                    <li>Tamaño máximo: 10 MB</li>
                                </ul>
                            </div>
                        }                              
                    </div>
                    <DroppingZone  
                        campaignFiles= {campaignFiles} 
                        mainFile= {mainFile} 
                        documentFiles= {documentFiles} 
                        file = {documentFiles} 
                        tag = {"document"} 
                        EN = {EN}
                        setFile={setDocumentFiles} 
                        setLoading={setDocLoading} 
                        onUpload={onUpload} 
                        numberOfFilesLimit={2} 
                        totalSizeLimit={10000000} 
                    />

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
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select files to upload!" : "¡Seleccione los archivos para cargar!" }</h6>
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
                    <DroppingZone  
                        campaignFiles= {campaignFiles} 
                        file = {campaignFiles} 
                        mainFile= {mainFile} 
                        documentFiles= {documentFiles} 
                        tag = {"campaign"} 
                        EN = {EN}
                        setFile={setCampaignFiles} 
                        setLoading={setCamLoading} 
                        onUpload={onUpload} 
                        numberOfFilesLimit={4} 
                        totalSizeLimit={20000000} 
                    />

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
                            <h6 style={{fontSize: "15px", color: "grey", fontFamily:'Intro-Light'}}>{EN ? "Please select files to upload!" : "¡Seleccione los archivos para cargar!" }</h6>
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