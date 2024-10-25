import React from 'react';
import DynamicField from './DynamicField';

const ProjectsSection = ({ formData, handleDynamicFieldChange, addField, removeField }) => {
  return (
    <div>
      <h3>Projects</h3>
      {formData.projects.map((project, index) => (
        <DynamicField
          key={index}
          index={index}
          section="projects"
          fields={{ title: project.title, description: project.description, techStack: project.techStack }}
          handleDynamicFieldChange={handleDynamicFieldChange}
          removeField={removeField}
        />
      ))}
      <button type="button" onClick={() => addField('projects')}>Add Project</button>
    </div>
  );
};

export default ProjectsSection;
