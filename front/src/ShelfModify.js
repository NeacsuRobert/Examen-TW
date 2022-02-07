import React, { useState, useEffect } from 'react';
import Book from './Book'
import { useParams, useNavigate } from 'react-router-dom'

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

    function openBookForm() {
        navigate(`/shelves/${shelf.id}/addBook`)
    }

    function openShelfModify() {
        navigate(`/shelves/${shelf.id}/modify`)
    }


    async function deleteShelf() {
        var response = await fetch(`/api/shelves/${shelf.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            navigate('/addBook');
        }
    }



    return (
        <div>
            <div className={`column background2`} style={style}>
                <input type="reset" value="Delete Shelf" onClick={deleteShelf}></input>
                <h3>Description: </h3>
                <h1>{shelf.description}</h1>
                <h5>Created at: {shelf.createdAt}</h5>
                <input type="submit" value="Add a book" onClick={openBookForm}></input>
                <input type="submit" value="Change description" onClick={openShelfModify}></input>
                <div className="cards">
                {
                    books.map((book, index) => <Book book={book} index={props.index} key={index} />)
                }
            </div>
            </div>
        </div>
    )

}

export default Shelf;