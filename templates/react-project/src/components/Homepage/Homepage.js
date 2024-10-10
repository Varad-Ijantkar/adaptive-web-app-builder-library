import React from 'react';
import './Homepage.css'; 

const Homepage = () => {
    return (
        <section className="homepage">
            <div className="main_container">
                <div className="element element_01">
                    <h2>Welcome to magns</h2>
                    <p>magns is your go-to adaptive web app builder library. Quickly set up pre-compiled projects using popular frameworks such as Angular, React, and React Native.</p>
                    <p>To get started with different framework right away follow the steps below:</p>
                    <ol>
                        <li>Install the magns CLI tool globally: <code><b>npm install -g magns</b></code></li>
                        <li>Create a new project: <code><b>magns create</b></code></li>
                        <li>Follow the prompts to select your framework and name your project.</li>
                        <li>Navigate into your project directory and start coding!</li>
                    </ol>
                    <button onClick={() => window.location.href='https://github.com/mihir-gawade/adaptive-web-app-builder-library/tree/main'}>View Documentation</button>
                </div>
            </div>
        </section>
    );
};

export default Homepage;
