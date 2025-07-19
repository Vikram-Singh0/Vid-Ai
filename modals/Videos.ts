import mongoose, { Schema, model, models } from "mongoose";

export const VideoDimension = {
  height: 1080,
  width: 1920,
} as const;

export interface Ivideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}
const videoSchema = new Schema<Ivideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VideoDimension.height },
      width: { type: Number, default: VideoDimension.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models?.video || model<Ivideo>("Video", videoSchema);

export default Video;
