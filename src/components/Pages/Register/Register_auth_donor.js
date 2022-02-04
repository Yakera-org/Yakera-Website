import React from 'react'
import { Grid } from '@material-ui/core';

const random_profiles = [
    "https://assets.yakera.org/yakera/profile-icon-1.webp",
    "https://assets.yakera.org/yakera/profile-icon-2.webp",
    "https://assets.yakera.org/yakera/profile-icon-3.webp",
    "https://assets.yakera.org/yakera/profile-icon-4.webp",
    "https://assets.yakera.org/yakera/profile-icon-5.webp"
]

function Register_auth_donor(props) {
    const EN = props.EN
    return (
        <div className='register-authentication'>

            <h2>{EN ? 'Tell us a bit about you' : 'Autenticación' }</h2>
            <hr />
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} >
                    <CardProfile />
                </Grid>
                <Grid item xs={12} sm={6} >
                    dets
                </Grid>
            </Grid>

            

            
        </div>
    )
}

export default Register_auth_donor

//profile pic
// bio
// location
// age
// phone

const ImgUpload =({
    onChange,
    src,
    file
  })=>
    <label htmlFor="photo-upload">
      <div>
        <img htmlFor="photo-upload" alt="profile-upload" src={src}/>
      </div>
      <button>Upload File</button>
      <p id="pic-name">{file.name}</p>
      <input id="photo-upload" type="file" accept="image/*" onChange={onChange}/> 
    </label>
  

class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: random_profiles[1]
    }
  
    photoUpload = e =>{
      e.preventDefault();

      if(e.target.files.length > 0){
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
        }
    }

    resetPhoto = e =>{
        e.preventDefault();
  
        if(e.target.files.length > 0){
          const reader = new FileReader();
          const file = e.target.files[0];
          reader.onloadend = () => {
              this.setState({
              file: file,
              imagePreviewUrl: reader.result
              });
          }
          reader.readAsDataURL(file);
          }
      }
    
    render() {
      const {imagePreviewUrl, file} = this.state;
      return (
        <div className='profile'>           
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} file={file} />      
            <button>Random Profile Picture</button>
            {
                file
                ?
                <button onClick={this.resetPhoto}>Reset</button>
                :
                ""
            }

        </div>
      )
    }
  }