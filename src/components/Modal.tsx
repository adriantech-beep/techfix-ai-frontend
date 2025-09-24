import type { Step } from "@/chat/GuideCard";

const Modal = ({ step }: { step: Step }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {step.images.map((img, idx) => (
        <div key={idx} className="relative rounded-lg overflow-hidden">
          <img
            src={img.url}
            alt={img.alt || `${step.title} - image ${idx + 1}`}
            className="w-full h-64 object-cover"
          />

          {img.hotspotAnnotations?.map((spot, i) => (
            <button
              key={i}
              className="absolute w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow cursor-pointer"
              style={{
                top: `${spot.y}%`,
                left: `${spot.x}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={spot.note}
              title={spot.note}
            >
              ⚠
            </button>
          ))}

          {img.caption && (
            <p className="mt-2 text-xs text-gray-500 text-center">
              {img.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Modal;
