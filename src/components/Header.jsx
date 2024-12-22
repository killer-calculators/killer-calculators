import React from "react";

function Header() {
  return (
    <>
      <header className="header-container">
        <h1>killer build calculator</h1>
      </header>
      <nav className="page-nav">
        <a href="../index.html">home</a>
        <a href="./nightfall-calculator.html">dredge's nightfall calculator</a>
        <a href="./haunting-calculator.html">spirit's haunting calculator</a>
        <a href="./onryo-calculator.html">onryo's invisibility calculator</a>
        <a href="./build-calculator.html">killer build calculator</a>
      </nav>
    </>
  );
}

export default Header;
