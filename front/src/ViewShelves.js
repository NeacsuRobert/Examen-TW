import { useEffect, useState } from 'react';
import Shelf from './Shelf'
import { useParams, useNavigate } from 'react-router-dom'

function ViewShelves() {
    const [shelves, setShelves] = useState([]);
    const [filter, setFilter] = useState('');
    const loadShelves = async () => {
        const response = await fetch('/api/shelves');
        if (response.status === 200) {
            setShelves(await response.json());
        }
    }
    useEffect(() => loadShelves(), []);

    const navigate = useNavigate();

    async function SortShelves() {
        const response = await fetch('/api/getShelvesSorted');
        if (response.status === 200) {
            setShelves(await response.json());
        }
    }

    async function FilterShelves() {
        const response = await fetch(`/api/getShelfFilter/${filter}`)
        if (response.status === 200) {
            setShelves(await response.json());
        }
    }


    return (
        <div>
            <input type="submit" value="Sort" onClick={SortShelves}></input>
            <input type="submit" value="Filter" onClick={FilterShelves}></input>
            <input onChange={event => setFilter(event.target.value)}/>
            <div className="container">
                {
                    shelves.map((shelf, index) => <Shelf key={index} shelf={shelf} />)
                }
            </div>
        </div>
    )
}

export default ViewShelves;