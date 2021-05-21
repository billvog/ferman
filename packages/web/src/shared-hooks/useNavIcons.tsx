import { useRouter } from "next/router";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass,
} from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import {
  RiSearchFill,
  RiSearchLine,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";

export const useNavIcons = () => {
  const { route } = useRouter();

  const HomeIcon = route === "/" ? AiFillHome : AiOutlineHome;
  const PostIcon = route === "/post" ? BsPlusCircleFill : BiPlus;
  const SearchIcon = route === "/search" ? RiSearchFill : RiSearchLine;
  const ExploreIcon =
    route === "/explore/posts" ? AiFillCompass : AiOutlineCompass;
  const MyAccountIcon = route === "/account" ? RiUser3Fill : RiUser3Line;

  return {
    HomeIcon,
    PostIcon,
    SearchIcon,
    ExploreIcon,
    MyAccountIcon,
  };
};
