//IMPORT
import React from 'react';
//IMPORT STYLESHEET
import '../App.css'

//REACT COMPONENT CLASS
class Quiz extends React.Component{
  //STATE DECLARE
  state = {
    quiz: false,
    timer: false,
    loading: false,
    items: [],
    score:null,
    answers: [],
    display: false
  }

  //GET QUESTIONS FUNCTION FOR CALL API AND FETCH QUIZ DATA
  getQuestions = () => {
    //LOADING STATE
    this.setState({ loading: true })
    //API CALL
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            items: result.results
          });
        },
        (error) => {
          //ERROR HANDLE
          alert('something went wrong')
          this.setState({
            loading: false
          });
        }
      )
  }

  //CHANGE RADIO HANDLE FOR THE ANSWERS
  changeRadio = (data, index, e) => {
    if(data.correct_answer == e.target.value)
      this.state.answers[index] = 1
    else
      this.state.answers[index] = 0
  }

  //FINAL RESULT FUNCTION
  handleResult = () => {
    var score = 0;
    this.state.answers.forEach(function(x) { if(x == 1) score++ });
    this.setState({score, display: true})
  }

  //RESET STATE FUNCTION
  handleResetQuiz = () => {
    this.setState({answers:[], score: null, display: false, items: []})
  }

  //START QUIZ -- MANAGE BY BUTTON
  startQuiz = () => {
    this.setState({quiz: !this.state.quiz}, () => {
      if(this.state.quiz){
        this.handleResetQuiz();
        this.getQuestions();
        this.setState({timer:true})
      }
      else {
        this.handleResult()
        this.setState({timer:false})
      }
    })
  }
  render(){
    //SHORT STATE DECLARATION
    const { quiz, items, score, display, loading } = this.state;
    return (
      <React.Fragment>
        <br/>
        <div>
          <div className='button-center' id='next' onClick={this.startQuiz}><a href="#">{!quiz ? 'Start Quiz' : 'Stop'}</a></div>
        </div>
        {loading &&  <p>Loading...</p>}
        {(quiz && items.length > 0) && items.map((data, i) =>(
        <React.Fragment key={i}>
          <div id='quiz'>
            <h2>Question {i+1} :</h2>
            <p>{data.question}</p>
            <li>
              <input type="radio" onChange={this.changeRadio.bind(this, data, i)} name={`answer${i}`} value='True' />True
            </li>
            <li>
              <input type="radio" onChange={this.changeRadio.bind(this, data, i)} name={`answer${i}`} value='False' />False
            </li>
          </div>
        </React.Fragment>
        ))}
        {
          display && <p> Your score is {score} out of 10! </p>
        }
      </React.Fragment>
    );
  }
}

//EXPORT COMPONENT
export default Quiz;
