import React from "react";

const StatDisplay = ({ stats, modifiedStats }) => {
  return (
    <section className="build-box-container stat-list-container">
      <h2>the numbers</h2>
      {stats.map((stat) => {
        const modifiers = modifiedStats[stat.statName] || [];
        return (
          <div key={stat.statName} className="stat-item">
            base {stat.statName}:{" "}
            <strong className="spaced">
              {stat[Object.keys(stat)[1]]} {stat.unit}
            </strong>
            {modifiers.length > 0 && (
              <ul className="stat-modifier">
                {modifiers.map((mod, index) => (
                  <li key={index}>
                    via {mod.perkName}:{" "}
                    <strong className="spaced">
                      {mod.value.toFixed(2)} {stat.unit}
                    </strong>
                    <br />
                    {mod.condition && (
                      <span className="condition">({mod.condition})</span>
                    )}{" "}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default StatDisplay;
