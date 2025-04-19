'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

type Props = {
  message: string;
  anchorRef: React.RefObject<HTMLElement>;
  onClose: () => void;
};

export function LeadMessagePopup({ message, anchorRef, onClose }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      ref={popupRef}
      className="absolute z-50 bg-white shadow-lg border rounded-md p-4 text-sm w-80"
      style={{
        top: rect.top + window.scrollY, // place below
        left: rect.left + window.scrollX,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-black">Message</strong>
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>
      <p className="text-gray-800">{message}</p>
    </div>,
    document.getElementById('lead-message-popup-root')!
  );
}
