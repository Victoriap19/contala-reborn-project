
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, FileImage, Paperclip, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Message {
  id: string;
  sender: 'user' | 'creator';
  content: string;
  timestamp: Date;
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  };
}

interface ProjectChatProps {
  projectId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  onClose: () => void;
}

export function ProjectChat({ 
  projectId, 
  creatorId, 
  creatorName, 
  creatorAvatar,
  onClose 
}: ProjectChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "creator",
      content: "¡Hola! Ya estoy trabajando en tu proyecto. Te mantendré informado sobre el progreso.",
      timestamp: new Date(new Date().getTime() - 3600000)
    },
    {
      id: "2",
      sender: "user",
      content: "Genial, gracias por la actualización.",
      timestamp: new Date(new Date().getTime() - 3540000)
    },
    {
      id: "3",
      sender: "creator",
      content: "Aquí tienes la primera prueba del material. Dime qué te parece.",
      timestamp: new Date(new Date().getTime() - 1800000),
      attachment: {
        type: "image",
        url: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        name: "prueba_material.jpg"
      }
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() && !attachment) return;
    
    const now = new Date();
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: now
    };
    
    if (attachment) {
      newMsg.attachment = {
        type: attachment.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(attachment),
        name: attachment.name
      };
    }
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachment(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };
  
  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md border">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={creatorAvatar} />
            <AvatarFallback>{creatorName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{creatorName}</h3>
            <p className="text-xs text-gray-500">Proyecto #{projectId}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-contala-green text-white'
                    : 'bg-gray-100 text-gray-800'
                } space-y-2`}
              >
                {message.sender === 'creator' && (
                  <div className="flex items-center gap-1 mb-1">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={creatorAvatar} />
                      <AvatarFallback>{creatorName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{creatorName}</span>
                  </div>
                )}
                {message.content && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}
                {message.attachment && message.attachment.type === 'image' && (
                  <div className="mt-2">
                    <img
                      src={message.attachment.url}
                      alt={message.attachment.name}
                      className="max-h-48 rounded-md object-cover"
                    />
                    <div className="text-xs mt-1 opacity-70">{message.attachment.name}</div>
                  </div>
                )}
                {message.attachment && message.attachment.type === 'file' && (
                  <div className="flex items-center gap-2 bg-white/10 p-2 rounded mt-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-xs truncate">{message.attachment.name}</span>
                  </div>
                )}
                <div
                  className={`text-xs ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  } text-right`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Attachment Preview */}
      {attachment && (
        <div className="px-3 py-2 border-t">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div className="flex items-center gap-2">
              {attachment.type.startsWith('image/') ? (
                <FileImage className="h-4 w-4 text-gray-500" />
              ) : (
                <Paperclip className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={removeAttachment} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-3 border-t">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none"
          />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleAttachFile}
              className="h-8 w-8"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              className="h-8 w-8 bg-contala-green hover:bg-contala-green/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
