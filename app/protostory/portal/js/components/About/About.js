import React from "react";

import './About.css';
export default class About extends React.Component {
    render() {
        return (
            <div className={"row justify-content-evenly"}>
                <div className={"the-story-about-space col"}>
                    <h1>概要</h1>
                    <dl>
                        <dt><h2>the storyってなに？</h2>
                            <i className="icon-left the-story-about-icon fas fa-chess-rook"></i>
                        </dt>
                        <dd>the storyは1v1でランダム要素を排除したゲームです。
                            <br />どこかで見たことのあるRPG世界を模した世界観で1対1の対戦で遊ぶことができます。
                            <br />あなたの目的は対戦相手よりも先にドラゴンを倒すことです。
                            <br />だいたい10分もあれば試合が終わると思います。
                        </dd>
                        <dt><h2>どうやって遊ぶの？</h2>
                        </dt>
                        <dd>以下のスライドを確認してください。
                            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT6jvTj7Rrpf5FW_K-DiT-UXbIlkb9OvRqQmr7C8OSKobWQGIoMOyc5FiQ4TdbDma6okgUR7gGAQZu5/embed?start=false&loop=false&delayms=60000" frameborder="0" width="100%" height="auto" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                        </dd>
                        <dt><h2>どうして作ったの？</h2>
                            <i className="icon-left the-story-about-icon fas fa-drafting-compass"></i>
                        </dt>
                        <dd>ババ抜きやトランプであれば運が絡んでも問題はありません。
                            <br />むしろ偶然性は面白さを助けるでしょう。しかし、昨今盛り上がりを見せるeSportsのデジタルカードゲーム部門では問題があります。
                            <br />スポーツの名を冠しているのに決勝戦がカードの引きで決まってしまうのは面白くありません。そこで、既存のデジタルカードゲームの面白さを失わずに勝敗にかかわるランダム要素を排除できないか検討しました
                            <br />その結果できたものが、このthe storyになります。
                        </dd>
                        <dt><h2>対戦相手が見つからないんだけど</h2>
                            <i className="icon-right the-story-about-icon far fa-frown"></i>
                        </dt>
                        <dd>作者にgithub経由で連絡してください。</dd>
                    </dl>
                </div>
            </div >
        );
    }
}
