import type { ExperienceData, FullFormData, PersonalInfoData, SkillsData } from "@/lib/formSchema";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import { SkillsStep } from "./Steps/SkillsStep";
import StepIndicator from "./StepIndicator";
import { ExperienceStep } from "./Steps/ExperienceStep";
import PersonalInfoStep from "./Steps/PersonalInfoStep";
import { ReviewStep } from "./Steps/ReviewStep";
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FullFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loadFormState, saveFormState, clearFormState } = useFormPersistence();
  const STEPS = ["Personal Info", "Experience", "Skills", "Review"];

  const STEP_DESCRIPTIONS = [
    "Tell us about yourself",
    "Share your work history",
    "Highlight your expertise",
    "Review and submit",
  ];

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    const saved = loadFormState();
    if (saved) {
      setCurrentStep(saved.currentStep);
      setFormData({ ...saved.data });
    }
  }, [loadFormState]);



  const persistState = useCallback(
    (step: number, data: Partial<FullFormData>) => {
      saveFormState({
        currentStep: step,
        data,
        lastUpdated: new Date().toISOString(),
      });
    },
    [saveFormState]
  );

  const handlePersonalInfoNext = (data: PersonalInfoData) => {
    const newData = { ...formData, personalInfo: data };
    setFormData(newData);
    setCurrentStep(1);
    persistState(1, newData);
  };

  const handleExperienceNext = (data: ExperienceData) => {
    const newData = { ...formData, experience: data };
    setFormData(newData);
    setCurrentStep(2);
    persistState(2, newData);
  };

  const handleSkillsNext = (data: SkillsData) => {
    const newData = { ...formData, skills: data };
    setFormData(newData);
    setCurrentStep(3);
    persistState(3, newData);
  };

  const handleBack = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    persistState(newStep, formData);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    persistState(step, formData);
  };

  const handleSubmit = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form submitted:", formData);
        clearFormState();
        setIsSubmitted(true);
        resolve();
      }, 2000);
    });
  };

  const handleReset = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
    clearFormState();
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep && !isSubmitted) {
      setCurrentStep(step);
      persistState(step, formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            key={JSON.stringify(formData.personalInfo)}
            data={formData.personalInfo || {}}
            onNext={handlePersonalInfoNext}
          />
        );
      case 1:
        return (
          <ExperienceStep
            data={formData.experience || {}}
            onNext={handleExperienceNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <SkillsStep
            data={formData.skills || {}}
            onNext={handleSkillsNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ReviewStep
            data={formData as FullFormData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            onEdit={handleEdit}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };




  return (
    <div className="min-h-screen    bg-[radial-gradient(circle_at_50%_100%,rgba(70,85,110,0.5)_0%,transparent_60%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.4)_0%,transparent_70%),radial-gradient(circle_at_50%_100%,rgba(181,184,208,0.3)_0%,transparent_80%)]]
  shadow-md py-8 px-4 sm:py-12  font-sans">
      <div className="max-w-2xl mx-auto">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className=""
        >
          <Card className="border     ring-2">
            <CardHeader className="pb-4">
              <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
                isComplete={isSubmitted}
                onStepClick={handleStepClick}
              />
              {!isSubmitted && (
                <>
                  <CardTitle className="text-xl  font-semibold font-sans">{STEPS[currentStep]}</CardTitle>
                  <CardDescription className="  text-neutral-500 ">{STEP_DESCRIPTIONS[currentStep]}</CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

    </div>
  )
}

export default MultiStepForm