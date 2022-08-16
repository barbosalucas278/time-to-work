/* eslint-disable no-unused-vars */
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { object, number } from "yup";
import useInterval from "../../hooks/useInterval";
import Display from "../Display/Display";
import "./styles.css";
function Timer() {
  const schema = object().shape({
    workInterval: number().required().max(60).min(15),
    restInterval: number().required().max(60).min(15),
  });
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
    } else {
      setTimerRun(null);
      eveluarIntervalo();
    }
  }, timerRun);
  function onSubmitIntervals(values) {
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
  function resetearTimer() {
    setGo(false);
    setDisplay(0);
    setWork(0);
    setRest(0);
    setPrepareInterval(false);
    setWorkInterval(false);
    setRestInterval(false);
  }
  function pausarTimer() {
    setTimerRun(null);
  }
  function continuarTimer() {
    setTimerRun(1000);
  }
  return (
    <Container fluid className="fixed-top">
      <h1 className="title">Temporizador</h1>
      <Row className="justify-content-center mt-sm-5">
        <Col xs={12} sm={6} className="containerTimerDisplay">
          <Display seconds={display}></Display>
        </Col>
        <Col xs={12} sm={6} className="mt-5">
          <h2>Intervalos</h2>
          <Formik
            initialValues={{
              prepareInterval: "",
              workInterval: "",
              restInterval: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => onSubmitIntervals(values)}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label column xs={3}>
                    Trabajo
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      name="workInterval"
                      type="number"
                      placeholder="Tiempo de trabajo"
                      value={values.workInterval}
                      onChange={handleChange}
                      isValid={errors.workInterval}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.workInterval}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label column xs={3}>
                    Descanso
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      name="restInterval"
                      type="number"
                      placeholder="Tiempo de descanso"
                      value={values.restInterval}
                      onChange={handleChange}
                      isValid={errors.restInterval}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.restInterval}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                {!go && (
                  <Button variant="success" className="mb-4" type="submit">
                    Comenzar!
                  </Button>
                )}
                {go && (
                  <>
                    <Button
                      variant="warning"
                      className="mb-4 me-3"
                      onClick={resetearTimer}
                    >
                      Resetear
                    </Button>
                    {timerRun ? (
                      <Button
                        variant="primary"
                        className="mb-4"
                        onClick={pausarTimer}
                      >
                        Pausa
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="mb-4"
                        onClick={continuarTimer}
                      >
                        Continuar
                      </Button>
                    )}
                  </>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Timer;
