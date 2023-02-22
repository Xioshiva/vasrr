import React from 'react';
import { IonList, IonItem, IonLabel, IonContent, IonCheckbox , IonAccordion,IonAccordionGroup, IonButton, IonInput, IonListHeader, useIonAlert, IonPage, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonIcon} from '@ionic/react';
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useHistory, useLocation } from "react-router-dom";
import './MyList.css';
import { addOutline, text } from 'ionicons/icons';
import { getgroups } from 'process';


const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [usersInGroups, setUsersInGroups] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [userId, setSelectUser] = useState([]);
  const [newGroupeName, setNewGroupeName] = useState<string>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useHistory();
  const location = useLocation();
  const [emailAlert] = useIonAlert();
  const [emailSubject, setEmailSubject] = useState<string>();
  const [emailBody, setEmailBody] = useState<string>();

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getUsers = async () => {
          try {
              const response = await axiosPrivate.get('/users', {
                  signal: controller.signal
              });
              isMounted && setUsers(response.data);
          } catch (err) {
              console.error(err);
              navigate.push('/unauthorized', { state: { from: location }, replace: true });
          }
      }

      getUsers();

      return () => {
          isMounted = false;
          controller.abort();
      }
  }, [])

  const getGroups = async () => {
    const controller = new AbortController();
    try {
        const response = await axiosPrivate.get('/group', {
            signal: controller.signal
        });
        setGroups(response.data);
    } catch (err) {
        console.error(err);
        navigate.push('/unauthorized', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getGroups = async () => {
        try {
            const response = await axiosPrivate.get('/group', {
                signal: controller.signal
            });
            isMounted && setGroups(response.data);
        } catch (err) {
            console.error(err);
            navigate.push('/unauthorized', { state: { from: location }, replace: true });
        }
      }
    getGroups();
    

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

    const handleChangeCheckbox = (e) => {
      
      const { value, checked } = e.target;
      if (checked) {
        // push selected value in list 
        setSelectUser(prev => [...prev, value]);
      } else {
        // remove unchecked value from the list
        setSelectUser(prev => prev.filter(x => x !== value));
      }
    }


    const addUserToGroup = async (e) => {
      const id = e.target.id;
      try {
        const response = await axiosPrivate.post('/group/' + id + '/users', 
          JSON.stringify({ id,userId}),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
        );
        getUsersInGroups();
      } catch (err) {
          console.error(err);
          // navigate.push('/login', { state: { from: location }, replace: true });
          }
        
    }
    
    const resetAccordion = () => {
      if(usersInGroups.length == 0) {
      getUsersInGroups();
    }
  }

  const getUsersInGroups = async () => {
    console.log("getUsersInGroups");
    const controller = new AbortController();
    setUsersInGroups([]);
    for (let i = 0; i < groups.length; i++) {
      try {
        const response = await axiosPrivate.get('/group/' + groups[i]._id + '/users',{
          signal: controller.signal
      });
      //filter users by user id in response.data
      const filteredUsers = users.filter(user => response.data.includes(user._id));
      setUsersInGroups(oldArray => [...oldArray,...[filteredUsers]]);
      } catch (err) {
          console.error(err);
          // navigate.push('/login', { state: { from: location }, replace: true });
          }
    }
}

  const removeUserFromGroup = async (e) => {
    const groupId = e.target.id;
    const userId = e.target.parentElement.id;
    console.log(groupId, userId);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.delete('/group/' + groupId + '/users/' + userId, 
      {
        signal: controller.signal
    });
    
    } catch (err) {
        console.error(err);
        // navigate.push('/login', { state: { from: location }, replace: true });
        }
    getUsersInGroups();
  }

  const addNewGroup = async (e) => {
    const name = newGroupeName;
    try {
      console.log(userId);
      const response = await axiosPrivate.post('/group',  JSON.stringify({ name }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
      );
      console.log(response.data);
      getGroups();
    } catch (err) {
        console.error(err);
        // navigate.push('/login', { state: { from: location }, replace: true });
        }
  }

  const removeGroup = async (e) => {
    const groupId = e.target.id;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.delete('/group/' + groupId,
      {
        signal: controller.signal
    });
    } catch (err) {
        console.error(err);
        }
    getGroups();
  }


  const sendEmail = async (e) => {
    const groupId = e.target.id;
    const controller = new AbortController();
    const subject = emailSubject;
    const text = emailBody;
    try {
      const response = await axiosPrivate.post('/group/' + groupId, JSON.stringify({ subject, text }),
      {
        signal: controller.signal
    });
    console.log(response.data);
    } catch (err) {
        console.error(err);
        // navigate.push('/login', { state: { from: location }, replace: true });
        }
  }

  const creatEmailAlert = (e) => {
    emailAlert({
      header: 'New Email',
      
      buttons: [{
        text: 'Send',
        handler: (alertData) => {
          setEmailSubject(alertData.subject);
          setEmailBody(alertData.body);
          sendEmail(e);
        }
      }, 'Cancel'],
      inputs: [
        {
          placeholder: 'Subject',
          name: 'subject'
        },
        {
          type: 'textarea',
          name: 'body',
          placeholder: 'Email Text'
          
        }
      ]
    })}

  
  return (
    <IonPage>
      <IonHeader>
  <IonToolbar>
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    <IonTitle style={{background:"#3880ff"}}>Admin Page</IonTitle>
  </IonToolbar>
</IonHeader>
  <IonContent fullscreen>
      {/*--  the side menu  --*/}
      <IonContent id="main-content" className="alert-wrapper" style={{width:"50%",display:"inline-block"}}>
        {users?.length
                ? (
                    <IonList>
                      <IonListHeader style={{color:"white"}}>Users</IonListHeader>
                        { React.Children.toArray(users.map((user, i) => <IonItem>
                          <IonLabel>{user?.username} {user?.email} {user?.id}</IonLabel>
                              <IonCheckbox value={user?._id} onIonChange={handleChangeCheckbox}/>
                          </IonItem>))}
                    </IonList>
                ) : <p>No users to display</p>
            }
            </IonContent>
      {/*-- the main content --*/}
      <IonContent id="my-content"   style={{width:"50%",display:"inline-block"}} >
        {groups?.length
                ? (
                    <IonAccordionGroup>
                      <IonListHeader style={{color:"white"}}>Groupes 
                      <IonButton onClick={addNewGroup} style={{height:"85%"}} fill="clear"> <IonIcon  slot="icon-only" icon={addOutline} /></IonButton>
                      <IonInput value={newGroupeName}  placeholder="New groupe name" onIonChange={e => setNewGroupeName(e.detail.value!)}/>
                      </IonListHeader>
                        {React.Children.toArray(groups.map((group, i) => 
                        <IonAccordion onClick={resetAccordion}>
                          <IonItem slot="header" color="light" >
                          <IonLabel nav-clear>{group?.name}</IonLabel>
                          <IonButton id={group?._id} onClick={addUserToGroup} item-end>ADD USERS</IonButton>
                          <IonButton id={group?._id} onClick={creatEmailAlert} item-end>SEND MAIL</IonButton>
                          <IonButton id={group?._id} onClick={removeGroup} item-end>REMOVE GROUP</IonButton>
                          </IonItem>
                          {usersInGroups[i]?.length
                                  ? (
                                    React.Children.toArray(usersInGroups[i].map((user, i) =>
                                      <IonItem slot="content" id={user?._id}>
                                          <IonLabel>{user?.username}</IonLabel>
                                        <IonButton id={group?._id} onClick={removeUserFromGroup} item-end>Remove User</IonButton>
                                      </IonItem>
                                      ))
                                      
                                  ) : <div className="ion-padding" slot="content">Group is empty</div>
                              }
                          </IonAccordion>))}
                    </IonAccordionGroup>
                ) : <p>No Groups to display</p>
            }
        </IonContent>
  </IonContent>
  </IonPage>
  
);
};

export default Admin;