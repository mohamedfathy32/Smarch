import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // استيراد SweetAlert

const TicketModal = ({ isOpen, onClose }) => {
    const [subject, setSubject] = useState('');
    const [recipient, setRecipient] = useState('6789419ec3cbe2ba62e23637');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        console.log("Token:", token);
        
        try {
            console.log("Submitting ticket with subject:", subject, "and recipient:", recipient);
            
            const response = await axios.post('https://smarch-back-end-nine.vercel.app/ticket/create', {
                subject,
                recipient
            }, {
                headers: {
                    'Authorization': token 
                }
            });

            if (response.status === 201) { // تحقق من حالة الاستجابة
                // عرض تنبيه SweetAlert
                Swal.fire({
                    title: 'تم الإرسال بنجاح!',
                    text: 'تم إنشاء التذكرة بنجاح.',
                    icon: 'success',
                    confirmButtonText: 'موافق'
                });
                onClose(); 
            } else {
                console.error('Unexpected response status:', response.status);
                console.error('Response data:', response.data);
            }
        } catch (error) {
            console.error('Error creating ticket', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Create Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="border rounded-lg w-full px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Recipient ID</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="border rounded-lg w-full px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit Ticket
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketModal;