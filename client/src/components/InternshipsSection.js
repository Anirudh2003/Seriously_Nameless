import React from 'react';
import DynamicField from './DynamicField';

const InternshipsSection = ({ formData, handleDynamicFieldChange, addField, removeField }) => {
  return (
    <div>
      <h3>Internships</h3>
      {formData.internships.map((intern, index) => (
        <DynamicField
          key={index}
          index={index}
          section="internships"
          fields={{ company: intern.company, position: intern.position, duration: intern.duration }}
          handleDynamicFieldChange={handleDynamicFieldChange}
          removeField={removeField}
        />
      ))}
      <button type="button" onClick={() => addField('internships')}>Add Internship</button>
    </div>
  );
};

export default InternshipsSection;
