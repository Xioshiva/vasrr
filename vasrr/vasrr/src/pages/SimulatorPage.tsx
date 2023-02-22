import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { Simulator, Configuration, ConfigurationUtils, ObjectUtils } from "vas";
import "./SimulatorPage.css";
import { useCallback, useState } from "react";
import { Annotation } from "vas/build/model/Annotation";




const SimulatorPage: React.FC = () => {
  const [conf, setConf] = useState<Configuration>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const { name } = useParams<{ name: string }>();

  const ready = useCallback(() => {}, []);

  return (
    <IonPage>
      <IonContent className="leftPane">
      {/* <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons> */}
      </IonContent>
      <IonContent className="simul">
        <Simulator
          configuration={conf}
          onConfigurationChange={(conf) =>
            setAnnotations(conf.annotations.annotations)
          }
          onSimulatorReady={ready}
        ></Simulator>
      </IonContent>
    </IonPage>
  );
};

export default SimulatorPage;
