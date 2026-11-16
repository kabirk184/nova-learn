import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Nova Learn Render Error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          color: '#ffffff',
          fontFamily: 'Outfit, sans-serif',
          background: '#08071a',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '700px',
            width: '100%'
          }}>
            <h1 style={{ fontSize: '1.6rem', color: '#f87171', marginBottom: '12px' }}>
              ⚠️ Page Render Error Detected
            </h1>
            <p style={{ color: '#cbd5e1', marginBottom: '16px', fontSize: '0.95rem' }}>
              {this.state.error?.message || 'An unexpected error occurred while rendering the page.'}
            </p>
            <pre style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '12px',
              borderRadius: '8px',
              overflowX: 'auto',
              textAlign: 'left',
              color: '#fca5a5',
              fontSize: '0.8rem',
              marginBottom: '20px'
            }}>
              {this.state.error?.stack}
            </pre>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#8b5cf6',
                  color: '#ffffff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  padding: '10px 20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Clear Cache & Reset
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
