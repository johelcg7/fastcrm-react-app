import { useState, useEffect } from 'react';
import TemplateForm from '../components/TemplateForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Fetch templates from API
  useEffect(() => {
    fetch(API_BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        return response.json();
      })
      .then((data) => setTemplates(data))
      .catch((error) => console.error('Error fetching templates:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTemplates((prev) => prev.filter((template) => template.id !== id)))
      .catch((error) => console.error('Error deleting template:', error));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Templates</h1>
      <TemplateForm
        editingTemplate={editingTemplate}
        setEditingTemplate={setEditingTemplate}
        setTemplates={setTemplates}
      />
      <ul className="mt-6 space-y-4">
        {templates.map((template) => (
          <li key={template.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{template.name}</h2>
            <p>{template.content}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setEditingTemplate(template)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(template.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Templates;