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
        workInterval: 0,
        restInterval: 0,
      }}
      validationSchema={schema}
      onSubmit={(values, formikHelpers) => {
        onSubmitIntervals(values, formikHelpers);
      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
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
                onBlur={handleBlur}
                isValid={!errors.workInterval && values.workInterval}
              />
            </Col>
            {touched.workInterval && errors.workInterval && (
              <Form.Label className="text-danger fw-bolder fs-small">
                {errors.workInterval}
              </Form.Label>
            )}
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
                onBlur={handleBlur}
                isValid={!errors.restInterval && values.restInterval}
              />
            </Col>
            {touched.restInterval && errors.restInterval && (
              <Form.Label className="text-danger fw-bolder fs-small">
                {errors.restInterval}
              </Form.Label>
            )}
          </Form.Group>
          {!go && (
            <Button
              variant="success"
              className="m-0"
              type="submit"
              disabled={!isValid}
            >
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
