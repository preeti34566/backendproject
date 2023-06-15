// models/UserResponse.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserResponseSchema = new Schema({
  userId: { type: String, required: true },
  testId: { type: String, required: true },
  questions: [{
    questionId: { type: Schema.Types.ObjectId, required: true },
    correctAnswers: [{ type: String, required: true }],
  }],
});

export default mongoose.model('UserResponse', UserResponseSchema);
