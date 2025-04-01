"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, PlusCircle, Search } from "lucide-react"
import ChatMessage from "@/components/chat-message"
import TypingIndicator from "@/components/typing-indicator"
import Sidebar from "@/components/sidebar"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Navbar from "@/components/navbar"

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Check if we need to show the scroll to bottom button
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById("message-container")
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
        setShowScrollButton(!isNearBottom)
      }
    }

    const scrollContainer = document.getElementById("message-container")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    }
    setMessages(prev => [...prev, newUserMessage])
    setInput("")
    
    // Simulate bot response
    setIsLoading(true)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm here to help you with any questions or tasks related to IIIT Delhi. Let me know how I can assist!"
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-semibold">AskAlma</Link>
          </div>
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            <PlusCircle size={16} className="mr-1" />
            New chat
          </Button>
        </header>

        {/* Chat Messages */}
        <div id="message-container" className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4">How can I assist you today?</h2>
                <p className="text-muted-foreground">
                  Ask me anything about IIIT Delhi's resources, regulations, or get guidance on navigating the website.
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-20 right-4 rounded-full shadow-md"
            onClick={scrollToBottom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask your question here..."
              className="pr-12 py-6 bg-background border-muted"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {!input.trim() && (
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <Search size={18} />
                </Button>
              )}
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className={cn("rounded-md", !input.trim() && "hidden")}
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
