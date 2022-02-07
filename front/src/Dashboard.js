import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate();
    function CreateShelf() { 
        navigate("/createShelf");
    }
    function ViewShelves() {
        navigate("/viewShelves");
    }
    function AddBook() {
        navigate("/addBook")
    }
    return (
        <div className="centereddiv">
            <input type="submit" value="Create shelf" onClick={CreateShelf}></input>
            <br></br>
            <input type="submit" value="View all shelves" onClick={ViewShelves}></input>
            <br></br>
            <input type="submit" value="Manage library" onClick={AddBook}></input>
        </div>
    )
}

export default Dashboard;