export interface FAQQuestion {
    question: string;
    answer: string;
}

export interface FAQSection {
    sectionTitle: string;
    questions: FAQQuestion[];
}
