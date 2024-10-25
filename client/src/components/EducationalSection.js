import React from 'react';
import DynamicField from './DynamicField';

const EducationSection = ({ formData, handleDynamicFieldChange, addField, removeField }) => {
  return (
    <div>
      <h3>Education</h3>
      {formData.education.map((edu, index) => (
        <DynamicField
          key={index}
          index={index}
          section="education"
          fields={{ degree: edu.degree, institution: edu.institution, year: edu.year }}
          handleDynamicFieldChange={handleDynamicFieldChange}
          removeField={removeField}
        />
      ))}
      <button type="button" onClick={() => addField('education')}>Add Education</button>
    </div>
  );
};

export default EducationSection;
