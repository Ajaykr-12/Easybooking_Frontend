import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import "./home.css";
import Property from "../../components/property/Property";
import SubProperty from "../../components/subProperty/SubProperty";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Features />
        <h1 className="homeTitle">Browse by property Type</h1>
        <Property />
        <h1 className="homeTitle">Homes guests love</h1>
        <SubProperty />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
