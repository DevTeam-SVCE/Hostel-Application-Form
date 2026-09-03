import { useState } from 'react';
import HostelApplicationForm from './components/HostelApplicationForm';
import HostelForm from './HostelForm';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
  };

  const handleBackToForm = () => {
    setSubmittedData(null);
  };

  return submittedData ? (
    <HostelForm data={submittedData} onBack={handleBackToForm} />
  ) : (
    <HostelApplicationForm onSubmit={handleFormSubmit} />
  );
}

export default App;
