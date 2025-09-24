import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Modal from "@/components/Modal";

export type Hotspot = {
  x: number;
  y: number;
  note: string;
};

export type Image = {
  url: string;
  caption?: string;
  alt?: string;
  hotspotAnnotations?: Hotspot[];
};

export type Step = {
  index: number;
  title: string;
  body: string;
  images: Image[];
};

type Guide = {
  title: string;
  summary?: string;
  steps: Step[];
};

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{guide.title}</h2>

      {guide.summary && (
        <p className="text-gray-900 leading-relaxed">{guide.summary}</p>
      )}

      {guide.steps.map((step) => (
        <Card key={step.index} className="shadow-sm">
          <CardContent className="space-y-4 p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span>{step.index}.</span>
              {step.title}
            </h3>

            <p>{step.body}</p>

            {step.images.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full h-48 relative overflow-hidden rounded-lg border">
                    <img
                      src={step.images[0].url}
                      alt={step.images[0].alt || step.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold opacity-0 hover:opacity-100 transition">
                      View Image
                    </span>
                  </button>
                </DialogTrigger>

                <DialogContent className="w-5xl">
                  <DialogHeader>
                    <DialogTitle>{step.title}</DialogTitle>
                  </DialogHeader>
                  <Modal step={step} />
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuideCard;
