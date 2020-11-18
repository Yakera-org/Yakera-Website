import React, { Component, Fragment, useCallback } from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, Grid, Paper} from '@material-ui/core';
import Dropzone from 'react-dropzone'
import classnames from 'classnames';
import { validateFields } from '../Register/Validation';
import './profile.css';

class AddDialog extends Component{
    
      constructor(props) {
        super(props);
        this.readFile = this.readFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: {
                value: '',
                validateOnChange: false,
                error: ''
              },
              description: {
                value: '',
                validateOnChange: false,
                error: ''
              },
              goal: {
                value: '',
                validateOnChange: false,
                error: ''
              },
              deadline: {
                value: '',
                validateOnChange: false,
                error: ''
              },
              category: {
                value: 'Health',
                validateOnChange: false,
                error: ''
              }
        };
    }
     /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
      }
    }));
  }

  readFile(acceptedFiles){
    acceptedFiles.forEach((file) => {
        const reader = new FileReader()
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
        // Do whatever you want with the file contents
          const binaryStr = reader.result
          console.log(binaryStr)
        }
        reader.readAsText(file);
        //reader.readAsArrayBuffer(file)
      })
  }

  handleSubmit(evt){
    evt.preventDefault();

    const { name, goal, description, deadline, category } = this.state;
    const nameError = validateFields.validateName(name.value);
    const goalError = validateFields.validateNumber(goal.value);
    const desError = validateFields.validateName(description.value);
    const deadlineError = validateFields.validateName(deadline.value);
    const catError = validateFields.validateName(category.value);
    if ([nameError, goalError, desError, deadlineError].every(e => e === false)) {
        // no errors submit the form
        alert(name.value + " " + goal.value + " " + description.value + " " + deadline.value)
        this.props.onClose();
       
      } else {
        // update the state with errors
        this.setState(state => ({
          name: {
            ...state.name,
            validateOnChange: true,
            error: nameError
          },
          deadline: {
            ...state.deadline,
            validateOnChange: true,
            error: deadlineError
          },
          goal: {
            ...state.goal,
            validateOnChange: true,
            error: goalError
          },
          description: {
            ...state.description,
            validateOnChange: true,
            error: desError
          },
          category: {
            ...state.category,
            validateOnChange: true,
            error: catError
          }
        }));
      }
  }
    render(){
        const { name, description, deadline, goal, category } = this.state;
        
       
        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    style={{maxHeight:'100%', marginTop:'1%'}}                                                                                                          
                >
                    
                    <DialogTitle style={{marginTop:'2%', textAlign:'center'}} >Create campaign</DialogTitle>
                    <DialogContent >
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <div className="form-group">
                                    <label>Campaign Name</label>
                                    <input
                                    type="text"
                                    name="name"
                                    value={name.value}
                                    placeholder="Enter name of campaign"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': name.error === false },
                                        { 'is-invalid': name.error }
                                        )}
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        />
                                    <div className="invalid-feedback">{name.error}</div>
                                </div>
                        
                                <div className="form-group">
                                    <label >Category</label>
                                    <select
                                    type="text"
                                    name="category"
                                    placeholder="Health"
                                    value={category.value}
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': category.error === false },
                                        { 'is-invalid': category.error }
                                        )}
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        >
                                             <option value="health">Health</option>
                                             <option value="education">Education</option>
                                             <option value="community">Community</option>
                                             <option value="business">Business</option>
                                    </select>
                                    <div className="invalid-feedback">{category.error}</div>
                                </div>
                                <div className="form-group">
                                    <label>Goal</label>
                                    <input
                                    type="number"
                                    name="goal"
                                    value={goal.value}
                                    placeholder="$"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': goal.error === false },
                                        { 'is-invalid': goal.error }
                                        )}
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateNumber, evt)
                                        }
                                        />
                                    <div className="invalid-feedback">{goal.error}</div>
                                </div>
                                <div className="form-group">
                                    <label >Deadline</label>
                                    <input
                                    type="date"
                                    name="deadline"
                                    value={deadline.value}
                                    placeholder="Enter deadline of campaign"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': deadline.error === false },
                                        { 'is-invalid': deadline.error }
                                        )}
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        />
                                    <div className="invalid-feedback">{deadline.error}</div>
                                </div>

                                <Dropzone multiple={true}
                                onDrop={acceptedFiles => 
                                    this.readFile(acceptedFiles)
                                }>
                                {({getRootProps, getInputProps}) => (
                                    <section style={{borderStyle:'solid',
                                                     borderColor:'#ced4da',
                                                     borderRadius:'5px', 
                                                     padding:'10px', 
                                                     borderWidth:'1px'}}>
                                    <div {...getRootProps()} >
                                        <input {...getInputProps()}
                                        style={{ height:'100px'}}  />
                                        <p>Drag some files here, or click to select files</p>
                                    </div>
                                    </section>
                                )}
                                </Dropzone>                               
                        </Grid>
                        <Grid item xs={6}>
                                <div className="form-group" style={{marginLeft:'100px'}}>
                                    <label>Description</label>
                                    <br />                                        
                                    <div className="invalid-feedback">{description.error}</div>
                                                                          
                                    <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={description.value}
                                    placeholder="Enter description of campaign"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': description.error === false },
                                        { 'is-invalid': description.error }
                                        )}
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        />
                                </div>
                            </Grid>
                        <Grid item xs={12} style={{textAlign:'center'}}>
                            <button id="create-btn" onClick={this.handleSubmit}>Create Campaign</button>
                        </Grid>
                    </Grid>

                    </DialogContent>
                    
                            
                    <DialogActions 
                    disableSpacing={false}
                    >
                    <button style={{border:'none', backgroundColor:'grey', marginRight:'2%', marginBottom:'2%', color:'white', backgroundColor:'#003049', width:'100px', heigth:'50px', borderRadius:'10px'}}
                    onClick={this.props.onClose}
                    >
                        return
                    </button>                                    
                    </DialogActions>
                </Dialog>
                </Fragment> 
                  
        )
    }
}

export default AddDialog;