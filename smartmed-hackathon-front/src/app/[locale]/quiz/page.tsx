'use client'

import { useState } from 'react';
import { Button, Progress, Transition, Container, Stack, Title, Chip, Group, Flex, Text, Pagination } from '@mantine/core';
import styles from './page.module.css';
import {useTranslations} from 'next-intl';


type Question = {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple'; // Question type: single or multiple choice
};

const quizData: Question[] = [
  {
    id: 1,
    question: 'What is your primary reason for visiting the therapist?',
    options: ['Stress', 'Anxiety', 'Depression', 'Other'],
    type: 'single',
  },
  {
    id: 2,
    question: 'How long have you been experiencing these symptoms?',
    options: ['Less than a month', '1-6 months', '6 months to a year', 'More than a year'],
    type: 'single',
  },
  {
    id: 3,
    question: 'Do you have difficulty sleeping?',
    options: ['Yes', 'No'],
    type: 'single',
  },
  {
    id: 4,
    question: 'What activities seem to worsen your symptoms?',
    options: ['Work', 'Social interactions', 'Physical activity', 'None of the above'],
    type: 'multiple',
  },
  {
    id: 5,
    question: 'Have you noticed any physical symptoms accompanying your emotional state?',
    options: ['Headaches', 'Chest pain', 'Fatigue', 'None'],
    type: 'multiple',
  },
  {
    id: 6,
    question: 'How often do you feel your symptoms interfere with your daily life?',
    options: ['Rarely', 'Occasionally', 'Often', 'Always'],
    type: 'single',
  },
  {
    id: 7,
    question: 'What would you like to achieve from therapy?',
    options: ['Stress management', 'Better sleep', 'Improved relationships', 'Other'],
    type: 'single',
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const t = useTranslations('quiz');

  const handleSelection = (value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [quizData[currentQuestion].id]: value,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  
  

  const { question, options, type } = quizData[currentQuestion];

  return (
    <Container
      size="sm"
      style={{
        // height: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Progress Dots */}
      {/* <Pagination
        total={quizData.length}
        page={currentQuestion + 1} // Add 1 to sync with pagination's 1-based index
        onChange={(page) => {
          console.log("Page changed to:", page); // Debug log
          setCurrentQuestion(page - 1); // Update current question state
        }}
        // key={currentQuestion} // Ensure re-render when currentQuestion changes
        size="sm"
        withControls={false}
        styles={{
          item: { cursor: 'pointer', margin: '0 4px' },
          active: { backgroundColor: '#228be6' },
        }}
        style={{ marginBottom: '20px' }}
      /> */}
      <Progress
        value={((currentQuestion + 1) / quizData.length) * 100}
        size="lg"
        radius="xl"
        // striped
        style={{ width: '80%', margin: '0 auto', marginBottom: '20px' }} // Center and adjust width
        className='mt-4 mb-4'
      />


      {/* Question and Answers with Animation */}
      <Transition
        mounted
        transition="fade"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Stack align="center" style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Title order={3} textWrap='wrap' ta={"center"}>
                {question}
              </Title>
              <Text
                align="center"
                ta={"center"}
                style={{ color: 'gray', fontSize: '14px', marginBottom: '20px', marginTop: '0px' }}
              >
                {type === 'single'
                  ? t('oneVariant')
                  : t('multipleVariants')}
              </Text>
              <Flex direction={"column"} justify={"center"} align={"center"} gap={"md"}>
                <Chip.Group
                  multiple={type === 'multiple'}
                  value={answers[quizData[currentQuestion].id] || (type === 'multiple' ? [] : '')}
                  onChange={handleSelection}
                >
                  <Flex align={"center"} justify={"center"} gap={"md"} direction={"column"}>
                    {options.map((option) => (
                      <Chip
                        key={option}
                        value={option}
                        variant="filled"
                        size="lg"
                        radius="xl"
                        style={{ width: '100%', margin: 'auto', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
                      >
                        {option}
                      </Chip>
                    ))}
                  </Flex>
                </Chip.Group>
                <Group style={{ width: '100%' }} mt="lg">
                  <Button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    radius={"xl"}
                    size='lg'>
                    {t('previous')}
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={currentQuestion === quizData.length - 1}
                    radius={"xl"}
                    size='lg'
                  >
                    {t('next')}
                  </Button>
                </Group>
              </Flex>
            </Stack>
          </div>
        )}
      </Transition>
    </Container>
  );
}
