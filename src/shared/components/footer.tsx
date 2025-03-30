import InstagramIcon from "./icons/instagram-icon";
import TelegramIcon from "./icons/telegram-icon";

const Footer = () => {
  return (
    <footer className="relative w-full rounded-t-[14px] flex pt-[40px] pb-[30px] justify-center bg-primary shadow-card-light">
      <div className="flex items-center justify-center gap-2">
        <InstagramIcon color="#f6d061" />
        <span className="h-[40px] w-[2px] rounded-md bg-border"></span>
        <TelegramIcon color="#f6d061" />
      </div>
    </footer>
  );
};

export default Footer;
