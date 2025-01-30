import React from "react";
import ParticlesBackground from "./ParticlesBackground"; 
import "../App.css";

function Login() {
  return (
    <div className="auth-page">
      {/* Left Sidebar */}
      <div className="auth-sidebar">
        <h1 className="sidebar-title">Chain<span>task</span></h1>
        <div className="rotating-cube">
        <div className="cube">
            <div className="face face1"></div>
            <div className="face face2"></div>
            <div className="face face3"></div>
            <div className="face face4"></div>
            <div className="face face5"></div>
            <div className="face face6"></div>
        </div>
        </div>
      </div>

      {/* Main (right) side with TSParticles and the form container */}
      <div className="auth-main">
        <ParticlesBackground />
        <div className="auth-container">
          <h2 className="auth-heading">Login</h2>
          <form>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="auth-input"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
