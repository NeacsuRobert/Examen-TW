import Book from './Book'
import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom'

function Shelf(props) {
    const { shelf } = props;
    const style = {
        width: `${props.width}%`,
    };

    const [books, setBooks] = useState([]);
    const loadBooks = async (shelfId) => {
        const response = await fetch(`/api/shelves/${shelfId}/books`);
        if (response.status === 200) {
            setBooks(await response.json());
        }
    };
    useEffect(() => loadBooks(props.shelf.id), [props.shelf.id]);
    const navigate = useNavigate()


    return (
        <div className={`column background2`} style={style}>
            <h3>Description: </h3>
            <h1>{shelf.description}</h1>
            <h5>Created at: {shelf.createdAt}</h5>
            <div className="cards">
                {
                    books.map((book, index) => <Book book={book} index={props.index} key={index} />)
                }
            </div>
        </div>
    )

}

export default Shelf;