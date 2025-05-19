import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IconType } from "react-icons";

interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: FaTwitter,
    url: "#",
    label: "Twitter",
  },
  {
    icon: FaInstagram,
    url: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedin,
    url: "#",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    url: "#",
    label: "GitHub",
  },
];

export const quickLink = [
  "ساخت وب‌سایت",
  "فروشگاه آنلاین",
  "وبلاگ",
  "لندینگ پیج",
  "رزرو آنلاین",
];
export const contactLink = [
  "درباره ما",
  "تماس با ما",
  "همکاری با ما",
  "حریم خصوصی",
  "شرایط استفاده",
];
export const refrenceLink = ["مستندات", "آموزش‌ها", "بلاگ", "پشتیبانی", "API"];

export const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
