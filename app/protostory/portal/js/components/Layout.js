import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';

import Footer from "./Footer/Footer";
import MainContent from "./MainContent";
import Home from "./Home/Home";
import About from "./About/About";
import ArticleBox from "./Article/ArticleBox";
import Contact from "./Contact/Contact";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header/PortalNav.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    return (
      <div>

        <Router>
          <div>
            <Navbar bg="dark" expand="lg" >
              {/* <Navbar.Brand >
                <img
                  height={"100%"}
                  className="LogoPicture"
                  src="../static/portal/img/the_story_logo_skelton.png"
                  alt="logo picture"
                />
              </Navbar.Brand> */}
              {/* <Navbar.Toggle />
              <Navbar.Collapse id="responsive-navbar-nav"> */}
                <Nav justify variant="pills" fill defaultActiveKey="/poral" className="PortalNav">
                  <Nav.Item>
                    <Link to="/portal/" className="nav-link">ホーム</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/portal/about" className="nav-link">概要</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/portal/article-box" className="nav-link">記事一覧</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/portal/contact" className="nav-link">コンタクト</Link>
                  </Nav.Item>
                </Nav>
              {/* </Navbar.Collapse> */}
            </Navbar>
            <MainContent>
              <Switch>
                <Route path="/portal/article-box">
                  <ArticleBox />
                </Route>
                <Route path="/portal/about">
                  <About />
                </Route>
                <Route path="/portal/contact">
                  <Contact />
                </Route>
                <Route exact path="/portal">
                  <Home />
                </Route>
              </Switch>
            </MainContent>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
