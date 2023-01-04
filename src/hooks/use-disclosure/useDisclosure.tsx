import React from 'react';

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;
