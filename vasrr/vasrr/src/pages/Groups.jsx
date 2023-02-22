import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useHistory, useLocation } from "react-router-dom";

const Groups = () => {
    const [Groups, setGroups] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useHistory();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGroups = async () => {
            try {
                const response = await axiosPrivate.get('/group', {
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setGroups(response.data);
            } catch (err) {
                console.error(err);
                navigate.push('/login', { state: { from: location }, replace: true });
            }
        }

        getGroups();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Groups List</h2>
            
            {Groups?.length
                ? (
                    <ul>
                        {Groups.map((name, i) => <li key={i}>{name?.name} <button className="butt">Send mail</button><button className="butt">Manage group</button></li>)}
                    </ul>
                ) : <p>No Groups to display</p>
            }
        </article>
    );
};

export default Groups;
