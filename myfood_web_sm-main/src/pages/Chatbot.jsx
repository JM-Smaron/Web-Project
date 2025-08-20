import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      text: input,
      isUser: true,
      type: 'user'
    }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      
      const { type, results } = await response.json();
      
      // Format bot response based on type
      const botMessages = [];
      
      if (type === "faq") {
        botMessages.push({
          text: results[0].text,
          isUser: false,
          type: 'faq',
          source: results[0].source,
          confidence: results[0].confidence
        });
      } 
      else if (type === "general") {
        botMessages.push({
          text: "Here's some information that might help:",
          isUser: false,
          type: 'header'
        });
        
        results.forEach(result => {
          botMessages.push({
            text: result.text,
            isUser: false,
            type: 'general',
            source: result.source,
            confidence: result.confidence
          });
        });
      }
      else {
        botMessages.push({
          text: results[0].text,
          isUser: false,
          type: 'fallback'
        });
      }
      
      setMessages(prev => [...prev, ...botMessages]);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error processing your request.",
        isUser: false,
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-xl font-bold">Company Assistant</h1>
        <p className="text-sm text-green-100">Ask me about our company, products, or services</p>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>Start by asking a question about our company</p>
              <p className="text-sm mt-2">Try: "What is your return policy?"</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[80%] rounded-lg px-4 py-2
              ${msg.isUser 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : msg.type === 'faq'
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : msg.type === 'general'
                    ? 'bg-blue-50 border-l-4 border-blue-300'
                    : msg.type === 'fallback'
                      ? 'bg-yellow-50 border-l-4 border-yellow-400'
                      : 'bg-white border border-gray-200 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              
              {(msg.type === 'faq' || msg.type === 'general') && (
                <div className="mt-1 text-xs text-gray-500">
                  {msg.source && <span className="font-medium">{msg.source}</span>}
                  {msg.confidence && (
                    <span className="ml-2">
                      Confidence: {Math.round(msg.confidence * 100)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg rounded-bl-none px-4 py-2 border border-gray-200 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`px-4 py-2 rounded-lg font-medium ${
              !input.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}