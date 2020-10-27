import React from "react";


export default class Article extends React.Component {
  render() {
    const title = this.props.article.title;
    const about = this.props.article.about;
    //const { pub_date } = this.props.article.pub_date;
    //const { owner } = this.props.article.owner;

    return (
      <div className="col-md-4 card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{about}</p>
          <a className="btn btn-default" href="#">More Info</a>
        </div>
      </div>
    );
  }
}
