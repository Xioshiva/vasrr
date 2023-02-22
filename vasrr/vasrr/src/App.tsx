import { IonApp, IonList, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic pages to work properly */
// import '@ionic/react/css/core.css';

// // /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// //import '@ionic/react/csscomponentelmentss';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
import 'vas/build/index.es.css';


/* Theme variables */
// import './theme/variables.css';
import User from './pages/User';
import SimulatorPage from './pages/SimulatorPage';
import Admin from './pages/Admin';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';
import Creator from './pages/Creator';
import Evaluator from './pages/Evaluator';
import Home from './pages/Home';
import Statistics from './pages/Statistics';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
          <Switch>
            <Route path="/user" exact={true} component={User}/>
            <Route path="/simulator" exact={true} component={SimulatorPage}/>
            <Route path="/unauthorized" exact={true} component={Unauthorized}/>
            <Route path="/creator" exact={true} component={Creator}/>
            <Route path="/evaluator" exact={true} component={Evaluator}/>
            <Route path="/home" exact={true} component={Home}/>
            <Route path="/statistics" exact={true} component={Statistics}/>
            <Route component={PersistLogin}>
              <Route path="/admin" exact={true} component={() => (<RequireAuth allowedRoles={[ROLES.Admin]}/>)}>
                <Route path="/admin" exact={true} component={Admin}/>
              </Route>
            </Route>
            <Route path="/" render={() => <Redirect to="/home" />} />
            <Route path="*">
              <Redirect to="/home" />
            </Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
