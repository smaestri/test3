import React from 'react'
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";

import './AddBook.scss'

export default class AddBook extends React.Component {

    constructor() {
        super();
        this.state = { book: {}, categories: [] }
      }


      componentDidMount() {
        this.setState({categories: [{id: 1, label:'toto'}, {id: 2, label:'tata'}]})
      }

     handleInputChange = (e)  => {
        let obj = { ...this.state.book }
        obj[e.target.name] = e.target.value
        // setBookData(obj)
        this.setState({book: {...obj}})
    }

     onSubmit = (event) =>  {
        event.prevelistBooksntDefault();
        console.log(this.state.name)
       
    }

    // const history = useHistory();
    // const [bookData, setBookData] = React.useState({name: '', categoryId: 0})
    // const [categories, setCategories] = React.useState({})

    // const fetchBook = (idBook) => {
    //     axios.get(`/books/${idBook}`).then(response => {
    //         if (response && response.data) {
    //             setBookData({ name: response.data.name, categoryId: response.data.category.id })
    //         }
    //     })
    // }

    // const fetchCategories = () => {
    //     axios.get('/categories/').then(response => {
    //         if (response && response.data) {
    //             setCategories(response.data)
    //             // Exercice : try to not put line below
    //             setBookData({ name: '', categoryId: response.data[0].id})
    //         }
    //     }).then(()=> {
    //         if (props.params && props.params.bookId) {
    //             // edit book
    //             fetchBook(props.params.bookId);
    //         }
    //     })
    // }

    // React.useEffect(() => {
    //     fetchCategories();
    // }, []);

    

    render() {
        return (
            <div className="container-add-book">
                <h1>Ajouter un livre</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Nom du livre</label>
                        <input name="name" type="text" className="form-control" value={this.state.book.name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>catégorie du livre</label>
                        {this.state.categories.length > 0  ? (<select name="categoryId" className="form-control" value={this.state.book.categoryId} onChange={this.handleInputChange}>
                            {this.state.categories.map(category => (
                                <option value={category.id} key={category.id} >{category.label}</option>
                            ))}
                        </select>):null}
                    </div>
    
                    <div className="container-submit">
                        <input type="submit" value="Valider" className="btn btn-primary" />
                    </div>
                </form>
                <div><Link to="/myBooks">Retour</Link></div>
            </div>
        )
    }
    
}
