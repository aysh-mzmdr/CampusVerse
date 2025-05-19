import style from "./Home.module.css"

function Card(props){

    return(
        <div className={style.card}>
            <img className={style.cardImage} src={props.image} alt="image"></img>
            <h3 className={style.cardInfo}>{props.info}</h3>
        </div>
    )
}

export default Card