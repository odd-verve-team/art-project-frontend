import { useState } from "react";

export const NewsletterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
    setEmail('');
    console.log('Form submitted');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col gap-[18px] max-w-[570px] mt-[32px] 
        text-[12px]/[24px] font-[500] tracking-[1px]
      `}
    >
      <h3 className="text-[16px] text-background uppercase">
        BE THE FIRST TO RECEIVE NOTIFICATIONS ABOUT ALL OUR EVENTS AND
        EXHIBITIONS
      </h3>

      <div className="flex flex-col gap-[12px] mt-[6px]">
        <input
          type="text"
          value={name}
          placeholder="your name"
          className={`
            w-full pb-[4px] 
            text-muted uppercase outline-none 
            bg-transparent border-b border-background/70 
            focus:border-background transition-colors
            `}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="your email"
          className={`
            w-full pb-[4px] 
            text-muted uppercase outline-none 
            bg-transparent border-b border-background/70 
            focus:border-background transition-colors
          `}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        className={`
          self-end px-[22px] py-[5px] 
          text-primary bg-background font-[500] uppercase 
          hover:opacity-70 transition-opacity duration-500 ease-in-out
        `}
      >
        send
      </button>
    </form>
  );
};
