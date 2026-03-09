import { Header, Footer } from "@/components/layout";
import { QuizApp } from "@/components/quiz/quiz-app";

export default function AiAssessmentPage() {
  return (
    <>
      <Header />
      <main>
        <QuizApp />
      </main>
      <Footer />
    </>
  );
}
