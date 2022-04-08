import React from "react"
import "./ProfileCard.css"
import SplitLine from "../SplitLine/SplitLine";
import Avatar from "../Avatar/Avatar";
import AddFriendsIcon from "../../../assets/AddFriends.svg"

class ProfileCard extends React.Component {
  addFriend = () => {
    const { profile, ws } = this.props
    console.log(ws)
    if(!ws || !profile || !profile.id) return
    let message = {
      receiver: 2,
      type: 1
    }
    ws.onmessage = (e) => {
      console.log(e.data)
    }
    ws.send(JSON.stringify(message))
  }

  render() {
    const { profile, left, top } = this.props
    return (
      <div className="ProfileCard" hidden={!profile} style={{left: left||0, top: top||0}}>
        <div>
          <div className="Profile">
            <div className="FlexGrow Flex FlexColumn">
              <div className="FlexGrow" style={{fontSize: "120%", fontWeight:"bold"}}>
                { profile?.nickname }
              </div>
              <div className="FlexGrow" style={{fontSize: "small",color:"#d2d2d2"}} hidden={ !profile?.account }>
                账号: { profile?.account }
              </div>
            </div>
            <Avatar
              size="Default"
              src="https://cloudflare.luhawxem.com/img/Avatar.jpg"
            />
          </div>
          <SplitLine/>
          <div className="Addition">
            <div className="Info">
              <div id="Region">
                广东
              </div>
            </div>
            <div className="Flex FlexRowRev">
              <img src={AddFriendsIcon} title="添加朋友" onClick={ this.addFriend }/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCard
