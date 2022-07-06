import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./CropImage.css"
import { Button } from "bootstrap";
import FilePreview from "./FilePreview";
// import HashLoader from "react-spinners/HashLoader";
// import Loader from "react-loader-spinner";

class CropImage extends React.Component {

    constructor() {
        super();
        this.state = {
            imageDestination: "",
            filePreview: "",
            loading: true
        };
        this.imageElement = React.createRef();
        this.canvas = "";
        this.cropper = "";
        this.updateDestination = this.updateDestination.bind(this);
    }

    componentDidMount() {    
        this.setState({ loading: false })    
        this.cropper = new Cropper(this.imageElement.current, {
            dragMode: 'move',
            aspectRatio: 16 / 9,
            autoCropArea: 0.65,
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            ready: () => {
                document.getElementById("cropbox").style.visibility = "visible";
                this.canvas = this.cropper.getCroppedCanvas();
                this.setState({ imageDestination: this.canvas.toDataURL("image/png") });
                document.getElementById("result").style.visibility = "visible";
                document.getElementById("cropandupload").style.visibility = "visible";
            },
            cropend: () => {
                this.canvas = this.cropper.getCroppedCanvas();
                this.setState({ imageDestination: this.canvas.toDataURL("image/png") });
            }
        });
        
    }

    async updateDestination(){
        document.getElementById("cropbox").outerHTML = '';
        document.getElementById("result").outerHTML = '';
        document.getElementById("cropandupload").outerHTML = '';

        var arr = (this.state.imageDestination).split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var cropped_image = new File([u8arr], this.props.image.name, {type:this.props.image.type});

        this.setState({ filePreview: <>
                                        <h6>{this.props.EN ? "File ready for Upload:" : "Archivo:" }</h6>
                                        <FilePreview EN={this.props.EN} prev={this.state.imageDestination} key={cropped_image.name} file={cropped_image} onRemove={this.props.onRemove} onRetry={this.props.onRetry} id="main" uploadSuccess={this.props.uploadSuccess} uploadFailures={this.props.uploadFailures}/>
                                    </>});
        this.props.setLoading(true);
        await this.props.onUpload(cropped_image, "main").then(()=>{
                this.props.setLoading(false);
        });

        this.setState({ filePreview: <>
                                        <h6>{this.props.EN ? "File ready for Upload:" : "Archivo:" }</h6>
                                        <FilePreview EN={this.props.EN} prev={this.state.imageDestination} key={cropped_image.name} file={cropped_image} onRemove={this.props.onRemove} onRetry={this.props.onRetry} id="main" uploadSuccess={this.props.uploadSuccess} uploadFailures={this.props.uploadFailures}/>
                                    </>});
    }

    render() {
        return (
            <div>
                <div class="img-container" id="cropbox" style={{visibility: "hidden"}}>
                    <img ref={this.imageElement} src={this.props.image.preview} alt="Source" crossorigin />
                </div>

                <div id="result" style={{visibility: "hidden"}}>
                    <img src={this.state.imageDestination} class="img-preview" alt="Destination"/>
                    <i name={this.props.image.name} id={this.props.id} onClick={this.props.onRemove} className="far fa-2x fa-times-circle"></i>
                </div>

                <div id="cropandupload" style={{visibility: "hidden", float: "left"}}>
                    <input type="Button" value="Upload" class="btn" onClick={this.updateDestination} />
                </div>

                <div>
                    {this.state.filePreview}
                </div>
            </div>
        );
    }

}

export default CropImage;