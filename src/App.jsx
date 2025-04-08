import './index.css';
import Templates from './pages/Templates';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Template Manager</h1>
      </header>
      <main className="p-4">
        <Templates />
      </main>
    </div>
  );
}

export default App;
