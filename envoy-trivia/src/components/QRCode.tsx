'use client';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCode() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Get the current URL and append /mobile
    const mobileUrl = `${window.location.origin}/mobile`;
    setUrl(mobileUrl);
  }, []);

  if (!url) {
    return (
      <div className="w-full h-full bg-white border-2 border-[#FF4B4B] rounded-lg flex items-center justify-center">
        <div className="text-xs text-[#2E2E2E] font-medium text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white border-2 border-[#FF4B4B] rounded-lg flex flex-col items-center justify-center p-2">
      <div className="w-full h-auto flex items-center justify-center">
        <QRCodeCanvas 
          value={url} 
          size={80}
          level="M"
        />
      </div>
      <div className="text-xs sm:text-sm text-[#2E2E2E] font-medium text-center mt-1">
        Scan to join
      </div>
    </div>
  );
}
