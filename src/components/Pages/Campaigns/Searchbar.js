import React, {useState} from "react";
import { Form, InputGroup } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {

    const [searchValue, setSearchValue] = useState("");

    const EN = props.EN;
    return (
        <InputGroup
            className='searchbar'
        >
            <Form.Control
                type='search'
                placeholder={EN ? 'Search...' : 'Buscar...'}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                style={{
                    border: 'none',
                    backgroundColor: '#f0f0f0',
                }}
            />
            <InputGroup.Text >
                <SearchIcon />
            </InputGroup.Text>
        </InputGroup>
    )
}

export default SearchBar;