import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <p>
          image source:{" "}
          <a
            href="https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
            target="_blank">
            deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki
          </a>
        </p>
        <p
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:dct="http://purl.org/dc/terms/">
          <span className="bold" property="dct:title">
            DBD Killer Calculators
          </span>{" "}
          by <span property="cc:attributionName">Campbell Kramer</span> is licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer">
            {" "}
            CC BY 4.0
          </a>
        </p>
        <p>
          follow me on instagram
          <a href="https://www.instagram.com/gorgeous_iphone/" target="_blank">
            {" "}
            @gorgeous_iphone{" "}
          </a>{" "}
          or twitter{" "}
          <a href="https://x.com/gorgeous_iphone" target="_blank">
            {" "}
            @gorgeous_iphone{" "}
          </a>{" "}
          if you want
        </p>
      </div>
    </footer>
  );
}

export default Footer;
