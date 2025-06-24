import style from "./friendcard.module.css"

function FriendCard(props){

    return(
        <div className={style.card}>
            <img className={style.cardImage} src={props.image} alt="image"></img>
            <h1 style={{textAlign:"center"}}>{props.name}</h1>
            <h2>Batch  : {props.batch}</h2>
            <h2>Branch : {props.branch}</h2>
            <div className={style.interests}>
                {props.interests.map(interest => {
                    return(
                        <button className={style.interest} key={interest} disabled>{interest}</button>
                    )
                })}
            </div>
            <div className={style.buttonArea}>
                <button className={style.seeProfile}>See Profile</button>
                <button className={style.addFriend}>Add Friend</button>
            </div>
        </div>
    )

}

export default FriendCard