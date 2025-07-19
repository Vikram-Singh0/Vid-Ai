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
}
