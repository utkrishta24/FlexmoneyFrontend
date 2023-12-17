import React, { useState } from 'react';

const CompletePayment = (name, age, selectedBatch) => {
    return {
        success: true,
        message: 'Payment successful!',
    };
};

const AdmissionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        selectedBatch: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const resetForm = () => {
        console.log('Resetting the form');
        setFormData({
            name: '',
            age: '',
            selectedBatch: '',
        });
    };

    const handleSubmit = async () => {
        try {
            const age = parseInt(formData.age, 10);
            if (isNaN(age) || age < 18 || age > 65) {
                setErrorMessage('Invalid age. Please enter an age between 18 and 65.');
                setSuccessMessage('');
                return;
            }

            const response = await fetch('http://localhost:3001/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                /* global CompletePayment */
                // ... rest of the code

                const paymentResult = CompletePayment(result.name, result.age, result.selectedBatch);

                if (paymentResult.success) {
                    setSuccessMessage('Payment successful: ' + paymentResult.message);
                    setErrorMessage('');
                    resetForm(); // Reset the form after successful submission
                } else {
                    setErrorMessage('Payment failed: ' + paymentResult.error);
                    setSuccessMessage('');
                }
            } else {
                console.error('Failed to submit admission form');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div>
            <h2>Admission Form</h2>
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <br />
                <label>Age:</label>
                <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                <br />
                <label>Select Batch:</label>
                <select
                    value={formData.selectedBatch}
                    onChange={(e) => setFormData({ ...formData, selectedBatch: e.target.value })}
                >
                    <option value="">Select Batch</option>
                    <option value="6-7AM">6-7AM</option>
                    <option value="7-8AM">7-8AM</option>
                    <option value="8-9AM">8-9AM</option>
                    <option value="5-6PM">5-6PM</option>
                </select>
                <br />
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>

                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </form>
        </div>
    );
};

export default AdmissionForm;