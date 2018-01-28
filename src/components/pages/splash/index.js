import React, { Component } from 'react';
import './splash.css';
// Components
import Hero from './components/hero';
class Splash extends Component {
    render = () => {
        return (
            <div className="Splash page">
                <Hero />
                <section>
                    <p className="content">Splash</p>
                    <p className="content">Splash</p>
                    <p className="content">Splash</p>
                </section>
                <section>
                    <p className="filler">Filler</p>
                </section>
            </div>
        );
    };
}

export default Splash;
