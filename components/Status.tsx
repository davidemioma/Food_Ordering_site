import React from "react";
import Image from "next/image";

interface Props {
  status: number;
  index: number;
  photoUrl: string;
  task: string;
}

const Status = ({ status, index, photoUrl, task }: Props) => {
  return (
    <div
      className={`${index - status <= 0 && "paid"} ${
        index - status === 1 && "inProgress"
      } ${index - status > 1 && "delivery"}`}
    >
      <Image src={photoUrl} width={25} height={25} objectFit="contain" />

      <p className="text-xs sm:text-sm">{task}</p>

      <Image
        src="/assets/checked.png"
        width={15}
        height={15}
        objectFit="contain"
      />
    </div>
  );
};

export default Status;
