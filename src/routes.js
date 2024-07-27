import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPanel from './admin/AdminPanel';

function App() {
  return (
    <Router>
      <Switch>
        {/* Other routes */}
        <Route path="/admin">
          <AdminPanel />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
