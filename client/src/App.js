import React, { useState, useEffect } from 'react';

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: 20,
  marginBottom: 16,
  cursor: 'pointer',
  border: '2px solid transparent',
  transition: 'border 0.2s',
  fontWeight: 500,
  fontSize: 18,
  textAlign: 'left',
};

const cardSelected = {
  border: '2px solid #0078d4',
  background: '#e6f2fb',
};

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loadingConvs, setLoadingConvs] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [errorConvs, setErrorConvs] = useState(null);
  const [errorForm, setErrorForm] = useState(null);

  // Use your Codespaces backend URL for API calls
  const BACKEND_URL = 'https://zany-trout-wp444qpw746f556w-3001.app.github.dev'; // <-- update if your URL is different

  useEffect(() => {
    setLoadingConvs(true);
    setErrorConvs(null);
    fetch(`${BACKEND_URL}/conversations`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setConversations)
      .catch(() => {
        setConversations([]);
        setErrorConvs('Could not load conversations.');
      })
      .finally(() => setLoadingConvs(false));
  }, []);

  useEffect(() => {
    if (selectedId) {
      setLoadingForm(true);
      setErrorForm(null);
      fetch(`${BACKEND_URL}/conversations/${selectedId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(setFormData)
        .catch(() => {
          setFormData(null);
          setErrorForm('Could not load form data.');
        })
        .finally(() => setLoadingForm(false));
    }
  }, [selectedId]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 40,
        padding: '4vw',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f4f6fa 60%, #e6f2fb 100%)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ minWidth: 280, maxWidth: 340, flex: '1 1 320px' }}>
        <h2 style={{ fontSize: 32, marginBottom: 24, letterSpacing: 1 }}>Conversation IDs</h2>
        <div>
          {loadingConvs && (
            <div style={{ color: '#888', fontStyle: 'italic', marginBottom: 16 }}>Loading conversations...</div>
          )}
          {errorConvs && (
            <div style={{ color: 'red', fontWeight: 500, marginBottom: 16 }}>{errorConvs}</div>
          )}
          {!loadingConvs && !errorConvs && conversations.length === 0 && (
            <div style={{ color: '#888', fontStyle: 'italic' }}>No conversations found.</div>
          )}
          {conversations.map(id => (
            <div
              key={id}
              style={{
                ...cardStyle,
                ...(selectedId === id ? cardSelected : {}),
                marginBottom: 16,
              }}
              onClick={() => setSelectedId(id)}
            >
              <span style={{ color: selectedId === id ? '#0078d4' : '#222' }}>#{id}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 320, maxWidth: 600 }}>
        <h2 style={{ fontSize: 32, marginBottom: 24, letterSpacing: 1 }}>Form Data</h2>
        {loadingForm && (
          <div style={{ color: '#888', fontStyle: 'italic', marginTop: 32 }}>Loading form data...</div>
        )}
        {errorForm && (
          <div style={{ color: 'red', fontWeight: 500, marginTop: 32 }}>{errorForm}</div>
        )}
        {!loadingForm && !errorForm && formData ? (
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 28,
            minWidth: 320,
            maxWidth: 540,
            fontSize: 18,
            color: '#222',
            marginTop: 8,
          }}>
            <div style={{ marginBottom: 8 }}>
              <strong>Form Type:</strong> {formData.formType}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Patient:</strong> {formData.patient}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Date:</strong> {formData.date}
            </div>
            {formData.formType === 'SDOH' && (
              <>
                <div style={{ marginBottom: 8 }}>
                  <strong>Housing Stable:</strong> {formData.housingStable ? 'Yes' : 'No'}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Food Secure:</strong> {formData.foodSecure ? 'Yes' : 'No'}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Transportation:</strong> {formData.transportation}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Employment Status:</strong> {formData.employmentStatus}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Comments:</strong> {formData.comments}
                </div>
              </>
            )}
            {formData.formType === 'Vitals' && (
              <>
                <div style={{ marginBottom: 8 }}>
                  <strong>Blood Pressure:</strong> {formData.bloodPressure}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Heart Rate:</strong> {formData.heartRate} bpm
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Temperature:</strong> {formData.temperature} °F
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Respiratory Rate:</strong> {formData.respiratoryRate} /min
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Weight:</strong> {formData.weight} lbs
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>Height:</strong> {formData.height} in
                </div>
              </>
            )}
          </div>
        ) : null}
        {!loadingForm && !errorForm && !formData && (
          <p style={{ color: '#444', fontSize: 22, marginTop: 32 }}>Select a conversation ID</p>
        )}
      </div>
    </div>
  );
}

export default App;
