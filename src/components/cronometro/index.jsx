import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";

import "./index.css"

const oneOrTwoNum = (num) => (num > 9 ? num : `0${num}`);
const pluralSingular = (num) => (num > 1 ? "s" : "");
const ONE_SECOND_TO_MILLISECOND = 1000
export const Cronometro = () => {
  const timerInitialState = { seconds: 0, minutes: 0, hours: 0 };
  const [timer, setTimer] = useState(timerInitialState);

  const [velocity, setVelocity] = useState(0);
  const [velocityName, setVelocityName] = useState("");
  const [intervalState, setIntervalState] = useState(null);

  const handleStart = () => {
    if(intervalState){
      handleStop()
    }

      const interval = setInterval(
        () => {
          setTimer((t) => {
            if (t.seconds === 59) {
              return { ...t, seconds: 0, minutes: t.minutes + 1 };
            }
            if (t.minutes === 59) {
              return { ...t, minutes: 0, hours: t.hours + 1 };
            }
            return { ...t, seconds: t.seconds + 1 };
          });
        },
        velocity ? ONE_SECOND_TO_MILLISECOND / velocity : ONE_SECOND_TO_MILLISECOND
      );
      setIntervalState(interval);
  };

  const handleStop = () => {
    if(!intervalState){
      console.log('No hay intervalo activo');
      return
    }
    clearInterval(intervalState);
  }

  const handleReset = () => {
    handleStop();
    setTimer(timerInitialState);
  };

  const handleVelocity = (vel, velText) => {
    if(intervalState){
      handleStop()
    }
    setVelocity(vel);
    setVelocityName(velText);
  };
  
  return (
    <Container className="container-contador d-flex justify-content-center ">
      <Row className="card-contador mt-5 border border-dark-subtle rounded">
        <Col xs={12} className="text-center py-3 d-flex flex-column justify-content-center align-items-center">
          <ButtonGroup aria-label="Basic example" className="d-block my-1">
            <Button variant="success" onClick={handleStart}>
              Comenzar
            </Button>
            <Button variant="danger" onClick={handleStop}>
              Detener
            </Button>
            <Button variant="dark" onClick={handleReset}>
              Reiniciar
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="warning"
              className={velocityName === "min" && "active"}
              onClick={() => handleVelocity(0, "min")}
            >
              Min
            </Button>
            <Button
              variant="info"
              className={velocityName === "x2" && "active"}
              onClick={() => handleVelocity(10, "x2")}
            >
              x2
            </Button>
            <Button
              variant="warning"
              className={velocityName === "x4" && "active"}
              onClick={() => handleVelocity(40, "x4")}
            >
              x4
            </Button>
            <Button
              variant="info"
              className={velocityName === "x6" && "active"}
              onClick={() => handleVelocity(80, "x6")}
            >
              x6
            </Button>
            <Button
              variant="warning"
              className={velocityName === "max" && "active"}
              onClick={() => handleVelocity(1000, "max")}
            >
              Max
            </Button>
          </ButtonGroup>
          <Card style={{ background: 'gray', color: 'white' }} className="m-auto my-3">
            <Card.Body className='m-auto'>
              <Card.Title>Cronometro</Card.Title>
              <Card.Text>
                {oneOrTwoNum(timer.hours)} horas - {oneOrTwoNum(timer.minutes)}{" "}
                minutos - {oneOrTwoNum(timer.seconds)} segundo
                {pluralSingular(timer.seconds)}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {oneOrTwoNum(timer.hours)}:{oneOrTwoNum(timer.minutes)}:
              {oneOrTwoNum(timer.seconds)}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
