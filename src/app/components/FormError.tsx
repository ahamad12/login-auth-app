import React from "react";

type Props = {
  message?: string;
};

export const FormError: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};
