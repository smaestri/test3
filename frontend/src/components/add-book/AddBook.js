import React, { useContext } from 'react'
import axios from 'axios'
//import {history} from 'react-router-dom'
import { useHistory, Redirect } from "react-router-dom";

import UserContext from '../../context/UserContext'

function AddBook(props) {
    const history = useHistory();
    const { userInfo } = useContext(UserContext);
    const [bookData, setBookData] = React.useState({})
    console.log(" bookData " + JSON.stringify(bookData))

    const fetchBook = (idBook) => {
        console.log('fetch book')
        axios.get(`/books/${idBook}`/*, config*/).then(response => {
            if (response && response.data) {
                console.log('get book result=' + response.data)
                setBookData({ name: response.data.name, category: response.data.category })
            }
        })
    }

    React.useEffect(() => {
        console.log('useeffect addbook')
        if (props.params && props.params.bookId) {
            // edit book
            fetchBook(props.params.bookId);
        }
    }, []);



    const handleInputChange = (e) => {
        let obj = { ...bookData }
        obj[e.target.name] = e.target.value
        setBookData(obj)
    }

    // const config = {
    //     headers: { Authorization: `Bearer ${userInfo.token}` }
    // };

    const onSubmit = (event) => {
        event.preventDefault();
        if (props.params && props.params.bookId) {
            //use PUT, not POST
            axios.put(`/books/${props.params.bookId}`, {
                ...bookData,
            }/*, config*/).then(response => {
                history.push("/myBooks");
            })
        } else {
            axios.post(`/users/${userInfo.userId}/books`, {
                ...bookData,
            }/*, config*/).then(response => {
                history.push("/myBooks");
            })
        }
    }

    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    <input name="name" type="text" className="form-control" value={bookData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>catégorie du livre</label>
                    <input name="category" type="text" className="form-control" value={bookData.category} onChange={handleInputChange} />
                </div>

                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary" />
                </div>
            </form>
            <div><a routerLink="/home/my-books">Retour</a></div>
        </div>
    )
}

export default AddBook;
