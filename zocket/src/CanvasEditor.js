import React, { useState } from 'react';
import Canvas from './Canvas';
import TemplateData from './TemplateData';

const CanvasEditor = () => {
  const [template, setTemplate] = useState(TemplateData);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTemplate(prevTemplate => ({
          ...prevTemplate,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTextChange = (type, newText) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      [type]: {
        ...prevTemplate[type],
        text: newText
      }
    }));
  };

  const handleColorChange = (type, newColor) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      [type]: {
        ...prevTemplate[type],
        background_color: newColor
      }
    }));
  };

  return (
    <div>
      <Canvas template={template} onTextChange={handleTextChange} onColorChange={handleColorChange} />
    </div>
  );
};

export default CanvasEditor;
