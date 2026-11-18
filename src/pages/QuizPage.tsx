import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_TIERS } from '../data/quiz';

export function QuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[stepIndex];
  const selectedOption = selectedIndex !== null ? currentQ.options[selectedIndex] : null;
  const isGoodAnswer = selectedOption ? selectedOption.points > 0 : false;

  const hasLockedAnswer = selectedIndex !== null;

  const handleSelectOption = (idx: number) => {
    if (hasLockedAnswer) return;
    setSelectedIndex(idx);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const updatedScore = score + selectedOption.points;
    setScore(updatedScore);
    setSelectedIndex(null);

    if (stepIndex + 1 < QUIZ_QUESTIONS.length) {
      setStepIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setFinished(false);
  };

  const matchedTier =
    [...QUIZ_TIERS].reverse().find((tier) => score >= tier.minScore) ?? QUIZ_TIERS[0];

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20 min-h-[75vh]">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="space-y-3 pb-8 mb-10 border-b border-[#38BDF8]/20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8]">
            SELF-ASSESSMENT · FORM Q-6
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
            HOW DEEP DOES THE RABBIT HOLE GO?
          </h1>
          <p className="font-serif text-lg text-[#D6DFE6]">
            Six questions. One classification. Choices lock immediately once selected — proceed to the end or restart to re-test.
          </p>
        </header>

        {!finished ? (
          <section className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#8FA7B8]">
              <span>
                SCENARIO {String(stepIndex + 1).padStart(2, '0')} OF{' '}
                {String(QUIZ_QUESTIONS.length).padStart(2, '0')}
              </span>
              <span className="text-[#38BDF8] tabular-nums">
                CURRENT SCORE: {score + (selectedOption ? selectedOption.points : 0)}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl leading-snug text-[#F5F3E9]">
              {currentQ.prompt}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const optIsGood = opt.points > 0;

                let cardStyle = hasLockedAnswer
                  ? 'bg-[#06141E]/40 border-[#38BDF8]/10 text-[#8FA7B8] opacity-60 cursor-not-allowed'
                  : 'bg-[#06141E]/60 border-[#38BDF8]/20 text-[#D6DFE6] hover:border-[#38BDF8]/60 cursor-pointer';
                if (isSelected) {
                  cardStyle = optIsGood
                    ? 'bg-emerald-950/40 border-2 border-emerald-400 text-[#F5F3E9] cursor-default'
                    : 'bg-[#D94B46]/15 border-2 border-[#D94B46] text-[#F5F3E9] cursor-default';
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={hasLockedAnswer}
                    onClick={() => handleSelectOption(idx)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-4 sm:p-5 border transition-colors flex items-center justify-between gap-4 font-serif text-base sm:text-lg ${cardStyle}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider shrink-0 ${
                          optIsGood ? 'text-emerald-400' : 'text-[#D94B46]'
                        }`}
                      >
                        {optIsGood ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            CLEAR · LOCKED
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                            COMPROMISED · LOCKED
                          </>
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div
                className={`p-5 bg-[#06141E] border-2 space-y-4 ${
                  isGoodAnswer ? 'border-emerald-400' : 'border-[#D94B46]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-wider">
                  {isGoodAnswer ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      ANALYST ASSESSMENT · APPROVED (+{selectedOption.points} PTS)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[#D94B46] font-semibold">
                      <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                      ANALYST ASSESSMENT · COMPROMISED RESPONSE (0 PTS)
                    </span>
                  )}
                  <span className="text-[10px] text-[#8FA7B8]">SELECTION PERMANENTLY LOCKED</span>
                </div>
                <p className="font-serif text-base text-[#F5F3E9]">{selectedOption.reaction}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#38BDF8]/30 font-mono text-[11px] uppercase tracking-wider text-[#8FA7B8] hover:text-[#F5F3E9] hover:border-[#38BDF8] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Restart
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] cursor-pointer"
                  >
                    {stepIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Scenario' : 'Reveal Classification'}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="reticle-frame bg-[#0A1E2C] border-2 border-[#38BDF8] p-7 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#38BDF8]/20 font-mono text-xs">
              <span className="text-[#38BDF8] uppercase tracking-widest">{matchedTier.code}</span>
              <span className="text-[#E5A45B] uppercase tracking-widest tabular-nums">
                FINAL INDEX: {score} / {QUIZ_QUESTIONS.length * 3}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#38BDF8] shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[#8FA7B8]">
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
                  className="px-5 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC]"
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
