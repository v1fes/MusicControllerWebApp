import React, { Component } from "react";
import CookieConsent from "react-cookie-consent";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./Info";

/**
 * Головна сторінка додатку House Party.
 *
 * Відображає основну навігацію, кнопку входу в кімнату, інформацію та створення кімнати.
 * Додає банер CookieConsent для повідомлення про cookies згідно з GDPR.
 *
 * @component
 * @example
 * return (
 *   <HomePage />
 * )
 */

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  /**
   * Очищає код кімнати у state.
   */
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  /**
   * Повертає головну сторінку з навігацією.
   *
   * @returns {React.ReactNode}
   */
  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <CookieConsent
        location="bottom"
        buttonText="Прийняти"
        declineButtonText="Відхилити"
        enableDeclineButton
        cookieName="musiccontroller_gdpr"
        style={{
          background: "linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)",
          color: "#222",
          fontSize: "18px",
          borderRadius: "16px",
          maxWidth: "560px",
          margin: "0 auto 32px auto",
          left: 0,
          right: 0,
          position: "fixed",
          boxShadow: "0 0 24px 0 rgba(60,60,120,0.18)",
          textAlign: "center",
          zIndex: 9999
        }}
        buttonStyle={{
          background: "#373B44",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "10px",
          fontSize: "16px",
          padding: "8px 24px",
          marginRight: "16px",
          border: "none"
        }}
        declineButtonStyle={{
          background: "#d32f2f",
          color: "#fff",
          borderRadius: "10px",
          fontSize: "16px",
          padding: "8px 24px",
          border: "none"
        }}
      >
        🍪 Ми використовуємо cookies для найкращого досвіду на сайті.
        <a href="/privacy-policy" style={{ color: "#fff", textDecoration: "underline", marginLeft: 10 }}>Детальніше</a>
      </CookieConsent>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}