import React, {useEffect, useState} from "react";

const UnmountTest = () => {
    //useEffect의 call back 함수가 함수를 return하게 한다
    useEffect(()=>{
        return()=>{
            //Unmount 시점에 실행되게 됨
            console.log("Unmout!");
        };
    }, []);

    return <div>Unmount Testing Component</div>
}

const Lifecycle2 = () =>{
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return(
        <div style={{padding: 20}}>
            <button onClick={toggle}>ON/OFF</button>
            {/* 단락회로평가로 앞의 값이 True면 
            뒤에 값도 확인해 True이면 뒤의 값을 반환 */}
            {isVisible && <UnmountTest/>}
        </div>
    )
};

export default Lifecycle2;