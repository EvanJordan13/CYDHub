import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import TextInput from './TextInput';

interface FeedbackCardProps {
  question: string;
  placeholder: string;
  words: string[];
  onFeedbackChange?: (feedback: string) => void;
}

const FeedbackCard = ({ question, placeholder, words, onFeedbackChange }: FeedbackCardProps) => {
  const [feedback, setFeedback] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
    if (onFeedbackChange) onFeedbackChange(e.target.value);
  };

  const renderHighlightedText = (text: string, wordsToHighlight: string[]) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!;:]/g, '');
      if (wordsToHighlight.includes(cleanWord)) {
        return (
          <Text as="span" key={index} color="Flamingo" fontWeight="bold">
            {word}{' '}
          </Text>
        );
      } else {
        return (
          <Text as="span" key={index}>
            {word}{' '}
          </Text>
        );
      }
    });
  };

  return (
    <Flex direction="column">
      <Text fontWeight="semibold" mb={4}>
        {renderHighlightedText(question, words)}
      </Text>
      <TextInput
        label={placeholder}
        height={20}
        icon={''}
        invalidFunction={() => false}
        wrap={true}
        onChange={handleChange}
      />
    </Flex>
  );
};

export default FeedbackCard;