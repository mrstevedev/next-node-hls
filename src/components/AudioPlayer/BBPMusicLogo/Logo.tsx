import Image from "next/image";

import logo from "/public/images/logo_white.svg";

export default function Logo() {
  return <Image src={logo} alt="BBP Music Library" width={70} height={70} />;
}
