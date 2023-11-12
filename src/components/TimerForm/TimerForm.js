import React from "react";
import "./styles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { object, number } from "yup";
import { Col, Row } from "react-bootstrap";

function TimerForm(props) {
  const {
    onSubmitIntervals,
    onResetTimer,
    onPauseTimer,
    onContinueTimer,
    go,
    timerRun,
  } = props;
  const schema = object().shape({
    workInterval: number()
      .required("El tiempo de trabajo es requerido")
      .max(60, "El máximo tiempo permitido es de 60 segundos")
      .min(15, "El menor tiempo permitido es 15 segundos"),
    restInterval: number()
      .required("El tiempo de descanso es requerido")
      .max(60, "El máximo tiempo permitido es de 60 segundos")
      .min(15, "El menor tiempo permitido es 15 segundos"),
  });
  return (
    <Formik
      initialValues={{
        prepareInterval: 0,
        workInterval: 0,
        restInterval: 0,
      }}
      validationSchema={schema}
      onSubmit={(values, formikHelpers) =>
        onSubmitIntervals(values, formikHelpers)
      }
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="workInterval">
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
                isValid={!errors.workInterval}
              />
            </Col>
            <Form.Control.Feedback type="invalid">
              {errors.workInterval}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="restInterval">
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
                isValid={!errors.restInterval}
              />
            </Col>
            <Form.Control.Feedback type="invalid">
              {errors.restInterval}
            </Form.Control.Feedback>
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
                onClick={onResetTimer}
              >
                Resetear
              </Button>
              {timerRun ? (
                <Button
                  variant="primary"
                  className="mb-4"
                  onClick={onPauseTimer}
                >
                  Pausa
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="mb-4"
                  onClick={onContinueTimer}
                >
                  Continuar
                </Button>
              )}
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default TimerForm;
