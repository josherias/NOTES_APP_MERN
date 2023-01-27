import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

// code defines a TypeScript type "Note" using the InferSchemaType utility. This type will be inferred from the noteSchema
type Note = InferSchemaType<typeof noteSchema>;

//Finally, the code exports the schema as a model using the "model" function and the "Note" type defined above.
export default model<Note>("Note", noteSchema);
