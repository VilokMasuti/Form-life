import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { experienceSchema, type ExperienceData } from "@/lib/formSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface ExperienceStepProps {
  data: Partial<ExperienceData>;
  onNext: (data: ExperienceData) => void;
  onBack: () => void;
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
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export const ExperienceStep = ({ data, onNext, onBack }: ExperienceStepProps) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema)as any,
    defaultValues: {
      experiences: data.experiences?.length
        ? data.experiences
        : [
            {
              id: uuidv4(),
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onNext)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <AnimatePresence mode="popLayout">
        {fields.map((field, index) => {
          const isCurrent = watch(`experiences.${index}.current`);
          
          return (
            <motion.div
              key={field.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Card className="p-6 relative">
                {fields.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Experience {index + 1}</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.company`}>Company</Label>
                    <Input
                      id={`experiences.${index}.company`}
                      placeholder="Company Name"
                      {...register(`experiences.${index}.company`)}
                      className={cn("h-11", errors.experiences?.[index]?.company && "border-destructive")}
                    />
                    {errors.experiences?.[index]?.company && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.company?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.position`}>Position</Label>
                    <Input
                      id={`experiences.${index}.position`}
                      placeholder="Job Title"
                      {...register(`experiences.${index}.position`)}
                      className={cn("h-11", errors.experiences?.[index]?.position && "border-destructive")}
                    />
                    {errors.experiences?.[index]?.position && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.position?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.startDate`}>Start Date</Label>
                    <Input
                      id={`experiences.${index}.startDate`}
                      type="month"
                      {...register(`experiences.${index}.startDate`)}
                      className={cn("h-11", errors.experiences?.[index]?.startDate && "border-destructive")}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-sm text-destructive">
                        {errors.experiences[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.endDate`}>End Date</Label>
                    <Input
                      id={`experiences.${index}.endDate`}
                      type="month"
                      disabled={isCurrent}
                      {...register(`experiences.${index}.endDate`)}
                      className={cn("h-11", isCurrent && "opacity-50")}
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <Checkbox
                        id={`experiences.${index}.current`}
                        checked={isCurrent}
                        onCheckedChange={(checked) => {
                          setValue(`experiences.${index}.current`, !!checked);
                          if (checked) {
                            setValue(`experiences.${index}.endDate`, "");
                          }
                        }}
                      />
                      <Label
                        htmlFor={`experiences.${index}.current`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        Currently working here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`experiences.${index}.description`}>Description</Label>
                  <Textarea
                    id={`experiences.${index}.description`}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    {...register(`experiences.${index}.description`)}
                    className={cn(errors.experiences?.[index]?.description && "border-destructive")}
                  />
                  {errors.experiences?.[index]?.description && (
                    <p className="text-sm text-destructive">
                      {errors.experiences[index]?.description?.message}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {errors.experiences?.message && (
        <p className="text-sm text-destructive">{errors.experiences.message}</p>
      )}

      <motion.div variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full h-11"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Experience
        </Button>
      </motion.div>

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
