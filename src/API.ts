import { shuffleArray } from './utils'
export {}



export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type Questions = Question & { answers: string[] }

export enum Difficulty {
    EASY= "easy", 
    MEDIUM= "medium", 
    HARD= "hard"
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await(await fetch(endpoint)).json();
    // console.log(data, 'data')
    return data.results.map((question: Question) => (
        {
            ...question, 
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
    
}