import WhatsappLogo from "../assets/Whatsapp.svg";

const FloatingWhatsApp = () => {
  const whatsappUrl = "https://wa.me/995597561305?text=Hello%20there";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50
                 transition-transform hover:scale-110"
    >
      <img
        src={WhatsappLogo}
        alt="WhatsApp"
        className="h-12 w-12 sm:h-14 sm:w-14 md:h-18 md:w-18 lg:h-20 lg:w-20 
                   drop-shadow-lg hover:drop-shadow-xl"
      />
    </a>
  );
};

export default FloatingWhatsApp;
