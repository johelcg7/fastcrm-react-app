import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TemplateForm({ editingTemplate, setEditingTemplate, setTemplates }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name || '');
      setContent(editingTemplate.content || '');
    } else {
      setName('');
      setContent('');
    }
  }, [editingTemplate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingTemplate ? 'PUT' : 'POST';
    const url = editingTemplate && editingTemplate.id
      ? `${API_BASE_URL}/${editingTemplate.id}`
      : `${API_BASE_URL}`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((newTemplate) => {
        setTemplates((prev) => {
          if (editingTemplate) {
            return prev.map((template) =>
              template.id === newTemplate.id ? newTemplate : template
            );
          } else {
            return [...prev, newTemplate];
          }
        });
        setEditingTemplate(null);
        setName('');
        setContent('');
      })
      .catch((error) => console.error('Error saving template:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        {editingTemplate ? 'Update Template' : 'Create Template'}
      </button>
    </form>
  );
}

export default TemplateForm;