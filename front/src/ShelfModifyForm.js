import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function ShelfFormModify() {
    const {shelfId} = useParams();
    const navigate = useNavigate();
    const [shelf, setShelf] = useState({
        description : ""
    })

    useEffect(() => loadShelf(shelfId), [shelfId])

    const loadShelf = async(shelfId) => {
        const response = await fetch(`/api/shelves/${shelfId}`)
        if(response.status === 200) {
            setShelf(await response.json())
        }
    }

    function set(property, value) {
        const newShelf = {...shelf};
        newShelf[property] = value
        setShelf(newShelf)
    }

    async function updateShelf() {
        var response = await fetch(`/api/shelves/${shelf.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(shelf)
        })
        if (response.status === 200) {
            navigate('/addBook');
        }
    }


    return (
        <div>
            <form className="form" onSubmit={updateShelf}>
                <label>Descriere</label>
                <input value={shelf.description} onChange={event => set('description', event.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default ShelfFormModify;