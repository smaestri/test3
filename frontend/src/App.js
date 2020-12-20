import * as React from "react"
import axios from 'axios'
import ListBooks from './components/list-books/ListBooks'
import Login from './components/login/Login'
import AddBook from './components/add-book/AddBook'
import MyBooks from './components/my-books/MyBooks'
import MyBorrows from './components/my-borrows/MyBorrows'
import Header from './components/header/Header'
import AddUser from './components/add-user/AddUser'
import Home from './components/home/Home'
import UserContext from './context/UserContext'
import Container from 'react-bootstrap/Container'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

    function PrivateRoute({ children, ...rest }) {

        return (
            <Route {...rest} exact render={(routeProps) => {
                const elt = React.cloneElement(children, { params: routeProps.match.params, history: routeProps.history })
                return userInfo
                    ? elt
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: routeProps.location }
                    }} />
            }} />
        )
    }


    React.useEffect(() => {
        axios.get('/refreshConnection').then(response => {
            setUserInfo({/*token: response.data.token,*/ userId: response.data.id})
        })
    }, []);

    const [userInfo, setUserInfo] = React.useState('');

    const authenticate = (email, password) => {
        axios.post('/authenticate', {
            email: email,
            password: password
        }).then(response => {
            if (response && response.data) {
                setUserInfo(response.data)
                
            }
        })
    }
    const signout = () => {
        axios.post('/logout').then(response => {
            setUserInfo(null)
        })
    }

    const updateUserInfo = ({userId}) => {
        setUserInfo({userId})
    }

    const isConnected = (userInfo /*&& userInfo.token*/ && userInfo.userId?true:false);

    return <Router>
          <Container>
        {isConnected && <Header signout={signout} />}
      
            <UserContext.Provider value={{userInfo, updateUserInfo}} >
                <PrivateRoute path="/listBooks">
                    <ListBooks />
                </PrivateRoute>
                <PrivateRoute path="/addBook">
                    <AddBook/>
                </PrivateRoute>
                <PrivateRoute path="/addBook/:bookId">
                    <AddBook />
                </PrivateRoute>
                <PrivateRoute path="/myBooks">
                    <MyBooks />
                </PrivateRoute>
                <PrivateRoute path="/myBorrows">
                    <MyBorrows />
                </PrivateRoute>
                <Route path="/addUser">
                    <AddUser />
                </Route>
                <Route path="/login">
                    <Login authenticate={authenticate} isConnected={isConnected} />
                </Route>
            
                <Home isConnected={isConnected} />
            </UserContext.Provider>
            </Container>
    </Router>
}
