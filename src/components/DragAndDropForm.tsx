import React, { useState } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from '../types/ItemTypes';

// Interface for the draggable item
interface DraggableItem {
  id: string;
}

// Interface for the form field
interface FormField {
  id: string;
  type: 'text' | 'select' | 'checkbox';
}

const DragAndDropForm: React.FC = () => {
    console.log("Component is rendering");
  const [fields, setFields] = useState<FormField[]>([
    { id: 'field1', type: 'text' },
    { id: 'field2', type: 'select' },
    { id: 'field3', type: 'checkbox' },
  ]);

  // Define the draggable hook with proper typing for the 'item'
  const [{ isDragging }, drag] = useDrag<DraggableItem, unknown, { isDragging: boolean }>(() => ({
    type: ItemTypes.FIELD, // Make sure ItemTypes.FIELD is properly defined
    item: { id: 'field1' }, // This must align with the draggable item's type
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleAddField = () => {
    setFields([...fields, { id: `field${fields.length + 1}`, type: 'text' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted:', fields);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Drag and Drop Form</h1>
      <div className="mb-4">
        <button 
          onClick={handleAddField} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Field
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id} ref={drag} 
          className={`mb-4 flex items-center ${isDragging ? 'opacity-50' : ''}`}>
            <input
              ref={drag} // Only apply the drag ref here
              type={field.type === 'text' ? 'text' : field.type}
              placeholder={`Enter ${field.type}`}
              className="w-full border border-gray-300 p-2 rounded-l"
            />
            {field.type === 'select' && (
              <select className="w-64 border border-gray-300 p-2 rounded-r ml-2">
                <option>Select Option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            )}
            {field.type === 'checkbox' && (
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                <span className="ml-2">Checkbox Label</span>
              </label>
            )}
          </div>
        ))}
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DragAndDropForm;
