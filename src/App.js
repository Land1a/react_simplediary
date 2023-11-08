import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';
import Lifecycle2 from './Lifecycle2';



function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async() =>{
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments')
      .then((res)=>res.json());
    
      const initData = res.slice(0,20).map((it)=>{
        return{
          author: it.email,
          content: it.body,
          //Math.random()*5 실수값0~4 Math.floor 소수점버림
          emotion: Math.floor(Math.random()*5)+1, 
          create_date: new Date().getTime(),  //밀리초
          id: dataId.current++  //바로 return 되기 때문에 후위연산
        };
      });
      setData(initData);
  };
  
  useEffect(()=>{
    getData();
  },[])

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current+=1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it)=>it.id === targetId ? {...it, content: newContent}: it)
    );
  };

  //Memoization을 사용해 return/callback함수를 최적화 할 때는 
  //useMemo(함수,[])로 만든다. useEffect의 배열과 같은 즉 의존성 배열이다
  //배열에 들어있는 값이 변하면 함수 실행
  //배열의 값이 변하지 않으면 똑같은 값을 계산하지 않고 return
  //useMemo로 함수를 최적화하면 함수가 아닌 값으로 사용
  //useMemo는 함수를 전달받아 함수의 return값을 반환한다
  const getDiaryAnalysis = useMemo(
    () => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length)*100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <Lifecycle2/>
      <Lifecycle/> */}
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;




// const dummyList = [
//   {
//     id:1,
//     author:"배효진",
//     content:"하이 1",
//     emotion:5,
//     create_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author:"홍길동",
//     content:"하이 2",
//     emotion:3,
//     create_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author:"아무개",
//     content:"하이 3",
//     emotion:4,
//     create_date: new Date().getTime()
//   }
// ]