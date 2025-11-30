import React from "react";
import "./App.css";
import Drawing from "./assets/drawing.png";

export default function App() {
  return (
    <div className="page-container">
      {/* LEFT SIDE */}
      <div className="left-column">
        <h1 className="title">OutSource</h1>

        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Messages</a>
          <a href="#">Jobs</a>
          <a href="#">Freelancers</a>
        </nav>

        <SectionTitle title="Latest Jobs" time="Updated 6 minutes ago" />

        <Card title="Simple React Website" user="hacker7" price="$42" />
        <Card title="Create a Business Logo" user="artfan97" price="$18" />

        <div style={{ marginTop: "40px" }}>
          <SectionTitle title="Latest Freelancers" time="Updated 12 minutes ago" />
        </div>

        <FreelancerCard
          user="hacker7"
          jobs="4 jobs"
          skills="Skills include pentesting, security, and authentication"
        />

        <FreelancerCard
          user="artfan97"
          jobs="2 jobs"
          skills="Skills include graphics, animations, and logos"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="image-container">
        <img src={Drawing} alt="Illustration" className="illustration" />
      </div>
    </div>
  );
}

/* ---- COMPONENTS ---- */

function SectionTitle({ title, time }) {
  return (
    <div className="section-title">
      <div className="section-header">
        <span>{title}</span>
        <a href="#">View All</a>
      </div>
      <p className="updated-time">{time}</p>
    </div>
  );
}

function Card({ title, user, price }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{title}</strong>
        <span>{price}</span>
      </div>
      <p className="card-user">{user}</p>
    </div>
  );
}

function FreelancerCard({ user, jobs, skills }) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{user}</strong>
        <span>{jobs}</span>
      </div>
      <p className="card-user">{skills}</p>
    </div>
  );
}
