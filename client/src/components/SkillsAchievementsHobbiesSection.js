import React from 'react';

const SkillsAchievementsHobbiesSection = ({ formData, handleArrayChange, addArrayField, removeArrayField }) => {
  const sections = ['skills', 'achievements', 'hobbies'];

  return sections.map((section) => (
    <div key={section}>
      <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
      {formData[section].map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(e, section, index)}
          />
          {index > 0 && (
            <button type="button" onClick={() => removeArrayField(section, index)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayField(section)}>Add {section.charAt(0).toUpperCase() + section.slice(1)}</button>
    </div>
  ));
};

export default SkillsAchievementsHobbiesSection;
