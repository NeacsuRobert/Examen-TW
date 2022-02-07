import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function BookModifyForm() {
    const {bookId} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title : "",
        genre : "",
        url: ""
    })

    useEffect(() => loadBook(bookId), [bookId])

    const loadBook = async(bookId) => {
        const response = await fetch(`/api/books/${bookId}`)
        if(response.status === 200) {
            setBook(await response.json())
        }
    }

    async function modifyBook() {
        var response = await fetch(`/api/books/${bookId}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(book)
        })
        if (response.status === 200) {
            navigate('/addBook');
        }
    }

    async function deleteBook() {
        var response = await fetch(`/api/books/${book.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            navigate('/addBook');
        }
    }

    function set(property, value) {
        const newBook = {...book};
        newBook[property] = value
        setBook(newBook)
    }

    return (
        <div>
            <form className="form" onSubmit={modifyBook}>
                <label>Title</label>
                <input value={book.title} onChange={event => set('title', event.target.value)} />
                <label>Genre</label>
                <div onChange={event => set('genre',event.target.value)}>
                    <input type="radio" value="DRAMA" name="genre" checked={book.genre === "DRAMA"} /> Drama
                    <input type="radio" value="TRAGEDY" name="genre" checked={book.genre === "TRAGEDY"}/> Tragedy
                    <input type="radio" value="COMEDY" name="genre" checked={book.genre === "COMEDY"}/> Comedy
                </div>
                <label>URL</label>
                <input value={book.url} onChange={event => set('url', event.target.value)}/>
                <input type="submit" />
                <input type="reset" value="Delete book" onClick={deleteBook}></input>
            </form>
        </div>
    )
}

export default BookModifyForm;