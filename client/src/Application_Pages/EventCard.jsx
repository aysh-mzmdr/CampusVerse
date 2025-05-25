import style from "./card.module.css"

function EventCard(props){

    return(
        <div className={style.eventCard}>
            <p>{props.info}</p>
            <p>{props.date}</p>
            <button className={style.eventButton}>Learn more</button>
        </div>
    )
}

export default EventCard