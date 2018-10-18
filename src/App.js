import React, { Component } from "react";
// eslint-disable-next-line
import logo from './logo.svg';

//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
//import "./App.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const LocationData = [
  {
    name: "Kolkata", //"Palo Alto",
    zip: "700020" //"94303"
  },
  {
    name: "Mumbai", //"San Jose",
    zip: "400020"//"94088"
  },
  {
    name: "Delhi", //"Santa Cruz",
    zip:  "110092" //"95062" 
  },
  {
    name: "Chennai",
    zip: "600002"//"96803"
  }
];

class WeatherDisplay extends Component {
  constructor() {
    console.log('I am in wd.constructor()');
    super();
    this.state = {
      weatherData: null
    }
  }

  componentDidMount() {
    console.log('I am in wd.componentDidMount()');
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => this.setState({weatherData: json}));
  }

  render() {
    console.log('I am in wd.render() this.props.zip = ' + this.props.zip);
    var weatherData = this.state.weatherData;
    if(!weatherData || !weatherData.weather) return (<h1>Loading</h1>);
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    )

  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      activeLocation: ""
    };
  }

  render() {
    console.log('I am in app.render()');
    const activeLocation = this.state.activeLocation;

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activeLocation}
                onSelect={zip => {
                  this.setState({ activeLocation: zip });
                }}
              >
                {
                  LocationData.map((loc, index) => (
                    <NavItem key={index} eventKey={loc.zip}>
                      {loc.name}
                    </NavItem>
                  ))
                }
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activeLocation} zip={activeLocation} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
