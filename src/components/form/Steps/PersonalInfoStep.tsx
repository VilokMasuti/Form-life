import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { personalInfoSchema, type PersonalInfoData } from "@/lib/formSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Linkedin, Mail, Phone, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface PersonalInfoStepProps {
  data: Partial<PersonalInfoData>;
  onNext: (data: PersonalInfoData) => void;
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
const PersonalInfoStep = ({ data, onNext }: PersonalInfoStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    },
  });
  useEffect(() => {
    reset({
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      linkedin: data.linkedin || "",
      github: data.github || "",
    });
  }, [data, reset]);

  return (
    <motion.form
      onSubmit={handleSubmit(onNext)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={itemVariants} className="space-y-2 font-sans">
        <Label htmlFor="fullName" className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground font-sans" />
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Vilok"
          {...register("fullName")}
          className={cn("h-11", errors.fullName && "border-destructive focus-visible:ring-destructive text-neutral-400")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2 font-sans">
        <Label htmlFor="email" className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Vilok@example.com"
          {...register("email")}
          className={cn("h-11", errors.email && "border-destructive focus-visible:ring-destructive")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2 font-sans">
        <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+919731594346"
          {...register("phone")}
          className={cn("h-11", errors.phone && "border-destructive focus-visible:ring-destructive")}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2 font-sans">
        <Label htmlFor="linkedin" className="flex items-center gap-2 text-sm">
          <Linkedin className="w-4 h-4 text-muted-foreground" />
          LinkedIn Profile
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/Vilok"
          {...register("linkedin")}
          className={cn("h-11", errors.linkedin && "border-destructive focus-visible:ring-destructive")}
        />
        {errors.linkedin && (
          <p className="text-sm text-destructive">{errors.linkedin.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2 font-sans">
        <Label htmlFor="github" className="flex items-center gap-2 text-sm">
          <Github className="w-4 h-4 text-muted-foreground" />
          GitHub Profile
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/Vilok"
          {...register("github")}
          className={cn("h-11", errors.github && "border-destructive focus-visible:ring-destructive")}
        />
        {errors.github && (
          <p className="text-sm text-destructive">{errors.github.message}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end pt-4 font-sans">
        <Button type="submit" size="lg" className=" cursor-pointer">
          Continue
        </Button>
      </motion.div>
    </motion.form>
  )
}

export default PersonalInfoStep