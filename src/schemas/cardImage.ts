import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Type = Schema.Types;

const imageSchema = new Schema({
  imageId: {
    type: Type.String,
    required: true,
  },
  imageUrl: {
    type: Type.String,
    required: true,
  },
  imageUrlSmall: {
    type: Type.String,
    required: true,
  },
  imageUrlCropped: {
    type: Type.String,
    required: true,
  },
});

export default mongoose.model("image", imageSchema);
