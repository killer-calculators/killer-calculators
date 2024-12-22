import React, { useState } from "react";
import "../styles/base-styles.css";
import "../styles/build-styles.css";
import ModifiedStatsCalculator from "./components/ModifiedStatsCalculator";
import PerkSelector from "./components/PerkSelector";
import perksData from "./data/perks.json";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const [selectedPerks, setSelectedPerks] = useState([null, null, null, null]);

  const handlePerkChange = (index, perkName) => {
    const updatedPerks = [...selectedPerks];
    updatedPerks[index] = perkName;
    setSelectedPerks(updatedPerks);
  };

  return (
    <main>
      <Header />
      <PerkSelector
        perks={perksData.perks}
        selectedPerks={selectedPerks}
        onPerkChange={handlePerkChange}
      />
      <ModifiedStatsCalculator selectedPerks={selectedPerks} />
      <Footer />
    </main>
  );
};

export default App;
