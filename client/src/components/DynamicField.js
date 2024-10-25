import React from 'react';

const DynamicField = ({ section, fields, index, handleDynamicFieldChange, removeField }) => {
  return (
    <div>
      {Object.keys(fields).map((field, i) => (
        <div key={i}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input
            type="text"
            value={fields[field]}
            onChange={(e) => handleDynamicFieldChange(e, section, index, field)}
          />
        </div>
      ))}
      {index > 0 && (
        <button type="button" onClick={() => removeField(section, index)}>Remove</button>
      )}
    </div>
  );
};

export default DynamicField;
