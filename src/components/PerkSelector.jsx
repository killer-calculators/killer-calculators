import React from "react";

const PerkSelector = ({ perks, selectedPerks, onPerkChange }) => {
  return (
    <section className="perk-selector-container build-box-container">
      <h2>select perks</h2>
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="perk-container">
          <select
            value={selectedPerks[index] || ""}
            onChange={(e) => onPerkChange(index, e.target.value)}>
            <option value="">PERK {index + 1}</option>
            {perks.map((perk) => (
              <option key={perk.perkName} value={perk.perkName}>
                {perk.perkName}
              </option>
            ))}
          </select>
          {selectedPerks[index] && (
            <p className="perk-description">
              {perks.find((perk) => perk.perkName === selectedPerks[index]).description}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default PerkSelector;
