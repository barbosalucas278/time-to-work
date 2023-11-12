/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useSound from "use-sound";
import useInterval from "../../hooks/useInterval";
import Display from "../Display/Display";
import "./styles.css";
import workSound from "../../assets/go.oga";
import restSound from "../../assets/rest.oga";
import TimerForm from "../TimerForm/TimerForm";
function Timer() {
  //falta agregar los mansajes de error, las validaciones ya estan
  const [go, setGo] = useState(false);
  const [timerRun, setTimerRun] = useState(null);
  const [display, setDisplay] = useState(0);
  const [prepare, setPrepare] = useState(10);
  const [prepareInterval, setPrepareInterval] = useState(false);
  const [work, setWork] = useState(0);
  const [workInterval, setWorkInterval] = useState(false);
  const [rest, setRest] = useState(0);
  const [restInterval, setRestInterval] = useState(false);
  const [speakerWork, setSpeakerWork] = useState(null);
  const [speakerRest, setSpeakerRest] = useState(null);
  const [synth, setSynth] = useState(null);
  const [playWork] = useSound(workSound);
  const [playRest] = useSound(restSound);
  useEffect(() => {
    setSynth(window.speechSynthesis);
    setSpeakerWork(new SpeechSynthesisUtterance());
    setSpeakerRest(new SpeechSynthesisUtterance());
  }, []);

  useEffect(() => {
    if (go) {
      crearIntervaloPrepare();
    } else {
      setTimerRun(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go]);
  useInterval(() => {
    if (display > 0) {
      evaluarSonidoSegunIntervalo();
      setDisplay(display - 1);
    } else {
      setTimerRun(null);
      eveluarIntervalo();
    }
  }, timerRun);
  function evaluarSonidoSegunIntervalo() {
    if (prepareInterval && display === prepare - 3) {
      playWork();
    } else if (workInterval && display === work - (work - 5)) {
      playRest();
    } else if (restInterval && display === rest - (rest - 7)) {
      playWork();
    }
  }
  function handleSubmitIntervals(values, formikHelpers) {
    console.log(formikHelpers);
    const { workInterval, restInterval } = values;
    setWork(workInterval);
    setRest(restInterval);
    setGo(true);
  }
  /**
   * Crear el intervalo de preparación
   * @returns
   */
  function crearIntervaloPrepare() {
    setPrepareInterval(true);
    setDisplay(prepare);
    setTimerRun(1000);
  }
  function crearIntervaloWork() {
    setDisplay(work);
    setTimerRun(1000);
  }
  function crearIntervaloRest() {
    setDisplay(rest);
    setTimerRun(1000);
  }
  function eveluarIntervalo() {
    if (prepareInterval && display <= 0) {
      setPrepareInterval(false);
      setWorkInterval(true);
      crearIntervaloWork();
    } else if (workInterval && display <= 0) {
      setWorkInterval(false);
      setRestInterval(true);
      crearIntervaloRest();
    } else if (restInterval && display === 0) {
      setRestInterval(false);
      setWorkInterval(true);
      crearIntervaloWork();
    }
  }
  function handleResetTimer() {
    setGo(false);
    setDisplay(0);
    setWork(0);
    setRest(0);
    setPrepareInterval(false);
    setWorkInterval(false);
    setRestInterval(false);
  }
  function handlerPauseTimer() {
    setTimerRun(null);
  }
  function handleContinueTimer() {
    setTimerRun(1000);
  }
  return (
    <Container fluid className="fixed-top">
      <h1 className="title">TimeToWork</h1>
      <Row className="justify-content-center mt-sm-5">
        <Col xs={12} sm={6} className="containerTimerDisplay">
          <Display seconds={display}></Display>
        </Col>
        <Col xs={12} sm={4} className="mt-5">
          <h2>Intervalos</h2>
          <TimerForm
            onSubmitIntervals={handleSubmitIntervals}
            onResetTimer={handleResetTimer}
            onPausetimer={handlerPauseTimer}
            onContinueTimer={handleContinueTimer}
            go={go}
            timerRun={timerRun}
          ></TimerForm>
        </Col>
      </Row>
    </Container>
  );
}

export default Timer;
