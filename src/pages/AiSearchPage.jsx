import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../globals/apiUrls';
import Card from '../components/Card';
import { motion } from 'framer-motion';

function AiSearchPage() {
  const [messages, setMessages] = useState(() => {
    // Try to get stored messages from localStorage on initial load
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [{
      role: 'ai',
      content: 'Ciao! Come posso aiutarti a trovare la casa perfetta per te?'
    }];
  });
  
  const [relevantProperties, setRelevantProperties] = useState(() => {
    // Try to get stored properties from localStorage
    const storedProperties = localStorage.getItem('relevantProperties');
    return storedProperties ? JSON.parse(storedProperties) : [];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const fullResponseRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isTyping && displayedResponse.length < fullResponseRef.current.length) {
      const timer = setTimeout(() => {
        setDisplayedResponse(fullResponseRef.current.slice(0, displayedResponse.length + 1));
      }, 5);
      return () => clearTimeout(timer);
    }
    if (displayedResponse.length === fullResponseRef.current.length) {
      setIsTyping(false);
    }
  }, [isTyping, displayedResponse]);

  // Add this useEffect to save messages whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Add this useEffect to save properties whenever they change
  useEffect(() => {
    localStorage.setItem('relevantProperties', JSON.stringify(relevantProperties));
  }, [relevantProperties]);

  // Optional: Add a function to clear the chat history
  const clearChat = () => {
    setMessages([{
      role: 'ai',
      content: 'Ciao! Come posso aiutarti a trovare la casa perfetta per te?'
    }]);
    setRelevantProperties([]);
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('relevantProperties');
  };

  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/properties/${propertyId}`);
      if (response.data && response.data.success && response.data.results.length > 0) {
        return response.data.results[0]; // Get the first result
      }
      return null;
    } catch (error) {
      console.error('Error fetching property details:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(baseUrl + '/api/ai/property-advice', {
        query: inputMessage
      });

      setIsLoading(false);

      if (response.data.success) {
        // Format the response to handle markdown-style bold text and headers
        const formattedResponse = response.data.advice
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/###\s*(.*?)(?:\n|$)/g, '<strong class="text-xl mb-2 block">$1</strong>');

        fullResponseRef.current = formattedResponse;
        setDisplayedResponse('');
        setIsTyping(true);

        setMessages([...newMessages, { 
          role: 'ai', 
          content: formattedResponse 
        }]);
        
        const transformedProperties = await Promise.all(
          response.data.relevantProperties
            .slice(0, 2)
            .map(async (prop) => {
              const propertyDetails = await fetchPropertyDetails(prop.propertyId);
              console.log('Property details:', propertyDetails);
              
              if (propertyDetails) {
                return {
                  id: propertyDetails.id,
                  title: propertyDetails.title,
                  description: propertyDetails.description,
                  city: propertyDetails.city,
                  address: propertyDetails.address,
                  square_meters: propertyDetails.square_meters,
                  n_bedrooms: propertyDetails.n_bedrooms,
                  n_bathrooms: propertyDetails.n_bathrooms,
                  n_beds: propertyDetails.n_beds,
                  property_type: propertyDetails.property_type,
                  img_endpoints: propertyDetails.img_endpoints,
                  first_name: propertyDetails.first_name,
                  last_name: propertyDetails.last_name
                };
              }
              return null;
            })
        );
        
        const validProperties = transformedProperties.filter(prop => prop !== null);
        console.log('Final transformed properties:', validProperties);
        setRelevantProperties(validProperties);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'ai', content: 'Mi dispiace, ho incontrato un errore. Riprova più tardi.' }]);
    }
  };

  const LoadingDots = () => (
    <div className="flex gap-1 items-center p-4 bg-gray-100 rounded-lg">
      <motion.span
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0 }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col pt-[64px]">
      <div className="flex-1 relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col px-4">
          <div className="flex-1 overflow-y-auto pb-[200px] md:pb-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center py-4">
                <div>
                  <h2 className="font-semibold text-lg">Assistente Virtuale</h2>
                  <p className="text-sm text-gray-500">Powered by AI</p>
                </div>
                <button
                  onClick={clearChat}
                  className="px-4 py-2 rounded-lg 
                    backdrop-blur-sm bg-white/30 
                    border border-gray-200 
                    shadow-sm 
                    transition-all duration-300
                    hover:bg-red-500 hover:text-white 
                    hover:border-red-500
                    text-gray-700"
                >
                  Cancella chat
                </button>
              </div>

              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 my-4 ${message.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${message.role === 'ai' ? 'bg-gray-100' : 'bg-blue-100'}`}>
                    {message.role === 'ai' && index === messages.length - 1 && isTyping ? (
                      <p 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: displayedResponse }}
                      />
                    ) : (
                      <p 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start my-4">
                  <LoadingDots />
                </div>
              )}

              {relevantProperties.length > 0 && !isTyping && (
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
          </div>

          <div className="py-4 fixed bottom-[68px] md:bottom-0 left-0 right-0 bg-[#dbdbdb31] rounded-t-4xl w-full md:relative z-50">
            <div className="max-w-6xl mx-auto w-full px-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Scrivi un messaggio..."
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Invia
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiSearchPage; 