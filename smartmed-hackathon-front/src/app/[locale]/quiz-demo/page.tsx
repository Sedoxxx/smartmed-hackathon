'use client';
import React, { useState } from 'react';
import {
  Button,
  Container,
  Textarea,
  Text,
  Card,
  Group,
  Stepper,
  Title,
  Divider,
  Grid,
  Loader, // Import Mantine Loader
  Center,
} from '@mantine/core';

const BASE_URL = 'http://10.91.74.9:8801/questions/generate';
const INITIAL_QUESTION = 'Когда вы впервые почувствовали себя больным и как долго продолжаются эти ощущения?';
const APPOINTMENT_ID = 452;

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([INITIAL_QUESTION]);
  const [answers, setAnswers] = useState(Array(4).fill(''));
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch the next question with a 2-second loading delay
  const fetchNextQuestion = async (context) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${BASE_URL}?context=${encodeURIComponent(context)}&appointment_id=${APPOINTMENT_ID}`
      );
      if (!response.ok) throw new Error('Failed to fetch question');

      const data = await response.json();
      
      // Simulate a 2-second delay
      setTimeout(() => {
        setQuestions((prev) => [...prev, data.question]); // Add new question
        setCurrentQuestionIndex((prev) => prev + 1); // Move to next question after delay
        setLoading(false); // Stop loading after updating the question
      }, 2000);
    } catch (error) {
      console.error('Error fetching question:', error);
      setLoading(false); // Stop loading on error
    }
  };

  // Handle moving to the next question
  const handleNext = () => {
    const currentAnswer = answers[currentQuestionIndex];
    const context = `${questions[currentQuestionIndex]} ${currentAnswer}`; // Concatenate question and answer
    if (currentQuestionIndex < 3) {
      fetchNextQuestion(context); // Fetch up to 4 questions
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <Container size="lg" mt="lg">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Stepper active={currentQuestionIndex} breakpoint="sm">
          {Array.from({ length: 4 }).map((_, index) => (
            <Stepper.Step key={index} label={`Question ${index + 1}`} />
          ))}
        </Stepper>

        <Divider my="md" />

        {/* Display loading indicator */}
        {loading ? (
          <Center mt="md">
            <Loader size="lg" />
          </Center>
        ) : (
          <Grid justify="center">
            <Grid.Col span={12}>
              <Title order={4} align="center" mb="md">
                Question {currentQuestionIndex + 1} of 4
              </Title>
              <Text size="xl" weight={600} align="center" mb="lg">
                {questions[currentQuestionIndex]}
              </Text>
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                placeholder="Type your answer here..."
                minRows={6}
                value={answers[currentQuestionIndex]}
                onChange={handleAnswerChange}
              />
            </Grid.Col>
          </Grid>
        )}

        <Divider my="md" />

        <Group position="apart" mt="lg">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || loading}
            variant="default"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              loading ||
              currentQuestionIndex >= 3 ||
              answers[currentQuestionIndex].trim() === ''
            }
            variant="filled"
            color="blue"
          >
            {currentQuestionIndex === 3 ? 'Finish' : 'Next'}
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
