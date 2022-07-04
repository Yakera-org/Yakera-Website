import React from "react";
import { Form, InputGroup } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {

    const EN = props.EN;

    function onKeyDown(e){
        if(e.key === "Enter"){
            props.setSearch()
        }
    }

    return (
        <InputGroup
            className='searchbar'
        >
            <Form.Control
                type='search'
                placeholder={EN ? 'Search...' : 'Buscar...'}
                value={props.searchQuery}
                onChange={e => props.setSearchQuery(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <InputGroup.Text >
                <SearchIcon onClick={props.setSearch}/>
            </InputGroup.Text>
        </InputGroup>
    )
}

export default SearchBar;