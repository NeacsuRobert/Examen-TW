import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function BookForm() {
    const {shelfId} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title : "",
        genre : "",
        url: ""
    })


    async function addBook() {
        var response = await fetch(`/api/shelves/${shelfId}/books`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(book)
        })
        if (response.status === 200) {
            navigate('/');
        }
    }

    function set(property, value) {
        const newBook = {...book};
        newBook[property] = value
        setBook(newBook)
    }

    return (
        <div>
            <form className="form" onSubmit={addBook}>
                <label>Title</label>
                <input value={book.title} onChange={event => set('title', event.target.value)} />
                <label>Genre</label>
                <div onChange={event => set('genre',event.target.value)}>
                    <input type="radio" value="DRAMA" name="genre" /> Drama
                    <input type="radio" value="TRAGEDY" name="genre" /> Tragedy
                    <input type="radio" value="COMEDY" name="genre" /> Comedy
                </div>
                <label>URL</label>
                <input value={book.url} onChange={event => set('url', event.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default BookForm;