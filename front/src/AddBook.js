import { useEffect, useState } from 'react';
import Shelf from './ShelfModify'
import {useParams, useNavigate} from 'react-router-dom'

function AddBook() {
    const [shelves, setShelves] = useState([]);
    const loadShelves = async () => {
        const response = await fetch('/api/shelves');
        if (response.status === 200) {
            setShelves(await response.json());
        }
    }
    useEffect(() => loadShelves(), []);

    const navigate = useNavigate();

    function goHome() {
        navigate("/")
    }


    return (
        <div>
            <input type="submit" value="home" onClick={goHome}></input>
            <div className="container">
                {
                    shelves.map((shelf, index) => <Shelf key={index} shelf={shelf} />)
                }
            </div>
        </div>
    )
}

export default AddBook;