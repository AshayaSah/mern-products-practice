import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import "../css/Navbar.css";

const Navbar = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        const response = await fetch("http://localhost:3001/get");
        const data = await response.json();
        setSmartphones(data);
      } catch (error) {
        console.error("Error fetching smartphones:", error);
      }
    };

    fetchSmartphones();
  }, []);

  const filteredSmartphones = smartphones.filter((smartphone) =>
    smartphone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search Products .."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>Search</button>
        </div>
        <div className="navbar-categories">
          <ul>
            <li>hero</li>
            <li>Sero</li>
            <li>apple</li>
          </ul>
        </div>
      </div>

      <div className="gallery">
        {filteredSmartphones.length >= 1 ? (
          filteredSmartphones.map((smartphone) => (
            <div className="card-content" key={smartphone.id}>
              {" "}
              {/* Add a unique key prop */}
              <h2>{smartphone.name}</h2>
              <p>Company: {smartphone.company}</p>
              <p>Price: ${smartphone.price}</p>
              <p>Colors: {smartphone.colors.join(", ")}</p>
              <p>Category: {smartphone.category}</p>
              <p>Featured: {smartphone.isFeatured ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <div className="Empty">No Products!</div>
        )}
      </div>
    </>
  );
};

export default Navbar;
