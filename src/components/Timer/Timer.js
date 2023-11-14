/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useInterval from "../../hooks/useInterval";
import Display from "../Display/Display";
import "./styles.css";
import TimerForm from "../TimerForm/TimerForm";
import { TextToSpeech } from "../../Helpers/TextToSpeech";
function Timer() {
  //falta agregar los mansajes de error, las validaciones ya estan
  const [go, setGo] = useState(false);
  const [timerRun, setTimerRun] = useState(null);
  const [display, setDisplay] = useState(0);
  const [prepare, setPrepare] = useState(6);
  const [prepareInterval, setPrepareInterval] = useState(false);
  const [work, setWork] = useState(0);
  const [workInterval, setWorkInterval] = useState(false);
  const [rest, setRest] = useState(0);
  const [restInterval, setRestInterval] = useState(false);
  const [handlePlay, handleStop] = TextToSpeech();

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
      setDisplay(display - 1);
      evaluarSonidoSegunIntervalo();
    } else {
      setTimerRun(null);
      eveluarIntervalo();
    }
  }, timerRun);
  function evaluarSonidoSegunIntervalo() {
    handleStop();
    if (display - 1 === 0 && (prepareInterval || restInterval)) {
      handlePlay("Vamos");
    } else if (display - 1 === 0 && workInterval) {
      handlePlay("Descanso");
    } else if (prepareInterval && display < 5) {
      handlePlay(display - 1);
    } else if (workInterval && display < 5) {
      handlePlay(display - 1);
    } else if (restInterval && display < 5) {
      handlePlay(display - 1);
    }
  }
  function handleSubmitIntervals(values, formikHelpers) {
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
            onPauseTimer={handlerPauseTimer}
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
