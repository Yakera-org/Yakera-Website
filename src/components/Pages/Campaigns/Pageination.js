import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import { Grid } from '@material-ui/core';
import CampaignCard from './campaignCard';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import ReactPaginate from 'react-paginate';

function Pageination(props) {
    const EN = props.EN;

    function handlePageClick(e){
        props.setPage(e.selected)
    }
    return(
        <div>
            <ReactPaginate
                breakLabel='...'
                nextLabel={<ArrowForward  />}
                previousLabel={<ArrowBack  />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={props.pageCount}
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={1}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={props.page-1}
            />
            {props.loading ?
            <div>
                <div className='cam-loader'>
                    <HashLoader
                        size={100}
                        color={"#ea8737"}
                        loading={true}
                        />
                </div>
                <section style={{height:"500px"}}>
                    
                </section>
            </div>
                :
            <div>
                <Grid className="cam-container" container spacing={0} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {props.campaigns.length > 0 ?                        
                        props.campaigns.map((cam, i) => {
                            return (
                                <Grid className='cam-card' item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam}
                                        language={EN ? "en" : "es"}
                                        amount={cam.raised + cam?.zelleRaised}
                                    />
                                </Grid>
                                )
                        })
                        :
                        <Grid className='no-cards' item xs={12} sm={12}>
                            <p>{EN ? "No campaigns found that match the filters." : "No se han encontrado campañas que coincidan con los filtros."}</p>
                        </Grid>
                    }
                </Grid>
            </div>
            }
            <ReactPaginate
                breakLabel='...'
                nextLabel={<ArrowForward  />}
                previousLabel={<ArrowBack  />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={props.pageCount}
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={1}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={props.page-1}
            />
        </div>
            
        );
    }

export default Pageination;