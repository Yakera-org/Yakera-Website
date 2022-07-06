import React from 'react';


const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 80,
    marginRight: 8,
    width: '178px',
    height: '100px',
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
                        src={props.id==="main" ? props.prev : file.preview}
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
                        {props.EN ? "Success" : "Éxito"}
                    </div>
                </div>
                :
                    props.uploadFailures.includes(file.name)
                    ?
                    <div className="aws-upload">
                        <div className="aws-button-fail">
                             {props.EN ? "Failed" : "Fracasado"}
                        </div>
                        <button className="aws-button retry" id={props.id} file={file} name={file.name} onClick={props.onRetry}>
                             {props.EN ? "Retry" : "Reintentar"}
                        </button>
                    </div>

                    :
                    <div className="aws-upload">
                        <div className="aws-button">
                            {props.EN ? "Uploading..." : "Cargar..."}                            
                        </div>
                    </div>
            }   
        </>
    )
}

export default FilePreview;