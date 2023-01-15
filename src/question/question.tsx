import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

import Data from "../data/quiz.json";

export default function Question() {
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [toggleDisabledPrev, setToggleDisabledPrev] = useState(true);
  const [toggleDisabledNext, setToggleDisabledNext] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState("None");
  const [quesAttempt, setQuesAttempt] = useState(0)
  const [checkPrevPoint, setCheckPrevPoint] = useState<Array<any>>([])
  const [showScore, setShowScore] = useState(false)

  const optionSelect = (e: any) => {
    setSelectedOpt(e.target.value);
  };
  const checkAns=(e:any) => {
    if(selectedOpt!=="None"){
      selectedOpt===Data[questionNum].answers?setScore(score+1):score>0?setScore(score-0.5):setScore(score+0);
      selectedOpt===Data[questionNum].answers?checkPrevPoint.push(1):checkPrevPoint.push(0.5);
      setQuesAttempt(quesAttempt+1);
      setCheckPrevPoint(checkPrevPoint);
    }else{

      setScore(score);
      checkPrevPoint.push(0);
      setCheckPrevPoint(checkPrevPoint);
    }
    
    questionNum<Data.length-1?setQuestionNum(questionNum+1):setSubmitBtn(true);
    setToggleDisabledPrev(false)
    setSelectedOpt("None")
    questionNum>=Data.length-1?setToggleDisabledNext(true):setToggleDisabledNext(false)
    

  }
  const changeAns=(e:any) => {
    setSelectedOpt("None")
    var lastPoint=checkPrevPoint[checkPrevPoint.length-1]
    questionNum>=1?setQuestionNum(questionNum-1):setQuestionNum(questionNum);
    lastPoint!==0.5?setScore(score-lastPoint):setScore(score+lastPoint);
    checkPrevPoint.pop();
    setToggleDisabledNext(false)
    setSubmitBtn(false)
    questionNum>1?setToggleDisabledPrev(false):setToggleDisabledPrev(true);
  }
  const onSubmit=() => {
    setShowScore(true)
  }

  return (
    <>
    {!showScore &&(
      <>
      <div className="question text-muted d-flex">
        <h3 className="me-auto text-muted">
          Q{questionNum + 1} {Data[questionNum].question}
        </h3>
        <h5 className="text-muted mx-3">Correct: <span className="text-success">+1</span></h5>
        <h5 className="text-muted mx-3">Incorrect: <span className="text-danger">-0.5</span></h5>
      </div>
      <div className="text-muted">
        <h5>{Data[questionNum].options.a}</h5>
        <Button value="a" onClick={(e) => optionSelect(e)}>
          Select Answer
        </Button>
        <h5>{Data[questionNum].options.b}</h5>
        <Button value="b" onClick={(e) => optionSelect(e)}>
          Select Answer
        </Button>
        <h5>{Data[questionNum].options.c}</h5>
        <Button value="c" onClick={(e) => optionSelect(e)}>
          Select Answer
        </Button>
        <h5>{Data[questionNum].options.d}</h5>
        <Button value="d" onClick={(e) => optionSelect(e)}>
          Select Answer
        </Button>
      </div>
      <hr />
      <div className="d-flex">
        <h5 className="me-auto text-muted">
          Question {questionNum + 1} of {Data.length}
        </h5>
        <h5 className="text-muted float-end">Selected Option: <span className="text-warning"> {selectedOpt} </span></h5>
      </div>
      <div className="d-flex justify-content-center">
        <Button id="prev" disabled={toggleDisabledPrev} onClick={e=>changeAns(e)} className="mx-2 rounded-circle">
          &lt;&lt;
        </Button>
        <Button id="next"  disabled={toggleDisabledNext} onClick={e=>checkAns(e)} className="mx-2  rounded-circle">
          &gt;&gt;
        </Button>
      </div>
      {submitBtn && (<div className="d-flex justify-content-center my-4" >
        <Button id="submitBtn" onClick={onSubmit}>Submit</Button>
      </div>)}
      </>
      )}
      {
        showScore &&( <div className="d-flex"><Card className=" card bg-info bg-gradient mt-5 text-white p-5 fs-1">
        
        <Card.Body>
          <Card.Text className="p-3 text-center">
          Your Score is {score} out of {Data.length}
          </Card.Text>
        </Card.Body>
      </Card></div>)
      }
      
    </>
  );
}
