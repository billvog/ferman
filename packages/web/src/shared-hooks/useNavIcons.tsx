import { useRouter } from "next/router";
import {
  AiFillCompass,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHome,
} from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import {
  BsChat,
  BsChatFill,
  BsGear,
  BsGearFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import {
  IoLogIn,
  IoLogInOutline,
  IoSearchOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { RiUser3Fill, RiUser3Line } from "react-icons/ri";

export const useNavIcons = () => {
  const { route } = useRouter();

  const HomeIcon = route === "/" ? AiFillHome : AiOutlineHome;
  const SettingsIcon = route === "/account/settings" ? BsGearFill : BsGear;
  const PostIcon = route === "/post" ? BsPlusCircleFill : BiPlus;
  const SearchIcon = route === "/search" ? IoSearchSharp : IoSearchOutline;
  const ExploreIcon =
    route === "/explore/posts" ? AiFillCompass : AiOutlineCompass;
  const MyAccountIcon = route === "/account" ? RiUser3Fill : RiUser3Line;
  const ChatIcon = route.startsWith("/chat") ? BsChatFill : BsChat;
  const LoginIcon = route === "/account/login" ? IoLogIn : IoLogInOutline;

  return {
    HomeIcon,
    SettingsIcon,
    PostIcon,
    SearchIcon,
    ExploreIcon,
    MyAccountIcon,
    ChatIcon,
    LoginIcon,
  };
};
