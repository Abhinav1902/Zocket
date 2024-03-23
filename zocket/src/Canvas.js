import React, { useEffect, useRef } from 'react';

const Canvas = ({ template, onTextChange, onColorChange, onImageChange }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = template.background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw other elements (text, image, etc.) based on template data

    // Example: Drawing text
    ctx.fillStyle = template.caption.text_color;
    ctx.font = `${template.caption.font_size}px Arial`;
    ctx.fillText(template.caption.text, template.caption.position.x, template.caption.position.y);
  }, [template]);

  const handleTextChange = (type, e) => {
    onTextChange(type, e.target.value);
  };

  const handleColorChange = (type, e) => {
    onColorChange(type, e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={1080} height={1080} style={{ width: '400px', height: '400px' }}></canvas>
      <div>
        <label>Caption Text: </label>
        <input type="text" value={template.caption.text} onChange={(e) => handleTextChange('caption', e)} />
      </div>
      <div>
        <label>Caption Color: </label>
        <input type="color" value={template.caption.text_color} onChange={(e) => handleColorChange('caption', e)} />
      </div>
      <div>
        <label>Select Image: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {/* Other input fields for additional template elements */}
    </div>
  );
};

export default Canvas;
