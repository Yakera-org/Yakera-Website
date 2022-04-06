import React from 'react';
import { Grid } from '@material-ui/core';
import { Alert } from 'reactstrap';
import HashLoader from "react-spinners/HashLoader";


function EditPageVisual(props) {

    var user = props.data.user
    const EN = props.EN
    
    return (
        <div className='donorhub-container-edit'>
        <Grid container spacing={1} style={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={12}>
            <div className='banner'>
                <h2>
                    {EN ? ' Edit Profile Details' : ' Editar detalles del perfil'} 
                </h2>
                {/* <a href="/donor-hub">
                    <i class="fas fa-arrow-left"></i>
                    {EN ? ' Return' : ' Volver'}
                </a> */}
            </div>
          </Grid>    
        <Grid item xs={12} sm={12}>
            <div className='return-button'>
                <a href="/donor-hub">
                    <i className="fas fa-arrow-left"></i>
                    {EN ? ' Return' : ' Volver'}
                </a>
            </div>
            <div className='card-area'>
            <Grid container spacing={1} style={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={6} >
                    <CardProfile EN={EN} data={props.data} seed={Math.floor(Math.random()*random_profiles.length)} setIsSame={props.setIsSame}/>
                </Grid>
                <Grid item xs={12} sm={6} id="details" >
                    <label>
                        {EN ? 'First name :' : 'Nombre :'}
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        maxLength="50"
                        placeholder={EN ? "Enter your first name : " : "Nombre :" }
                        value={user.firstName}
                        onChange={props.handleChange}
                        className='form-control'
                    />

                    <label>
                        {EN ? 'Last name :' : 'Nombre :'}
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        maxLength="50"
                        placeholder={EN ? "Enter your last name : " : "Apellido : " }
                        value={user.lastName}
                        onChange={props.handleChange}
                        className='form-control'
                    />

                    <label>
                        {EN ? 'Location :' : 'Dirección :'}
                    </label>
                    <input
                        type="text"
                        name="location"
                        maxLength="50"
                        placeholder={EN ? "Enter your location" : "Tu dirección" }
                        value={user.donorInfo.location}
                        onChange={props.handleChange}
                        className='form-control'
                    />

                    <label>
                        {EN ? 'Phone :' : 'Número telefónico :'}
                    </label>
                    <input
                        type="text"
                        name="phone"
                        maxLength="20"
                        placeholder={EN ? "Enter your number" : "Tu número telefónico" }
                        value={user.phone}
                        onChange={props.handleChange}
                        className='form-control'
                    />

                    <label>
                        {EN ? 'Age :' : 'Edad  :'}
                    </label>
                    <input
                        type="number"
                        name="age"
                        min="1" max="5"
                        maxLength="2"
                        placeholder={EN ? "Enter your age" : "Tu edad" }
                        value={user.donorInfo.age}
                        onChange={props.handleChange}
                        className='form-control'
                    />
                    
                    <label>
                        {EN ? 'Bio :' : 'Biografía :'}
                    </label>
                    <textarea
                        type="textarea"
                        name="bio"
                        maxLength="500"
                        placeholder={EN ? "Enter a short description about yourself" : "Una descripción personal breve" }
                        value={user.donorInfo.bio}
                        onChange={props.handleChange}
                        className='form-control'
                    />

                    <br /> 

                </Grid>
            </Grid>
            </div>
            <div className="sweet-loading">
                <div className='loader-wrapper'>
                    <HashLoader
                        size={50}
                        color={"#ea8737"}
                        loading={props.loading}
                    />
                </div>
            </div> 
            { props.error
            ?
                <Alert color="danger" style={{width:"50%", marginLeft:"25%"}}>
                    { props.error }
                </Alert>
            :
            ''
            }
            { props.success
                    ?
                    <Alert color="success" id='alert' style={{width:"50%", marginLeft:"25%"}}>
                        {props.success}
                        <br />
                        {EN ? 
                        <>Head to your <a href="/donor-hub" style={{color:'darkgreen', textDecoration:'underline'}}> Donor Hub</a>.</> 
                        :
                         <>Dirígete a tu <a href="/donor-hub" style={{color:'darkgreen', textDecoration:'underline'}}> Donor Hub</a>.</>}                                            
                    </Alert>
                    :
                    ''
                }
            <hr />
            <button onClick={props.OnSave} className="actions" id={props.isSame ? "disabled" : "save"} disabled={props.isSame}>
                {EN ? 'Save changes' : 'Guardar cambios'}
            </button>    
            <section>
                <p>
                    Want to delete your account? Click <a href = {`mailto:info@yakera.org?subject=Delete Yakera Donor Account&body=Hello Yakera, I would like to delete my Donor Account with email: ${user.email}`}>here</a> to get in touch with one of the members of the team.
                </p>
            </section>  
        </Grid>   
        </Grid>
      </div >
    );
}

export default EditPageVisual;

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
      imagePreviewUrl: this.props.data.user.profilePicture,
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
                    this.props.data.user.profilePicture = file
                }else{
                    this.props.EN
                        ? alert("Only png/jpg/jpeg and png files are allowed!")
                        : alert("Solamente se acepta archivos png./jpg/jpeg!");
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
        this.props.data.user.profilePicture = random_pic
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
        this.props.data.user.profilePicture = random_profiles[index]
    }
    
    render() {
      const {imagePreviewUrl, file} = this.state;
      return (
        <div className='profile'>           
            <ImgUpload EN={this.props.EN} onChange={this.photoUpload} src={imagePreviewUrl} file={file} />      
            {
                file
                ?
                <button id="reset" onClick={this.resetPhoto}>{this.props.EN ? 'Reset Picture' : 'Reajustar foto'}</button>
                :
                <button id="random" onClick={this.randomPhoto}>
                    {this.props.EN 
                        ? 'Select Yakera Avatar'
                        : 'Seleccionar Avatar de Yakera'
                    }
                </button>
                
            }

        </div>
      )
    }
  }