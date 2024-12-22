import React, { useEffect, useState } from "react";
import baseStatsData from "../data/baseStats.json";
import perksData from "../data/perks.json";
import StatDisplay from "./StatDisplay";

const ModifiedStatsCalculator = ({ selectedPerks }) => {
  const [modifiedStats, setModifiedStats] = useState({});

  useEffect(() => {
    const modifiers = {};

    // Loop through selected perks to calculate modifiers
    selectedPerks.forEach((perkName) => {
      const perk = perksData.perks.find((p) => p.perkName === perkName);
      if (perk && perk.modifiers) {
        Object.keys(perk.modifiers).forEach((statKey) => {
          if (!modifiers[statKey]) {
            modifiers[statKey] = [];
          }

          const { modifier, condition } = perk.modifiers[statKey];
          modifiers[statKey].push({
            modifier,
            condition,
            perkName,
          });
        });
      }
    });

    const updatedStats = {};
    baseStatsData.baseStats.forEach((stat) => {
      const statKey = Object.keys(stat)[1];
      const baseValue = stat[statKey];
      if (modifiers[statKey]) {
        updatedStats[stat.statName] = modifiers[statKey].map((mod) => ({
          value: baseValue * (1 + mod.modifier),
          condition: mod.condition,
          perkName: mod.perkName,
        }));
      }
    });

    setModifiedStats(updatedStats);
  }, [selectedPerks]);

  return <StatDisplay stats={baseStatsData.baseStats} modifiedStats={modifiedStats} />;
};

export default ModifiedStatsCalculator;
