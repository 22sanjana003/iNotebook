import React from 'react';

const About = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">About iNotebook</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">What is iNotebook?</h5>
              <p className="card-text">
                iNotebook is a web-based application designed to help you manage your notes effortlessly. It provides a clean and intuitive interface to create, update, and organize your notes efficiently.
              </p>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Features</h5>
              <ul className="list-unstyled">
                <li className="mb-2">Add, update, and delete notes.</li>
                <li className="mb-2">Organize notes with tags.</li>
                <li className="mb-2">Secure login and authentication.</li>
                <li className="mb-2">Responsive design for accessibility on any device.</li>
              </ul>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">
                Our mission is to provide a simple yet powerful tool for managing your thoughts and ideas. We aim to continuously improve and add features to make note-taking a seamless experience for our users.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-4 mb-4">
        <p>© 2024 iNotebook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
