import React, {useEffect, useState} from "react";

const Lifecycle = () => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    //Mount일때는 의존성배열에 값을 주지 않는다 
    useEffect(()=>{
        console.log("Mount!");
    },[]);

    //Update일때는 의존성배열을 만들지 않는다
    useEffect(()=>{
        console.log("Update!");
    });

    //의존성배열에 감지하고 싶은 값을 넣어 Update할 때 함수를 수행할 수 있다 
    useEffect(()=>{
        console.log(`count is update : ${count}`);
    }, [count]);

    //의존성배열에 감지하고 싶은 값을 넣어 Update할 때 함수를 수행할 수 있다
    useEffect(()=>{
        console.log(`text is update : ${text}`);
    }, [text]);

    return (<div style={{padding: 20}}>
        <div>
            {count}
            <button onClick={()=>{setCount(count+1)}}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
    </div>);
};

export default Lifecycle;