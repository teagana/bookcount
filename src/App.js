import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          {/* home */}
        </Route>
        <Route path="/add_book" exact={true}>
          {/* enter a title page */}
        </Route>
        <Route path="/add_book_manual" exact={true}>
          {/* manual add book page */}
        </Route>
        <Route path="/set_goals" exact={true}>
          {/* edit goals page */}
        </Route>
        <Route path="/booklist" exact={true}>
          {/* list of all books */}
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
