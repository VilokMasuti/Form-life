import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type FullFormData } from "@/lib/formSchema";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Github,
  Linkedin,
  Loader2,
  Pencil,
  Phone,
  User,
  Workflow
} from "lucide-react";
import { useState } from "react";
import { SuccessState } from "../SuccessState";

interface ReviewStepProps {
  data: FullFormData;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  onEdit: (step: number) => void;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const ReviewStep = ({ data, onBack, onSubmit, onEdit, onReset }: ReviewStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isSuccess) {
    return <SuccessState onCreateNew={onReset} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wide font-sans  text-neutral-900">
                <User className="w-4 h-4" />
                Personal Information
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(0)}
                className="font-sans  text-neutral-900 hover:text-foreground h-8 px-2 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {data.personalInfo.fullName.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{data.personalInfo.fullName}</p>
                  <p className="text-sm text-neutral-500">{data.personalInfo.email}</p>
                </div>
              </div>
              <Separator />
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-500" />
                  <span>{data.personalInfo.phone}</span>
                </div>
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-neutral-500" />
                    <a
                      href={data.personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {data.personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-neutral-500" />
                    <a
                      href={data.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                    >
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Experience */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wide font-sans  text-neutral-900">
                <Briefcase className="w-4 h-4" />
                Work Experience
                <Badge variant="secondary" className="ml-2 text-xs">
                  {data.experience.experiences.length}
                </Badge>
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(1)}
                className="text-neutral-500 hover:text-foreground h-8 px-2"
              >
                <Pencil className="w-3.5 h-3.5 mr-1 cursor-pointer" />
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              {data.experience.experiences.map((exp, index) => (
                <div key={exp.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-neutral-500 text-sm">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <Badge variant="outline" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-neutral-500 text-xs">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate || "")}
                    </p>
                    <p className="text-sm mt-2 text-neutral-500">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wide font-sans  text-neutral-900">
                < Workflow className="w-4 h-4" />
                Skills
                <Badge variant="secondary" className="ml-2 text-xs">
                  {data.skills.skills.length}
                </Badge>
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                className="font-sans  text-neutral-900 hover:text-foreground h-8 px-2"
              >
                <Pencil className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1.5">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-between pt-4">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="min-w-[160px] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
