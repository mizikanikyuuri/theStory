import React,{ useState }  from "react";

import './StatusBar.css';
type StatusBarProps={
    className:string,
    statusList:object,
}
const hilightChecker=(oldStatus,status)=>{
    if(!oldStatus[status[0]]===undefined)
        return "status-bar-hilighted-item"
    if(oldStatus[status[0]]!==status[1])
        return "status-bar-hilighted-item"
    return "";
}
function StatusBar({className="" ,statusList}:StatusBarProps) {
    const [status, setStatus] = useState({});
    const [oldStatus, setOldStatus] = useState({});
    if(statusList!==status){
        setOldStatus(status);
        setStatus(statusList);
    }
    const statusDom=Object.entries(status).map((eachStatus,key)=>{
        return <span className={hilightChecker(oldStatus,eachStatus)} key={eachStatus[0]}>{eachStatus[0]}={eachStatus[1]} </span>;
    });
    return (
    <div className={"the-story-status-bar " + className}>
        {statusDom}
    </div>
    );
}

function UserStatusBar({className="" , statusList, ...passThroughProps}){
    return (
        <StatusBar className={"the-story-user-status-bar "+className} statusList={statusList} {...passThroughProps}/>
        );
}
function OpponentStatusBar({className="" ,statusList, ...passThroughProps}){
    return (
        <StatusBar className={"the-story-opponent-status-bar "+className} statusList={statusList} {...passThroughProps}/>
        );
}
export {StatusBarProps,UserStatusBar,OpponentStatusBar}
