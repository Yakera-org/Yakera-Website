import { Form, InputGroup } from 'react-bootstrap';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends React.Component {
    render() {
        const EN = this.props.EN;
        return (
            <InputGroup
                className='searchbar'
            >
                <Form.Control
                    type='search'
                    placeholder={EN ? 'Search...' : 'Buscar...'}
                    value={this.props.searchQuery}
                    onChange={e => this.props.setSearchQuery(e.target.value)}
                    style={{
                        border: 'none',
                        backgroundColor: '#f0f0f0',
                    }}
                />
                <InputGroup.Text
                    style={{
                        border: 'none',
                        backgroundColor: '#f0f0f0',
                        borderRadius: 'initial',
                        color: '#0f335f',
                    }}
                >
                    <SearchIcon />
                </InputGroup.Text>
            </InputGroup>
        )
    }
};

export default SearchBar;