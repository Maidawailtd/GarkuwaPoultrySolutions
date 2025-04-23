import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/lib/store';

export default function Messages() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  // Placeholder data for demonstration
  const conversations = [
    {
      id: 1,
      name: 'Jane Cooper',
      avatar: undefined,
      lastMessage: 'Thanks for your proposal. I have a few questions about your approach.',
      timestamp: 'Just now',
      unread: true,
      projectName: 'Website Redesign',
    },
    {
      id: 2,
      name: 'Robert Fox',
      avatar: undefined,
      lastMessage: 'The project is coming along nicely! Looking forward to seeing the final result.',
      timestamp: '2h ago',
      unread: false,
      projectName: 'Mobile App Development',
    },
    {
      id: 3,
      name: 'Leslie Alexander',
      avatar: undefined,
      lastMessage: 'When can we schedule a call to discuss the next phase?',
      timestamp: 'Yesterday',
      unread: false,
      projectName: 'E-commerce Platform',
    },
  ];

  // Placeholder messages for selected conversation
  const currentChatMessages = [
    {
      id: 1,
      sender: 'other',
      text: 'Hi there! I saw your profile and I think you would be a great fit for my project.',
      timestamp: '11:30 AM',
    },
    {
      id: 2,
      sender: 'self',
      text: "Thank you! I'd be happy to discuss it further. What kind of project are you working on?",
      timestamp: '11:32 AM',
    },
    {
      id: 3,
      sender: 'other',
      text: "I'm looking to redesign my company website. It's a small business in the health and wellness space. We need a modern, responsive design that reflects our brand values.",
      timestamp: '11:35 AM',
    },
    {
      id: 4,
      sender: 'self',
      text: 'That sounds interesting! I have experience working with health and wellness brands. Do you have any specific features or functionalities in mind?',
      timestamp: '11:38 AM',
    },
    {
      id: 5,
      sender: 'other',
      text: 'We definitely need an appointment booking system, a blog, and an online store for our products. Would you be able to handle all of that?',
      timestamp: '11:40 AM',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // In a real app, we would send the message to the API
      console.log(`Sending message to conversation ${selectedChat}: ${message}`);
      setMessage('');
    }
  };

  const filteredConversations = searchTerm
    ? conversations.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with clients and freelancers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-240px)] min-h-[500px]">
        {/* Conversation List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-360px)] min-h-[380px]">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No messages found</p>
                </div>
              ) : (
                filteredConversations
                  .filter((conv) => activeTab === 'all' || (activeTab === 'unread' && conv.unread))
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 ${
                        selectedChat === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate pr-2">{conversation.name}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {conversation.timestamp}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {conversation.projectName}
                          </div>
                          <p
                            className={`text-sm truncate ${
                              conversation.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Area */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader className="py-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={conversations.find((c) => c.id === selectedChat)?.avatar}
                    />
                    <AvatarFallback>
                      {getInitials(
                        conversations.find((c) => c.id === selectedChat)?.name || ''
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {conversations.find((c) => c.id === selectedChat)?.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {conversations.find((c) => c.id === selectedChat)?.projectName}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentChatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'self' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          msg.sender === 'self'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'self'
                              ? 'text-primary-foreground/80'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t mt-auto">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center h-full">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your Messages</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Select a conversation to view messages or start a new conversation with a client or
                freelancer.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}