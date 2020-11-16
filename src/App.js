import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddBook from "./AddBook";
import "./App.css";
import Booklist from "./Booklist";
import Home from "./Home";
import ManualAddBook from "./ManualAddBook";
import PageNotFound from "./PageNotFound";
import SetGoals from "./SetGoals";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // notifications
  const successfulCreationNotif = () => toast("successfully added book!");

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          {/* home */}
          <Home />
        </Route>
        <Route path="/add_book" exact={true}>
          {/* enter a title page */}
          <AddBook notif={successfulCreationNotif} />
        </Route>
        <Route path="/add_book_manual" exact={true}>
          {/* manual add book page */}
          <ManualAddBook notif={successfulCreationNotif} />
        </Route>
        <Route path="/set_goals" exact={true}>
          {/* edit goals page */}
          <SetGoals />
        </Route>
        <Route path="/booklist" exact={true}>
          {/* list of all books */}
          <Booklist />
        </Route>
        <Route path="*">
          {/* 404 page */}
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
