import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Onboarding from "./pages/Onboarding";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import SideMenu from "./components/SideMenu";
import Tabs from "./pages/Tabs"; // Asegúrate de que la ruta a tus Tabs sea correcta

/* Estilos de Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main-content">
        <SideMenu />
        <IonRouterOutlet id="main-content">
          <Route exact path="/onboarding" component={Onboarding} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/tabs" component={Tabs} />
          <Route exact path="/">
            <Redirect to="/onboarding" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
