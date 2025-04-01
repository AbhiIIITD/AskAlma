import { MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const { theme } = useTheme()
  const isUser = role === "user"

  // Define background colors based on theme
  const bgColor = theme === "dark" ? (isUser ? "bg-gray-800" : "bg-gray-600") : (isUser ? "bg-soft-slate" : "bg-mint-accent")
  const textColor = theme === "dark" ? (isUser ? "text-white" : "text-gray-200") : (isUser ? "text-gray-900" : "text-deep-navy")
  const avatarColor = theme === "dark" ? "bg-gray-700" : "bg-soft-slate/20"
  const avatarIconColor = theme === "dark" ? "text-gray-300" : "text-soft-slate"

  return (
    <div
      className={cn("flex animate-fade-in", isUser ? "justify-end" : "justify-start")}
      style={{ animationDuration: "400ms" }}
    >
      <div className="flex items-start max-w-[80%] md:max-w-[70%]">
        {!isUser && (
          <div className={cn("mr-2 mt-1 flex-shrink-0 rounded-full p-1", avatarColor)}>
            <MessageCircle size={18} className={avatarIconColor} />
          </div>
        )}

        <div
          className={cn(
            "px-4 py-3 rounded-lg shadow-sm",
            isUser ? `${bgColor} ${textColor} rounded-tr-none` : `${bgColor} ${textColor} rounded-tl-none`
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          <div className={cn("text-xs mt-1 opacity-70", isUser ? "text-right" : "text-left")}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {isUser && (
          <div className="ml-2 mt-1 flex-shrink-0 rounded-full p-1" style={{ backgroundColor: avatarColor }}>
            <User size={18} className={avatarIconColor} />
          </div>
        )}
      </div>
    </div>
  )
}
