import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonButton,
  IonModal,
  IonHeader,
  IonButtons,
  IonInput,
  IonTitle,
  IonToolbar,
  IonImg,
  IonFooter
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, home,archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import AuthContext from "../context/AuthProvider";
import { useContext, useDebugValue } from "react";
import React, { useState, useRef } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import Login from '../pages/Login';
import Register from '../pages/Register';
import logo from '../assets/logo.png';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: home,
    mdIcon: home
  },
  {
    title: 'Simulator',
    url: '/simulator',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Scenario Evaluator',
    url: '/evaluator',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Scenario Creator',
    url: '/creator',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Statistics',
    url: '/statistics',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Admin',
    url: '/admin',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  }
];


const Menu: React.FC = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext) as any;
  console.log(auth.user);

  const modalLogin = useRef<HTMLIonModalElement>(null);
  const modalRegister = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirmLogin() {
    modalLogin.current?.dismiss();
  }

  
  

  function confirmRegister() {
    modalRegister.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonMenu contentId="main" type="overlay" >
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{color:"white"}}>Vas RR</IonListHeader>
          <IonButton id="open-modal" style={{width:'50%'}}>
          Login
        </IonButton>
        <IonButton id="open-modal2" style={{width:'50%'}}>
          Register
        </IonButton>    
          <IonNote>{(auth.user)}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonModal ref={modalLogin} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
          </IonHeader>
          <Login />
        </IonModal>
        <IonModal ref={modalRegister} class="mymodal" trigger="open-modal2" onWillDismiss={(ev) => onWillDismiss(ev)}>
         
          <IonHeader>
          </IonHeader>
          <Register/>
        </IonModal>
      <IonImg src={logo} className="logo" style={{height:"100px", width:"30%"}} />
      </IonContent>
    </IonMenu>
  );
};


export default Menu;
