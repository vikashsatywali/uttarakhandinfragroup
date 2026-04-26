document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const inputField = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    // ==========================================
    // ⚠️ IMPORTANT: ADD YOUR GEMINI API KEY HERE
    // ==========================================
    const GEMINI_API_KEY = "AIzaSyBNK07xQjzc0iBUyGlTq5zVyM29ihrNUiA";

    // System prompt with context about Uttarakhand Infra Groups
    const SYSTEM_PROMPT = `
You are the official AI Assistant for Uttarakhand Infra Groups, a premier infrastructure and logistics company based in Uttarakhand, India. 
Your goal is to answer user questions accurately and professionally based ONLY on the following company information.
You must answer in the SAME LANGUAGE as the user's question. 

COMPANY INFO:
- Name: Uttarakhand Infra Groups
- Founder & Managing Director: Rakesh Rawat
- Chief Structural Engineer: Dr. Neha Sharma
- Head of Logistics Operations: Vikram Singh
- Established: 2011
- Focus: Premier construction, advanced logistics, and seamless relocation services across Himalayan terrains and Pan-India.

EXPERTISE:
1. Commercial & Residential Construction: Turnkey projects, structural retrofitting, earthquake-resistant engineering.
2. Industrial Transport & Logistics: Heavy machinery transit, supply chain management, multi-axle trucks and trailers.
3. Premium Movers & Packers: Corporate relocation, secure warehousing, white-glove moving.

CONTACT INFO:
- Email: info@devbhoomigatividhi.in 
- Phone: +91 98765 43210
- Offices: Kashipur, Rudrapur, Haldwani (Uttarakhand)

Answer concisely, politely, and strictly based on the above details. Protect the company's reputation. Use markdown (bolding, lists) to format your answers professionally.
    `;

    // Maintain Chat History
    let chatHistory = [];

    // Suggestions to show initially
    const suggestions = [
        "What services do you offer?",
        "Where are your offices located?",
        "Tell me about your logistics.",
        "How can I contact you?"
    ];

    // Toggle Chatbot
    const toggleChat = () => {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            inputField.focus();
            if (chatHistory.length === 0 && !document.querySelector('.chatbot-suggestions')) {
                showSuggestions();
            }
        }
    };

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    const formatMarkdown = (text) => {
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/\n\n/g, '<br><br>');
        html = html.replace(/\n/g, '<br>');
        html = html.replace(/- (.*?)<br>/g, '<li>$1</li>');
        html = html.replace(/<li>/g, '<ul style="padding-left:20px;margin:5px 0;"><li>').replace(/<\/li>(?!<li>)/g, '</li></ul>');
        return html;
    };

    // Append Message to UI
    const appendMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = sender === 'bot' ? formatMarkdown(text) : text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const showSuggestions = () => {
        const sugDiv = document.createElement('div');
        sugDiv.className = 'chatbot-suggestions';
        suggestions.forEach(sug => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-sug-btn';
            btn.innerText = sug;
            btn.onclick = () => {
                inputField.value = sug;
                sugDiv.remove();
                handleSend();
            };
            sugDiv.appendChild(btn);
        });
        messagesContainer.appendChild(sugDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Show Loading Animation
    const showLoading = () => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message bot-loading';
        msgDiv.id = 'bot-loading-indicator';
        msgDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Remove suggestions if they exist
        const sugDiv = document.querySelector('.chatbot-suggestions');
        if (sugDiv) sugDiv.remove();
    };

    // Remove Loading Animation
    const hideLoading = () => {
        const indicator = document.getElementById('bot-loading-indicator');
        if (indicator) indicator.remove();
    };

    // Clear Chat UI logic
    const addClearButton = () => {
        const header = document.querySelector('.chatbot-header');
        if(header && !document.getElementById('chatbot-clear-btn')) {
            const clearBtn = document.createElement('button');
            clearBtn.id = 'chatbot-clear-btn';
            clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            clearBtn.title = "Clear Chat History";
            clearBtn.onclick = () => {
                // Keep the first default message and remove others
                const children = Array.from(messagesContainer.children);
                if (children.length > 0) {
                    const firstMessage = children[0];
                    messagesContainer.innerHTML = '';
                    messagesContainer.appendChild(firstMessage);
                }
                chatHistory = [];
                showSuggestions();
            };
            header.insertBefore(clearBtn, closeBtn);
        }
    };
    addClearButton();

    // Handle Send
    const handleSend = async () => {
        const text = inputField.value.trim();
        if (!text) return;

        // User message
        appendMessage(text, 'user');
        inputField.value = '';
        sendBtn.disabled = true;

        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
            setTimeout(() => {
                appendMessage("⚠️ <b>Action Required:</b> Please replace <code>YOUR_GEMINI_API_KEY_HERE</code>.", 'bot');
                sendBtn.disabled = false;
                inputField.focus();
            }, 1000);
            return;
        }

        showLoading();

        // Prepare History for Gemini
        if (chatHistory.length === 0) {
            chatHistory.push({
                role: "user",
                parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + text }]
            });
        } else {
            chatHistory.push({
                role: "user",
                parts: [{ text: text }]
            });
        }

        try {
            // Call Gemini API (gemini-2.5-flash)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: chatHistory,
                    generationConfig: {
                        temperature: 0.2, // low temperature for more focused, factual replies
                    }
                })
            });

            const data = await response.json();
            hideLoading();

            if (data.candidates && data.candidates.length > 0) {
                let botReply = data.candidates[0].content.parts[0].text;
                
                chatHistory.push({
                    role: "model",
                    parts: [{ text: botReply }]
                });

                appendMessage(botReply, 'bot');
            } else {
                appendMessage("I couldn't process that. Please try again.", 'bot');
                chatHistory.pop(); // Remove user query if failed
            }
        } catch (error) {
            console.error(error);
            hideLoading();
            appendMessage("Error communicating with AI. Please check your connection or API key.", 'bot');
            chatHistory.pop();
        } finally {
            sendBtn.disabled = false;
            inputField.focus();
        }
    };

    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
