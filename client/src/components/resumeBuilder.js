import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PersonalDetails from './PersonalDetails';
import EducationSection from './EducationalSection';
import InternshipsSection from './InternshipsSection';
import ProjectsSection from './ProjectSection';
import SkillsAchievementsHobbiesSection from './SkillsAchievementsHobbiesSection';
import axios from 'axios';
import './ResumeBuilder.css';

const ResumeBuilder = () => {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8008/auth/verify')
        .then(res=> {
            if(res.data.status){

            } else {
                navigate('/');
            }
            console.log(res);
        });
    }, [])

    const [formData, setFormData] = useState({
      personalDetails: { name: '', email: '', phone: '' },
      education: [{ degree: '', institution: '', year: '' }],
      internships: [{ company: '', position: '', duration: '' }],
      projects: [{ title: '', description: '', techStack: '' }],
      skills: [''],
      achievements: [''],
      hobbies: [''],
    });
  
    const [currentStep, setCurrentStep] = useState(0); // Track the current section
    const [errors, setErrors] = useState({}); // Track errors for each section
  
    const sections = [
      { component: PersonalDetails, title: 'Personal Details' },
      { component: EducationSection, title: 'Education' },
      { component: InternshipsSection, title: 'Internships' },
      { component: ProjectsSection, title: 'Projects' },
      { component: SkillsAchievementsHobbiesSection, title: 'Skills, Achievements, Hobbies' }
    ];
  
    // Form handlers
    const handlePersonalDetailsChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, personalDetails: { ...formData.personalDetails, [name]: value } });
    };
  
    const handleDynamicFieldChange = (e, section, index, field) => {
      const newSectionData = [...formData[section]];
      newSectionData[index][field] = e.target.value;
      setFormData({ ...formData, [section]: newSectionData });
    };
  
    const handleArrayChange = (e, section, index) => {
      const newSectionData = [...formData[section]];
      newSectionData[index] = e.target.value;
      setFormData({ ...formData, [section]: newSectionData });
    };
  
    const addField = (section) => {
      const emptyField = section === 'education' ? { degree: '', institution: '', year: '' }
        : section === 'internships' ? { company: '', position: '', duration: '' }
        : section === 'projects' ? { title: '', description: '', techStack: '' }
        : '';
      setFormData({ ...formData, [section]: [...formData[section], emptyField] });
    };
  
    const removeField = (section, index) => {
      const newSectionData = formData[section].filter((_, idx) => idx !== index);
      setFormData({ ...formData, [section]: newSectionData });
    };
  
    const addArrayField = (section) => {
      setFormData({ ...formData, [section]: [...formData[section], ''] });
    };
  
    const removeArrayField = (section, index) => {
      const newSectionData = formData[section].filter((_, idx) => idx !== index);
      setFormData({ ...formData, [section]: newSectionData });
    };
  
    // Form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:8008/resume/generate-resume", { formData });
      } catch (err) {
        console.error('Error generating resume:', err);
      }
    };
  
    // Validation Logic
    const validateSection = () => {
      const currentSection = sections[currentStep].title;
      let sectionErrors = {};
  
      if (currentSection === 'Personal Details') {
        const { name, email, phone } = formData.personalDetails;
        if (!name.trim()) sectionErrors.name = 'Name is required';
        if (!email.trim()) sectionErrors.email = 'Email is required';
        if (!phone.trim()) sectionErrors.phone = 'Phone is required';
      } else if (currentSection === 'Education') {
        formData.education.forEach((edu, index) => {
          if (!edu.degree.trim()) sectionErrors[`degree-${index}`] = 'Degree is required';
          if (!edu.institution.trim()) sectionErrors[`institution-${index}`] = 'Institution is required';
          if (!edu.year.trim()) sectionErrors[`year-${index}`] = 'Year is required';
        });
      }
      // Add validation logic for other sections as needed...
  
      setErrors(sectionErrors);
      return Object.keys(sectionErrors).length === 0; // If no errors, validation passed
    };
  
    const nextStep = () => {
      if (validateSection()) {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, sections.length - 1));
      }
    };
  
    const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  
    const progressPercentage = ((currentStep + 1) / sections.length) * 100;
    const CurrentComponent = sections[currentStep].component;
  
    return (
      <div>
        <h2>Resume Builder</h2>
  
        {/* Top Tab Navigation */}
        <div className="tab-container">
          {sections.map((section, index) => (
            <div key={index} className={`tab ${index === currentStep ? 'active' : ''}`}>
              {section.title}
            </div>
          ))}
        </div>
  
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
  
        {/* Render the current section */}
        <form onSubmit={handleSubmit}>
          <CurrentComponent
            formData={formData}
            handlePersonalDetailsChange={handlePersonalDetailsChange}
            handleDynamicFieldChange={handleDynamicFieldChange}
            handleArrayChange={handleArrayChange}
            addField={addField}
            removeField={removeField}
            addArrayField={addArrayField}
            removeArrayField={removeArrayField}
            errors={errors} // Pass errors to display
          />
  
          {/* Navigation buttons */}
          <div style={{ marginTop: '20px' }}>
            {currentStep > 0 && <button type="button" onClick={prevStep}>Previous</button>}
            {currentStep < sections.length - 1 && <button type="button" onClick={nextStep}>Next</button>}
            {currentStep === sections.length - 1 && <button type="submit">Generate Resume</button>}
          </div>
        </form>
      </div>
    );
};

export default ResumeBuilder;