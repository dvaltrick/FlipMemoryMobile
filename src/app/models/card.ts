import CardResponse from './card-response';
import Category from './category';

export default class Card {
    id: number;
    question: string;
    answer: string;
    categories: Category[] = [];
    responses: CardResponse[] = [];
}