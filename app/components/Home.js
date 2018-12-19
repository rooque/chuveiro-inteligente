// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import ChuveiroImg from '../gifs/chuveiro2.png';
import AguaGif from '../gifs/water.gif';
import ArduinoImg from '../gifs/arduino.png';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      on: false,
      timer: 300,
      temp: 30
    };
    this.timerId = null;
  }

  turnOn() {
    if (this.state.on) return;
    this.setState({ on: true });
    this.timerId = setInterval(this.tickDown.bind(this), 1000);
  }

  turnOff() {
    if (!this.state.on) return;
    this.setState({ on: false, timer: 300 });
    clearInterval(this.timerId);
  }

  fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
  }

  tickDown() {
    if (this.state.timer === 0) {
      this.turnOff();
      return;
    }
    this.setState({ timer: this.state.timer - 1 });
  }

  upTemp() {
    if (!this.state.on) return;
    if (this.state.temp >= 35) return;
    this.setState({ temp: this.state.temp + 1 });
  }

  downTemp() {
    if (!this.state.on) return;
    if (this.state.temp <= 25) return;
    this.setState({ temp: this.state.temp - 1 });
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div className={styles.subcont}>
          <p style={{fontSize: 24}}>START&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STOP</p>
            <span
              className={styles['btn-green']}
              onClick={() => this.turnOn()}
            />
            <span
              className={styles['btn-grey']}
              onClick={() => this.turnOff()}
            />
            <br />
            <br />
            <span
              className={styles['btn-blue']}
              onClick={() => this.downTemp()}
            />
            <span className={styles['btn-red']} onClick={() => this.upTemp()} />
            <br />
            <p style={{fontSize: 34}}>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</p>
          </div>
          <div className={styles.subcont2}>
            <img
              src={AguaGif}
              className={styles.agua}
              style={{ visibility: this.state.on ? 'unset' : 'hidden' }}
            />
            <img src={ChuveiroImg} className={styles.chuveiro} />
          </div>
        </div>
        <div className={styles.container2} data-tid="container">
          <div className={styles.subcont3}>
            <div className={styles.lcd}>
              <p>{this.fmtMSS(this.state.timer)}</p>
              <p>{this.state.on ? this.state.temp : '-'} °C</p>
            </div>
          </div>
          <div className={styles.subcont}>
            <p>Relé Chuveiro</p>
            <div
              className={
                styles['led-green'] +
                ' ' +
                (this.state.on ? '' : styles['led-off'])
              }
              style={{ marginBottom: 16 }}
            />
            <img src={ArduinoImg} className={styles.arduino} />
            <div
              className={
                styles['led-red'] +
                ' ' +
                (this.state.on ? '' : styles['led-off'])
              }
              style={{ marginTop: 16 }}
            />
            <p>Leitor Temperatura</p>
          </div>
        </div>
      </div>
    );
  }
}
