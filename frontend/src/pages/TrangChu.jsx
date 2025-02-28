import React from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import DoctorCard from "../components/DoctorCard";
import DepartmentCard from "../components/DepartmentCard";
import "../App.css";
import ServiceCards from "../components/ServicesCard";
import ArticleCard from "../components/ArticleCard";
import HospitalIntro from "../components/HospitalIntro";


function TrangChu() {
  return (
    <div className="app-container">
      <Header />
        <HospitalIntro />
      <section className="container">
        <ServiceCards />
      </section>
      <section className="container">
        <div className="grid">
          <DepartmentCard />
        </div>
      </section>
      <section className="container">
        <div className="grid">
          <DoctorCard />
        </div>
      </section>
      <section className="container">
        <div className="grid">
          <ArticleCard />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TrangChu;