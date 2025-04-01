import { MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div
      className={cn("flex animate-fade-in", isUser ? "justify-end" : "justify-start")}
      style={{ animationDuration: "400ms" }}
    >
      <div className="flex items-start max-w-[80%] md:max-w-[70%]">
        {!isUser && (
          <div className="mr-2 mt-1 flex-shrink-0 rounded-full bg-mint-accent/20 p-1">
            <MessageCircle size={18} className="text-mint-accent" />
          </div>
        )}

        <div
          className={cn(
            "px-4 py-3 rounded-lg shadow-sm",
            isUser ? "bg-soft-slate text-white rounded-tr-none" : "bg-mint-accent text-deep-navy rounded-tl-none",
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          <div className={cn("text-xs mt-1 opacity-70", isUser ? "text-right" : "text-left")}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {isUser && (
          <div className="ml-2 mt-1 flex-shrink-0 rounded-full bg-soft-slate/20 p-1">
            <User size={18} className="text-soft-slate" />
          </div>
        )}
      </div>
    </div>
  )
}

