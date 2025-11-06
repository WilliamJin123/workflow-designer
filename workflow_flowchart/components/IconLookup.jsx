import { useState } from 'react';
import './IconLookup.css';

export default function IconPickerModal({ isOpen, onClose, URL }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div 
          className="icon-picker-overlay"
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        >
            <button className="icon-picker-close" onClick={onClose}>
                Go Back
            </button>
            <div className="icon-picker-container">
                {!loaded && (
                    <div className="icon-picker-loader">
                        <div className="spinner"></div>
                        <p>Loading icons...</p>
                    </div>
                )}
                <iframe
                    src={URL}
                    title="Icon Picker"
                    className="icon-picker-iframe"
                    style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                    onLoad={() => setLoaded(true)}
                />
            </div>
        </div>
    );
}
