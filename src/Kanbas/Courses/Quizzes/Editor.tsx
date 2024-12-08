import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useLocation, useNavigate } from "react-router";
import * as quizClient from "./client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiProhibitedLine } from "react-icons/ri";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";

export default function QuizEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qid = pathname.split("/")[6];
  const [quiz, setQuiz] = useState<any>();
  const threeSpaces = <>&nbsp;&nbsp;&nbsp;</>;
  const [edit, setEdit] = useState([] as boolean[]);

  // Tab state
  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Cancel button
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  }

  // Save button
  const handleSave = async () => {
    const q = await quizClient.updateQuiz(quiz);
    dispatch(updateQuiz(q));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    window.location.reload();
  }

  // Save and Publish button
  const handleSaveAndPublish = async () => {
    const q = await quizClient.updateQuiz({ ...quiz, published: true });
    dispatch(updateQuiz(q));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    window.location.reload();
  }

  // Add new question button
  const addNewQuestion = () => {
    setQuiz({...quiz, questions: [...quiz.questions, { title: "Question " + (quiz.questions.length + 1), question: "", type: "Multiple Choice", answers: [], correctAnswers: [], points: 1 }]});
    setEdit([...edit, false]);
  }

  // save question button
  const saveQuestion = (index: number) => {
    const q = quiz.questions[index];
    const newQuestions = [...quiz.questions];
    newQuestions[index] = q;
    setQuiz({...quiz, questions: newQuestions});
    setQuestionToPreview(index);
  }

  // delete question
  const deleteQuestion = (index: number) => {
    const newQuestions = quiz.questions.filter((q: any, i: number) => i !== index);
    setQuiz({...quiz, questions: newQuestions});
    setEdit(edit.filter((e: boolean, i: number) => i !== index));
  }

  // Add answer button
  const addNewAnswer = (index: number) => {
    const newAnswers = [...quiz.questions[index].answers, ""];
    const newQuestions = [...quiz.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      answers: newAnswers,
    };
    setQuiz({ ...quiz, questions: newQuestions });
  }

  const setQuestionToEdit = (index: number) => {
    const newEdit: boolean[] = [];
    for (let i = 0; i < quiz.questions.length; i++) {
      if (i === index) {
        newEdit.push(true);
      }
      else {
        newEdit.push(edit[i]);
      }
    }
    setEdit(newEdit);
  }

  const setQuestionToPreview = (index: number) => {
    const newEdit: boolean[] = [];
    for (let i = 0; i < quiz.questions.length; i++) {
      if (i === index) {
        newEdit.push(false);
      }
      else {
        newEdit.push(edit[i]);
      }
    }
    setEdit(newEdit);
  }

  const fetchQuizzes = async () => {
    const q = await quizClient.fetchQuiz(qid as string);
    setQuiz(q);
  };
  useEffect(() => {
    fetchQuizzes();
  }, [qid]);

  return (
    <div id="wd-quizzes-editor">
      <br />
      {quiz && (
      <div>
        <div className="d-flex justify-content-end">
          <span style={{marginTop: 7}}>Points {quiz.points} </span>{threeSpaces}
          {quiz.published && <span style={{marginTop: 7}}><IoCheckmarkOutline /> Published{threeSpaces}</span>}
          {!quiz.published && <span className="text-secondary" style={{marginTop: 7}}><RiProhibitedLine /> Not Published{threeSpaces}</span>}
          <button className="btn btn-md btn-secondary">
            <BsThreeDotsVertical className="justify-content-center"/>
          </button>
        </div>
        <hr />
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
              <Tab label="Details" value="0" />
              <Tab label="Questions" value="1" />
            </Tabs>
          </Box>
          <TabPanel value="0">
            <div>
              <input type="text" className="form-control" defaultValue={quiz.title} style={{ display: 'flex', maxWidth: '500px' }}
                      onChange={(e) => {quiz.title = e.target.value; }}/>
              <br />
              <p>Quiz Instructions:</p>
              <input type="text" className="form-control" defaultValue={quiz.description} style={{ display: 'flex', maxWidth: '500px' }}
                      onChange={(e) => {quiz.description = e.target.value; }}/>
              <br />
              <div className="d-flex">
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "200", textAlign: "right" }}>
                  <div>
                    Quiz Type
                    <br /><br /><br />
                    Points
                    <br /><br />
                    Assignment Group
                    <br /><br /><br /><br /><br /><br /><br />
                    Time Limit
                    <br /><br /><br />
                    Access Code
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    Assign
                  </div>
                </div>
                {threeSpaces}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <select className="form-select" defaultValue={quiz.quizType} onChange={(e) => {quiz.quizType = e.target.value; }}>
                      <option value="Graded Quiz">Graded Quiz</option>
                      <option value="Practice Quiz">Practice Quiz</option>
                      <option value="Graded Survey">Graded Survey</option>
                      <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                    <br />
                    <input type="text" className="form-control" defaultValue={quiz.points} style={{ width: 100 }} onChange={(e) => {quiz.points = e.target.value; }}/>
                    <br />
                    <select className="form-select" defaultValue={quiz.assignmentGroup} onChange={(e) => {quiz.assignmentGroup = e.target.value; }}>
                      <option value="Quizzes">Quizzes</option>
                      <option value="Exams">Exams</option>
                      <option value="Assignments">Assignments</option>
                      <option value="Project">Project</option>
                    </select>
                    <br />
                    <b>Options</b>
                    <br /><br />
                    <input type="checkbox" className="form-check-input" defaultChecked={quiz.shuffleAnswers} onChange={(e) => {quiz.shuffleAnswers = e.target.checked ? "Yes" : "No"; }}/>&nbsp;&nbsp;Shuffle Answers
                    <br /><br />
                    <div className="d-flex">
                      <input type="text" className="form-control" style={{ width: 80, marginBottom: 0 }} defaultValue={quiz.timeLimit}
                              onChange={(e) => {quiz.timeLimit = e.target.value; }}/>&nbsp;&nbsp;<span style={{marginTop: 5}}>Minutes</span>
                    </div>
                    <br />
                    <div className="d-flex">
                      <input type="text" className="form-control" style={{ width: 200, marginBottom: 0 }} 
                              defaultValue={quiz.accessCode} onChange={(e) => {quiz.accessCode = e.target.value; }}/>
                    </div>
                    <br />
                    <div style={{ border: '1px solid lightgray', padding: '5px', paddingRight: '200px', borderRadius: '5px' }}>
                      <input type="checkbox" className="form-check-input" style={{ border: '1px solid gray' }} 
                          defaultChecked={quiz.multipleAttempts} onChange={(e) => {quiz.multipleAttempts = e.target.checked ? true : false; }}
                          />&nbsp;&nbsp;Allow Multiple Attempts
                      <br />
                      <input type="checkbox" className="form-check-input" style={{ border: '1px solid gray' }} 
                          defaultChecked={quiz.showCorrectAnswers} onChange={(e) => {quiz.showCorrectAnswers = e.target.checked ? true : false; }}
                          />&nbsp;&nbsp;Show Correct Answers
                      <br />
                      <input type="checkbox" className="form-check-input" style={{ border: '1px solid gray' }} 
                          defaultChecked={quiz.oneQuestionAtATime} onChange={(e) => {quiz.oneQuestionAtATime = e.target.checked ? true : false; }}
                          />&nbsp;&nbsp;One Question at a Time
                      <br />
                      <input type="checkbox" className="form-check-input" style={{ border: '1px solid gray' }} 
                          defaultChecked={quiz.webcamRequired} onChange={(e) => {quiz.webcamRequired = e.target.checked ? true : false; }}
                          />&nbsp;&nbsp;Webcam Required
                      <br />
                      <input type="checkbox" className="form-check-input" style={{ border: '1px solid gray' }} 
                          defaultChecked={quiz.lockQuestionsAfterAnswering} onChange={(e) => {quiz.lockQuestionsAfterAnswering = e.target.checked ? true : false; }}
                          />&nbsp;&nbsp;Lock Questions After Answering
                    </div>
                    <br />
                    <div style={{ border: '1px solid lightgray', padding: '5px', borderRadius: '5px' }}>
                      <b>Assign to</b>
                      <br />
                      <input type="checkbox" className="form-check-input" checked style={{ border: '1px solid gray' }}/>&nbsp;&nbsp;Everyone
                      <br /><br />
                      <b>Due</b>
                      <br />
                      <input type="date" className="form-control" style={{ width: 400 }} 
                              defaultValue={quiz.dueDate ? quiz.dueDate.substring(0,10) : ""}
                              onChange={(e) => {quiz.dueDate = e.target.value; }}/>
                      <br />
                      <b>Available from</b>{threeSpaces}<b>Until</b>
                      <br />
                      <div className="d-flex">
                        <input type="date" className="form-control" style={{ width: 200 }} 
                                defaultValue={quiz.availableDate ? quiz.availableDate.substring(0,10) : ""}
                                onChange={(e) => {quiz.availableDate = e.target.value; }}/>
                        <input type="date" className="form-control" style={{ width: 200 }} 
                                defaultValue={quiz.untilDate ? quiz.untilDate.substring(0,10) : ""}
                                onChange={(e) => {quiz.untilDate = e.target.value; }}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div className="d-flex" style={{ marginLeft: 150 }}>
                <button className="btn btn-secondary" onClick={() => handleCancel()}>Cancel</button>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => handleSave()}>Save</button>&nbsp;&nbsp;
                <button className="btn btn-success" onClick={() => handleSaveAndPublish()}>Save & Publish</button>
              </div>
              <hr />
            </div>
          </TabPanel>
          <TabPanel value="1">
            {quiz && (
              <div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-secondary" onClick={() => addNewQuestion()}>+ New Question</button>
                </div>
                <br />
                {quiz.questions.map((q: any, index: number) => (
                  <div>
                    <hr />
                    {q && (edit[index] === true) && (
                      <><div className="d-flex">
                        <span style={{marginTop: 5}}>Title</span>&nbsp;
                        <input type="text" className="form-control" defaultValue={q.title} key={index}
                        onChange={(e) => { quiz.questions[index].title = e.target.value; }} style={{width: 250}}/>
                        {threeSpaces}
                        <span style={{marginTop: 5}}>Question Type</span>&nbsp;
                        <select className="form-select" defaultValue={q.type} key={index} style={{ width: 200 }}
                          onChange={(e) => { setQuiz(
                            {...quiz, questions: quiz.questions.map((qq: any, i: number) => {
                              if (i === index) {
                                return {...qq, type: e.target.value, answers: [], correctAnswers: []};
                              }
                              return qq;
                            })});
                          }}>
                          <option value="Multiple Choice">Multiple Choice</option>
                          <option value="True False">True/False</option>
                          <option value="Fill in the Blank">Fill in the Blank</option>
                        </select>
                        {threeSpaces}
                        <span style={{marginTop: 5}}>Points</span>&nbsp;
                        <input type="text" className="form-control" defaultValue={q.points} key={index}
                          onChange={(e) => { quiz.questions[index].points = e.target.value; }} style={{ width: 50 }}/>
                      </div>
                      <br />
                      <div className="d-flex">
                        <span style={{marginTop: 5}}>Question</span>&nbsp;
                        <input type="text" className="form-control" defaultValue={q.question} key={index}
                          onChange={(e) => { quiz.questions[index].question = e.target.value; }} style={{ width: 500 }}/>
                      </div><br /></>
                    )}
                    {q && (edit[index] !== true) && (
                      <div className="d-flex">
                        <span>Title:</span>&nbsp;
                        <span>{q.title}</span>
                        &nbsp;|&nbsp;
                        <span>Question Type:</span>&nbsp;
                        <span>{q.type}</span>
                        &nbsp;|&nbsp;
                        <span>Point:</span>&nbsp;
                        <span>{q.points}</span>
                      </div>
                    )}
                    {q.type === "True False" && (edit[index] === true) && (
                      <div>
                        <div className="d-flex">
                          <input type="radio" name={`question-${index}`} defaultChecked={q.correctAnswers[0] === "true"}
                              onChange={(e) => { quiz.questions[index].correctAnswers = [true]; }} />
                          <span>&nbsp;True</span>
                        </div>
                        <div className="d-flex">
                          <input type="radio" name={`question-${index}`} defaultChecked={q.correctAnswers[0] === "false"}
                              onChange={(e) => { quiz.questions[index].correctAnswers = [false]; }} />
                          <span>&nbsp;False</span>
                        </div>
                      </div>
                    )}
                    {q.type === "Multiple Choice" && (edit[index] === true) && (
                      <div>
                        <button className="btn btn-secondary" onClick={() => addNewAnswer(index)}>
                          Add Answer
                        </button>
                        <br /><br />
                        {q.answers.map((a: string, i: number) => (
                          <div className="d-flex">
                            <input type="radio" name={`answer-${a}`} defaultChecked={q.correctAnswers[0] === a}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setQuiz({...quiz, questions: quiz.questions.map((qq: any, j: number) => {
                                    if (j === index) {
                                      return {...qq, correctAnswers: [a]};
                                    }
                                    return qq;
                                  })});
                                }
                              }}/>&nbsp;
                            <input type="text" className="form-control" defaultValue={a} key={i}
                              onChange={(e) => { quiz.questions[index].answers[i] = e.target.value; }} style={{ width: 500 }}/>
                            <button className="btn btn-danger" onClick={() => {  
                              if (quiz.questions[index].correctAnswers[0] === a) quiz.questions[index].correctAnswers = [];
                              quiz.questions[index].answers.splice(i, 1);
                            }}>X</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === "Fill in the Blank" && (edit[index] === true) && (
                      <div>
                      <button className="btn btn-secondary" onClick={() => addNewAnswer(index)}>
                        Add Answer
                      </button>
                      <br /><br />
                      {q.answers.map((a: string, i: number) => (
                        <div className="d-flex">
                          <input type="text" className="form-control" defaultValue={a} key={i} style={{ width: 500 }}
                            onChange={(e) => {
                              setQuiz({...quiz, questions: quiz.questions.map((qq: any, j: number) => {
                                if (j === index) {
                                  return {...qq, answers: qq.answers.map((aa: string, k: number) => {
                                    if (k === i) {
                                      return e.target.value;
                                    }
                                    return aa;
                                  })};
                                }
                                return qq;
                              })});
                            }
                          }/>
                          <button className="btn btn-danger" onClick={() => {
                            setQuiz({...quiz, questions: quiz.questions.map((qq: any, j: number) => {
                              if (j === index) {
                                return {...qq, answers: qq.answers.filter((_: any, k: number) => k !== i)};
                              }
                              return qq;
                            })});
                          }}>X</button>
                        </div>
                      ))}
                    </div>
                    )}
                    <br />
                    <div className="d-flex">
                      {!edit[index] && <button className="btn btn-secondary" onClick={() => setQuestionToEdit(index)}>Edit</button>}
                      {edit[index] && <button className="btn btn-secondary" onClick={() => setQuestionToPreview(index)}>Preview</button>}
                      &nbsp;&nbsp;
                      <button className="btn btn-danger" onClick={() => deleteQuestion(index)}>Delete Question</button>
                      &nbsp;&nbsp;
                      {edit[index] && <button className="btn btn-danger" onClick={() => saveQuestion(index)}>Save Question</button>}
                    </div>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-center">
                  <button className="btn btn-secondary" onClick={() => handleCancel()}>Cancel</button>&nbsp;&nbsp;
                  <button className="btn btn-danger" onClick={() => handleSave()}>Save</button>
                </div>
                <hr />
              </div>
            )}
          </TabPanel>
        </TabContext>
      </div>
      )}
    </div>
  );
}