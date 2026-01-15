import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SuccessStateProps {
  onCreateNew: () => void;
}

export const SuccessState = ({ onCreateNew }: SuccessStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-16 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight mb-3"
        >
          You're all set!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-muted-foreground max-w-sm mx-auto text-base"
        >
          Your application has been submitted successfully. We'll review it and get back to you shortly.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="space-y-4"
      >
        <Button
          onClick={onCreateNew}
          size="lg"
          className="gap-2 px-8   cursor-pointer              "
        >
          Create New Application
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="text-xs text-muted-foreground"
        >
          Start fresh with a new application form
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
