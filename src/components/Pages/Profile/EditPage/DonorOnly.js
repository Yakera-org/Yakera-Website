import React from 'react';
import { Grid } from '@material-ui/core';

function DonorOnly(props) {
    const EN = props.EN
    const user = props.user
    const fieldPlaceHolders = props.fieldPlaceHolders
    const fieldDict = props.fieldDict
    return (
        <>
            <Grid item xs={12} sm={6}>
                <span id="field-span">{fieldDict["bio"]}</span>
                    <textarea
                        type="textarea"
                        name={"bio"}
                        maxLength="200"
                        onChange={props.handleChange}
                        placeholder={fieldPlaceHolders["bio"]}
                        value={user.donorInfo.bio}
                        className='form-control'
                /> 
            </Grid>

            <CardProfile EN={EN} user={user} seed={Math.floor(Math.random()*random_profiles.length)} setIsSame={props.setIsSame}/>
        </>
    );
}

export default DonorOnly;

const random_profiles = [
    "https://assets.yakera.org/yakera/profile-icon-1.webp",
    "https://assets.yakera.org/yakera/profile-icon-2.webp",
    "https://assets.yakera.org/yakera/profile-icon-3.webp",
    "https://assets.yakera.org/yakera/profile-icon-4.webp",
    "https://assets.yakera.org/yakera/profile-icon-5.webp"
]


const ImgUpload =({
    EN,
    onChange,
    src,
    file
  })=>
    <label htmlFor="photo-upload">
      <div>
        <img htmlFor="photo-upload" alt="profile-upload" src={src}/>
      </div>
      <button>{EN ? 'Upload File' : 'Subir archivo'}</button>
      <p id="pic-name">{file.name}</p>
      <input id="photo-upload" type="file" accept="image/*" onChange={onChange}/> 
    </label>

  

class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: this.props.user.profilePicture,
      reader: new FileReader()
    }

    photoUpload = e =>{
        e.preventDefault();
        var reader = this.state.reader

        if(e.target.files.length > 0){
            const file = e.target.files[0];
            if(file.size > 5000000){
                this.props.EN 
                    ? alert("File too large. (>5MB)")
                    : alert("Archivo es demasiado grande (>5mb)")
            }else{
                var fileName = file.name;
                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
                    reader.onloadend = () => {
                        this.props.setIsSame(false)
                        this.setState({
                            file: file,
                            imagePreviewUrl: reader.result
                        });
                    }
                    reader.readAsDataURL(file);
                    this.props.user.profilePicture = file
                }else{
                    alert(this.props.EN ? "Only png/jpg/jpeg and png files are allowed." : "Solamente se acepta archivos png./jpg/jpeg." )
                }              
            }
        }
    }

    resetPhoto = e =>{
        e.preventDefault();
        var random_pic = random_profiles[Math.floor(Math.random()*random_profiles.length)]
        this.setState({
                file: '',
                imagePreviewUrl: random_pic,
                reader: new FileReader()
            })
        this.props.user.profilePicture = random_pic
    }
    randomPhoto = e =>{
        e.preventDefault();
        var index = random_profiles.indexOf(this.state.imagePreviewUrl)+1
        if(index >=5){
            index = 0
        }
        this.setState({
                file: '',
                imagePreviewUrl: random_profiles[index]
            })
        this.props.setIsSame(false)
        this.props.user.profilePicture = random_profiles[index]
    }
    
    render() {
      const {imagePreviewUrl, file} = this.state;
      return (
        <div className='profile'>           
            <ImgUpload EN={this.props.EN} onChange={this.photoUpload} src={imagePreviewUrl} file={file} />      
            {
                file
                ?
                <div id="reset-wrap">
                    <button id="reset" onClick={this.resetPhoto}>{this.props.EN ? 'Reset Picture' : 'Reajustar foto'}</button>
                </div>
                :
                <div id="random-wrap">
                    <button id="random" onClick={this.randomPhoto}>
                        {this.props.EN 
                            ? 'Select Yakera Avatar'
                            : 'Seleccionar Avatar de Yakera'
                        }
                    </button>
                </div>
                
            }

        </div>
      )
    }
  }