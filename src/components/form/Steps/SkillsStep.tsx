import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AVAILABLE_SKILLS, skillsSchema, type SkillsData } from "@/lib/formSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface SkillsStepProps {
  data: Partial<SkillsData>;
  onNext: (data: SkillsData) => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export const SkillsStep = ({ data, onNext, onBack }: SkillsStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SkillsData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: data.skills || [],
    },
  });

  const selectedSkills = watch("skills");

  const filteredSkills = useMemo(() => {
    return AVAILABLE_SKILLS.filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleSkill = (skill: string) => {
    const current = selectedSkills || [];
    if (current.includes(skill)) {
      setValue("skills", current.filter((s) => s !== skill), { shouldValidate: true });
    } else {
      setValue("skills", [...current, skill], { shouldValidate: true });
    }
  };

  const removeSkill = (skill: string) => {
    const current = selectedSkills || [];
    setValue("skills", current.filter((s) => s !== skill), { shouldValidate: true });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onNext)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label className="flex items-center justify-between">
          <span>Selected Skills</span>
          {selectedSkills && selectedSkills.length > 0 && (
            <span className="text-muted-foreground text-xs">
              {selectedSkills.length} selected
            </span>
          )}
        </Label>
        <div className="min-h-[60px] p-3 border rounded-lg bg-secondary/30">
          <AnimatePresence mode="popLayout">
            {selectedSkills && selectedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 text-sm bg-foreground text-background hover:bg-foreground/90"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:opacity-70 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No skills selected yet</p>
            )}
          </AnimatePresence>
        </div>
        {errors.skills && (
          <p className="text-sm text-destructive">{errors.skills.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="skill-search">Search Skills</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="skill-search"
            placeholder="Search for skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label>Available Skills</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto p-1 -m-1">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills?.includes(skill);
            return (
              <motion.button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-md border text-sm transition-all text-left",
                  isSelected
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background hover:bg-secondary border-border"
                )}
              >
                <span className="truncate">{skill}</span>
                {isSelected && <Check className="w-4 h-4 ml-2 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>
        {filteredSkills.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-4">
            No skills found matching "{searchQuery}"
          </p>
        )}
      </motion.div>

      <Controller
        name="skills"
        control={control}
        render={() => <input type="hidden" />}
      />

      <motion.div variants={itemVariants} className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack}  className=" cursor-pointer">
          Back
        </Button>
        <Button type="submit" size="lg"  className=" cursor-pointer">
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
};
