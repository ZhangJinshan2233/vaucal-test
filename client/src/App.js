import { Switch, Route, Link } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/users' exact>
          <Users />
        </Route>
        <Route path='/users/add'>
          <SignUp />
        </Route>
        <Route path='/users/:id/update'>
          <UserDetails />
        </Route>
        <Route path='/userDetails/:id'>
          <UserDetails />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
