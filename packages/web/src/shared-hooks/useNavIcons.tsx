import { useRouter } from "next/router";
import {
  AiFillCompass,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHome,
} from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
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
  const PostIcon = route === "/post" ? BsPlusCircleFill : BiPlus;
  const SearchIcon = route === "/search" ? IoSearchSharp : IoSearchOutline;
  const ExploreIcon =
    route === "/explore/posts" ? AiFillCompass : AiOutlineCompass;
  const MyAccountIcon = route === "/account" ? RiUser3Fill : RiUser3Line;
  const LoginIcon = route === "/account/login" ? IoLogIn : IoLogInOutline;

  return {
    HomeIcon,
    PostIcon,
    SearchIcon,
    ExploreIcon,
    MyAccountIcon,
    LoginIcon,
  };
};
