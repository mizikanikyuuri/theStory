import React from "react";
import Article from "./Article";


export default class ArticleBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };

    }
    componentDidMount() {
        fetch("/portal/article",{
            method: 'GET', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(
            (result) => {       //fetch成功時
                this.setState({
                    isLoaded: true,
                    articles: result.results
                });
            },
            (error) => {        //fetch失敗時
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render() {
        const { error, isLoaded, articles } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {                    //読み込み完了時
            let domArticle=articles.map((article, i) => <Article key={i.toString()} article={article} />);
            return (
                <div className="container">
                    <h1>記事一覧</h1>
                    <div className="row">{domArticle}</div>
                </div>
            );
        }
    }
}
