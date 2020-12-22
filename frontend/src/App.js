import  React, {useState} from "react"
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
import SimpleModal from './components/modal/SimpleModal'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

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
            setUserInfo({/*token: response.data.token,*/ userId: response.data.id, 
                userName: response.data.firstName +" " + response.data.lastName})
        })
    }, []);

    const [userInfo, setUserInfo] = React.useState('');

    const authenticate = (email, password) => {
        axios.post('/authenticate', {
            email: email,
            password: password
        }).then(response => {
            if (response && response.data) {
                console.log(JSON.stringify(response.data))
                setUserInfo({userId: response.data.userId, userName: response.data.userName} )
                
            }
        }).catch(error => {
            setShowModal(true);
        })
    }
    const signout = () => {
        axios.post('/logout').then(response => {
            setUserInfo(null)
        })
    }

    const updateUserInfo = ({userId, userName}) => {
        setUserInfo({userId, userName})
    }


    console.log('userInfo')
    console.log(JSON.stringify(userInfo))

    const isConnected = (userInfo /*&& userInfo.token*/ && userInfo.userId?true:false);

    return <Router>
          <div className="container">
        {isConnected && <Header signout={signout} userName={userInfo.userName} />}
      
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
                <SimpleModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    title="Echec du login"
                    bodyTxt={`Email ou mot de passe incorrect`}
                    />
            </UserContext.Provider>
            </div>
    </Router>
}
