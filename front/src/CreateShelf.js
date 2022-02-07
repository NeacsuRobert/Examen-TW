import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function CreateShelf() {
    const {shelfId} = useParams();
    const navigate = useNavigate();
    const [shelf, setShelf ]= useState({
        description: ""
    });


    async function createShelf() {
        var response = await fetch(`/api/shelves`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(shelf)
        })
        if (response.status === 200) {
            navigate('/');
        }
    }

    function set(property, value) {
        const newShelf = {...shelf};
        newShelf[property] = value
        setShelf(newShelf)
    }

    return (
        <div>
            <form className="form" onSubmit={createShelf}>
                <label>Description</label>
                <input value={shelf.description} onChange={event => set('description', event.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateShelf;