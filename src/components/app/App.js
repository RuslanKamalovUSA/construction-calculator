import Main from '../pages/main';
import { BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import '../app/App.scss';
import AdminPanel from '../admin-panel/AdminPanel';
import LogInWindow from '../login/LogInWindow';

function App() {
  return (
      <Router>
        <div className='container'>
            <div className="container__inner">
                <div className="container__title">
                <NavLink to={"/main/calculator/app"}><h1 className='container__title-main'>КАЛЬКУЛЯТОР СТОИМОСТИ РЕМОНТА</h1></NavLink>
                </div>
                <Switch>
                  <Route exact path="/main/calculator/app">
                    <div className="App">
                      <Main/>
                    </div>
                  </Route>
                  <Route exact path="/main/calculator/admin">
                    <AdminPanel/>
                  </Route>
                  <Route exact path="/main/calculator/login">
                    <LogInWindow/>
                  </Route>
                </Switch>
            </div>
        </div>
      </Router>
  );
}

export default App;
