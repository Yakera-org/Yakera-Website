import React from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./CropImage.css"
import { Button } from "bootstrap";

class CropImage extends React.Component {

    constructor() {
        super();
        this.state = {
            imageDestination: ""
        };
        this.imageElement = React.createRef();
        this.canvas = "";
        this.cropper = "";
        this.updateDestination = this.updateDestination.bind(this);
    }

    componentDidMount() {
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
                this.canvas = this.cropper.getCroppedCanvas();
                this.setState({ imageDestination: this.canvas.toDataURL("image/png") });
            },
            cropend: () => {
                this.canvas = this.cropper.getCroppedCanvas();
                this.setState({ imageDestination: this.canvas.toDataURL("image/png") });
            }
        });
    }

    async updateDestination(){
        var arr = (this.state.imageDestination).split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var cropped_image = new File([u8arr], "abc.jpg", {type:"image/jpeg"});

        this.props.setLoading(true);
        await this.props.onUpload(cropped_image, "main").then(()=>{
                this.props.setLoading(false);
        });
    }

    render() {
        return (
            <div>
                <div class="img-container">
                    <img ref={this.imageElement} src={this.props.image.preview} alt="Source" crossorigin />
                </div>

                <div>
                    <img src={this.state.imageDestination} class="img-preview" alt="Destination"/>
                </div>

                <div>
                    <input type="Button" value="Crop and Upload!" class="crop_button" onClick={this.updateDestination} />
                </div>
            </div>
        );
    }

}

export default CropImage;