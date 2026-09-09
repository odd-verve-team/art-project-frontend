import { useState } from 'react';

import { FOOTER_HOVER } from './footerConstants';

const INPUT_CLASS = `
  w-full pb-[4px]
  text-muted uppercase outline-none
  bg-transparent border-b border-background/70 
  focus:border-background transition-colors
`;

export const NewsletterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
    setEmail('');
    console.log('Form submitted');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col gap-[16px] w-full 
        lg:max-w-[570px] 
        text-[10px]/[24px] font-[500] tracking-[1px]
        lg:text-[12px]
      `}
    >
      <h3 className="text-[14px] text-background uppercase text-justify lg:text-left">
        BE THE FIRST TO RECEIVE NOTIFICATIONS ABOUT ALL OUR EVENTS AND
        EXHIBITIONS
      </h3>

      <div className="flex flex-col gap-[12px] mt-[6px]">
        <input
          type="text"
          value={name}
          placeholder="your name"
          className={INPUT_CLASS}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="your email"
          className={INPUT_CLASS}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        className={`
          w-full py-[12px] mt-[16px] 
          lg:w-auto lg:self-end lg:px-[22px] lg:py-[5px] lg:mt-0
          text-[12px] text-primary bg-background uppercase 
          ${FOOTER_HOVER}
        `}
      >
        send
      </button>
    </form>
  );
};
