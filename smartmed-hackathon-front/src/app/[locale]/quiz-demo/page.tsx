'use client'
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
  Stack,
} from '@mantine/core';

const quizData = [
  {
    question: 'What are the symptoms of hypertension?',
  },
  {
    question: 'Describe the process of a blood glucose test.',
  },
  {
    question: 'Explain the importance of regular health check-ups.',
  },
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(quizData.map(() => '')); // Initialize empty answers

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <Container size="lg" mt="lg">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        {/* Stepper to indicate progress */}
        <Stepper active={currentQuestionIndex} onStepClick={setCurrentQuestionIndex} breakpoint="sm">
          {quizData.map((_, index) => (
            <Stepper.Step key={index} label={`Question ${index + 1}`} />
          ))}
        </Stepper>

        <Divider my="md" />

        {/* Question content */}
        <Grid justify="center">
          <Grid.Col span={12}>
            <Title order={4} align="center" mb="md">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </Title>
            <Text size="xl" weight={600} align="center" mb="lg">
              {quizData[currentQuestionIndex].question}
            </Text>
          </Grid.Col>

          {/* Text area for answer */}
          <Grid.Col span={12}>
            <Textarea
              placeholder="Type your answer here..."
              minRows={6}
              value={answers[currentQuestionIndex]}
              onChange={handleAnswerChange}
            />
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        {/* Navigation buttons */}
        <Group position="apart" mt="lg">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="default"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === quizData.length - 1}
            variant="filled"
            color="blue"
          >
            Next
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
