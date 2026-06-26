import styles from "./Placeholder.module.css"

function Placeholder({label}){

    return(
        <div className= {styles.palceholder}>
            <h2>
                {label}
            </h2>
            <p>what should I put here</p>
        </div>

    );


}

export default Placeholder