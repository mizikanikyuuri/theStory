import React from "react";

import Footer from "./Footer/Footer";
import MainContent from "./MainContent";
import Home from "./Home/Home";
import ArticleBox from "./Article/ArticleBox";
import Contact from "./Contact/Contact";
import { Nav } from 'react-bootstrap';
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
            <Nav justify variant="pills" defaultActiveKey="/poral" className="PortalNav">
              <Nav.Item>
                <Link to="/portal/" className="nav-link">ホーム</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/portal/article-box" className="nav-link">記事一覧</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/portal/contact" className="nav-link">コンタクト</Link>
              </Nav.Item>
            </Nav>
            <img
              width={200}
              height={200}
              className="LogoPicture"
              src="../static/portal/img/logo.jpg"
              alt="logo picture"
            />
            <MainContent>
              <Switch>
                <Route path="/portal/article-box">
                  <ArticleBox />
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
