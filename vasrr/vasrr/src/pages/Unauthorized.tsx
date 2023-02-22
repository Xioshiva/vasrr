import { useHistory } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useHistory();


    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
            </div>
        </section>
    )
}

export default Unauthorized
