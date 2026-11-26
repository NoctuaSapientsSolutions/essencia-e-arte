const messages = [
  "Enviamos para todo o Brasil",
  "Compra segura",
  "Atendimento pelo WhatsApp",
];

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-cream">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs tracking-wide sm:text-sm">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
