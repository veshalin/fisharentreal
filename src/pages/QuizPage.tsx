import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_TIERS } from '../data/quiz';

export function QuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<number>(0);
  const [finished, setFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[stepIndex];

  const handleSelectOption = (points: number, reaction: string) => {
    setSelectedPoints(points);
    setSelectedReaction(reaction);
  };

  const handleNext = () => {
    const updatedScore = score + selectedPoints;
    setScore(updatedScore);
    setSelectedReaction(null);
    setSelectedPoints(0);

    if (stepIndex + 1 < QUIZ_QUESTIONS.length) {
      setStepIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setScore(0);
    setSelectedReaction(null);
    setSelectedPoints(0);
    setFinished(false);
  };

  const matchedTier =
    [...QUIZ_TIERS].reverse().find((tier) => score >= tier.minScore) ?? QUIZ_TIERS[0];

  return (
    <div className="bg-intel-grid text-[#F5F3E9] py-14 sm:py-20 min-h-[75vh]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="space-y-3 pb-8 mb-10 border-b border-[#38BDF8]/20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8]">
            PSYCHOLOGICAL CLEARANCE ASSESSMENT
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
            HOW DEEP DOES THE RABBIT HOLE GO?
          </h1>
          <p className="font-serif text-lg text-[#D6DFE6]">
            Answer five field scenarios to determine your official FISHARENTREAL™ clearance classification.
          </p>
        </header>

        {!finished ? (
          <section className="bg-[#0B2535] border border-[#38BDF8]/25 p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#91A4B5]">
              <span>
                SCENARIO {String(stepIndex + 1).padStart(2, '0')} OF{' '}
                {String(QUIZ_QUESTIONS.length).padStart(2, '0')}
              </span>
              <span className="text-[#38BDF8] tabular-nums">
                CURRENT SCORE: {score}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl leading-snug text-[#F5F3E9]">
              {currentQ.prompt}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedReaction === opt.reaction;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectOption(opt.points, opt.reaction)}
                    className={`w-full text-left p-4 sm:p-5 border transition-colors cursor-pointer font-serif text-base sm:text-lg ${
                      isSelected
                        ? 'bg-[#071B27] border-[#38BDF8] text-[#F5F3E9]'
                        : 'bg-[#071B27]/50 border-[#38BDF8]/20 text-[#D6DFE6] hover:border-[#38BDF8]/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {selectedReaction && (
              <div className="p-4 bg-[#071B27] border border-[#E5A45B]/50 space-y-4">
                <p className="font-mono text-xs uppercase tracking-wider text-[#E5A45B]">
                  ANALYST ASSESSMENT:
                </p>
                <p className="font-serif text-base text-[#F5F3E9]">{selectedReaction}</p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8] text-[#071B27] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] cursor-pointer"
                  >
                    {stepIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Scenario' : 'Reveal Classification'}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="bg-[#0B2535] border-2 border-[#38BDF8] p-7 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#38BDF8]/20 font-mono text-xs">
              <span className="text-[#38BDF8] uppercase tracking-widest">{matchedTier.code}</span>
              <span className="text-[#E5A45B] uppercase tracking-widest tabular-nums">
                FINAL INDEX: {score} / {QUIZ_QUESTIONS.length * 3}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#38BDF8] shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[#91A4B5]">
                  {matchedTier.clearance}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#F5F3E9]">
                  {matchedTier.title}
                </h2>
              </div>
            </div>

            <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6]">
              {matchedTier.summary}
            </p>

            <div className="pt-6 border-t border-[#38BDF8]/15 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#38BDF8]/30 font-mono text-xs uppercase tracking-wider text-[#F5F3E9] hover:border-[#38BDF8] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Retake Assessment
              </button>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/demands"
                  className="px-5 py-2.5 bg-[#38BDF8] text-[#071B27] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC]"
                >
                  Read Our Demands
                </Link>
                <Link
                  to="/evidence"
                  className="px-5 py-2.5 border border-[#38BDF8]/40 text-[#F5F3E9] font-mono text-xs uppercase tracking-wider hover:border-[#38BDF8]"
                >
                  Review Evidence
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
