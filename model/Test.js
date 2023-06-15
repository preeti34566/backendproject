// models/Test.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const TestSchema = new Schema({
  // Add any other fields you need for the test document
  testId: { type: String, required: true },
  questions: [{
    questionId: { type: Schema.Types.ObjectId, required: true },
    correctAnswers: [{ type: String, required: true }],
  }],
});

export default mongoose.model('Test', TestSchema);
