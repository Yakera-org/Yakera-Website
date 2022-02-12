import React from 'react'
import { Grid } from '@material-ui/core';
import classnames from 'classnames'

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
                    <CardProfile data={props.data} seed={Math.floor(Math.random()*random_profiles.length)}/>
                    <hr />
                    <label>How would you like to hear about Yakera?:</label>
                    <select
                        name="preference"
                        placeholder={EN ? "Choose preference" : "Número telefónico" }
                        value={props.data.preference}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.preference === false }
                        )}
                    >
                        <option value="email">E-mail</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Facebook</option>
                    </select>
                    <div className="invalid-feedback">{props.data.errors.preference}</div>
                    <hr />

                </Grid>
                <Grid item xs={12} sm={6} id="details" >
                    <label>Location (optional):</label>
                    <input
                        type="text"
                        name="location"
                        maxLength="50"
                        placeholder={EN ? "Enter your location" : "Dirección" }
                        value={props.data.location}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.location === false }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.location}</div>

                    <label>Phone (optional):</label>
                    <input
                        type="text"
                        name="donor_phone"
                        maxLength="20"
                        placeholder={EN ? "Enter your number" : "Número telefónico" }
                        value={props.data.donor_phone}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.donor_phone === false }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.donor_phone}</div>


                    <label>Age (optional):</label>
                    <input
                        type="number"
                        name="age"
                        min="1" max="5"
                        placeholder={EN ? "Enter your age" : "Número telefónico" }
                        value={props.data.age}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.age === false }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.age}</div>

                    
                    <label>Bio (optional):</label>
                    <textarea
                        type="textarea"
                        name="bio"
                        maxLength="500"
                        placeholder={EN ? "Enter a short description about yourself" : "Número telefónico" }
                        value={props.data.bio}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.bio === false }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.bio}</div>

                    <br /> 

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
      imagePreviewUrl: random_profiles[this.props.seed],
      reader: new FileReader()
    }
    componentDidMount(){        
      this.props.data.profile_pic = random_profiles[this.props.seed]
    }
    photoUpload = e =>{
        e.preventDefault();
        var reader = this.state.reader

        if(e.target.files.length > 0){
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
        this.props.data.profile_pic = file
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
        this.props.data.profile_pic = random_pic
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
        this.props.data.profile_pic = random_profiles[index]
    }
    
    render() {
      const {imagePreviewUrl, file} = this.state;
      return (
        <div className='profile'>           
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} file={file} />      
            {
                file
                ?
                <button id="reset" onClick={this.resetPhoto}>Reset Picture</button>
                :
                <button id="random" onClick={this.randomPhoto}>Select Yakera Avatar</button>
                
            }

        </div>
      )
    }
  }