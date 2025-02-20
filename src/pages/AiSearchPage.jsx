import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../globals/apiUrls';
import Card from '../components/Card';
import { motion } from 'framer-motion';

function AiSearchPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Ciao! Come posso aiutarti a trovare la casa perfetta per te?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [relevantProperties, setRelevantProperties] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    try {
      const response = await axios.post(baseUrl + '/api/ai-search/search', {
        query: inputMessage
      });

      if (response.data.success) {
        // Format the response to handle markdown-style bold text
        const formattedResponse = response.data.response.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>'
        );

        setMessages([...newMessages, { 
          role: 'ai', 
          content: formattedResponse 
        }]);
        
        const transformedProperties = response.data.relevantProperties.slice(0, 2).map(prop => ({
          id: prop.propertyId,
          title: prop.title,
          description: prop.description,
          city: prop.city,
          address: prop.address,
          square_meters: prop.squareMeters,
          n_bedrooms: prop.nBedrooms,
          n_bathrooms: prop.nBathrooms,
          n_beds: prop.nBeds,
          property_type: prop.propertyType,
          img_endpoints: [],
          first_name: '',
          last_name: ''
        }));
        setRelevantProperties(transformedProperties);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'ai', content: 'Mi dispiace, ho incontrato un errore. Riprova più tardi.' }]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 my-4 ${message.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${message.role === 'ai' ? 'bg-gray-100' : 'bg-blue-100'}`}>
                <p 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              </div>
            </div>
          ))}
          
          {relevantProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
              {relevantProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card property={property} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Scrivi un messaggio..."
              className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AiSearchPage; 