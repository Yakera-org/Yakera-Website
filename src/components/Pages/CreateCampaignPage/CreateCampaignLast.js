import React  from "react"

function CampaignLastPage(props) {

    return(
    <div>
    { !props.success
        ?
        <div id='create-campaign'>
            {
                props.isUploading
                ?
                    <button  onClick={props.submit} id="disabled-create" disabled={true} style={{backgroundColor:'grey'}}>
                        {props.EN ? 'Create Campaign' : 'Crear Campaña'}
                    </button>
                :
                    <button  onClick={props.submit}>
                        {props.EN ? 'Create Campaign' : 'Crear Campaña'}
                    </button>
            }
        </div>
        :
        ""}
        </div>
    )
}

export default CampaignLastPage;
