'use client';
export default function QRCode() {
  // Create a deterministic pattern instead of using Math.random()
  const createQRPattern = () => {
    const pattern = [];
    for (let i = 0; i < 64; i++) {
      // Create a deterministic pattern based on position
      const isBlack = (i % 3 === 0) || (i % 7 === 0) || (i % 11 === 0);
      pattern.push(isBlack);
    }
    return pattern;
  };

  const qrPattern = createQRPattern();

  return (
    <div className="w-32 h-32 bg-white border-2 border-[#FF4B4B] rounded-lg flex flex-col items-center justify-center p-2">
      {/* QR Code placeholder - in a real app, you'd use a QR code library */}
      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center mb-2">
        <div className="grid grid-cols-8 gap-0.5">
          {qrPattern.map((isBlack, i) => (
            <div
              key={i}
              className={`w-1 h-1 ${
                isBlack ? 'bg-black' : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-xs text-[#2E2E2E] font-medium text-center">
        Scan to join
      </div>
    </div>
  );
}
