const TypingIndicator = () => {
  return (
    <div className="flex gap-2 px-4">
      <div className="w-7" />
      <div className="message-received flex items-center gap-1 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-1" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-2" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-3" />
      </div>
    </div>
  );
};

export default TypingIndicator;
