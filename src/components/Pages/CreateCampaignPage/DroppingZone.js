import React from 'react';
import Dropzone from 'react-dropzone';

const DroppingZone = (props) => {
    var campaignFiles = props.campaignFiles
    var mainFile = props.mainFile
    var documentFiles = props.documentFiles
    var EN = props.EN
    var setFile = props.setFile
    var setLoading = props.setLoading
    var onUpload = props.onUpload
    var numberOfFilesLimit = props.numberOfFilesLimit
    var totalSizeLimit = props.totalSizeLimit
    var file = props.file
    var tag = props.tag

    return (
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
                campaignFiles.concat(mainFile).concat(documentFiles).forEach(camFile => {
                    if (file.path === camFile.path){
                        isDuplicate = true
                    }
                })
            })
            if(isValid){
                if(!isDuplicate){
                    if (acceptedFiles.concat(file).length <= numberOfFilesLimit){
                        var totalSize = 0
                        acceptedFiles.concat(file).forEach(file => {
                            totalSize += file.size
                        });
                        if(totalSize < totalSizeLimit){
                            setFile(acceptedFiles.concat(file).map(file => Object.assign(file, {
                                preview: URL.createObjectURL(file)
                            })));
                            setLoading(true)
                            acceptedFiles.forEach(async (file, i) => {
                                await onUpload(file, tag).then(()=>{
                                    if (i === acceptedFiles.length -1) {
                                        setLoading(false) 
                                    } 
                                })
                            }); 
                        }else{
                            alert(EN ? 'File too big.' : 'La imágen son demasiado grandes.')
                        }
                    }else{
                        alert(EN ? `Only ${numberOfFilesLimit} picture allowed.` : `Solo se permite ${numberOfFilesLimit} imágen.`)
                    }
                }else{
                    alert(EN ? 'Picture already used' : 'Imagen ya utilizada')
                }
            }else{
                alert(EN ? "Only png/jpg/jpeg and png files are allowed!" : "Solamente se acepta archivos png./jpg/jpeg!")
            }                        
                
            }} multiple={true}>
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
    );
};

export default DroppingZone;