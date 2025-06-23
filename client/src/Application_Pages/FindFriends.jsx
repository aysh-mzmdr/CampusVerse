import style from "./friends.module.css"
import Student from "./FriendCards.jsx"

function FindFriends(){

    return(
        <>
            <div className={style.friends}>
                <Student name="Rajesh Khanna" branch="ECE" batch="2015" interests={["anime","coding","anime","coding","anime","coding","anime","coding","anime","coding","anime","coding"]}/>
                <Student name="Rajesh Khanna" branch="ECE" batch="2015" interests={["anime","coding"]}/>
                <Student name="Rajesh Khanna" branch="ECE" batch="2015" interests={["anime","coding"]}/>

            </div> 
        </>
    )
}

export default FindFriends