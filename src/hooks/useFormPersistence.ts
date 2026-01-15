
import type { FullFormData } from "@/lib/formSchema";
import { useCallback } from "react";

const STORAGE_KEY = "job_application_form";

export interface FormState {
  currentStep: number;
  data: Partial<FullFormData>;
  lastUpdated: string;
}

export const useFormPersistence = () => {
  const loadFormState = useCallback((): FormState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading form state:", error);
    }
    return null;
  }, []);

  const saveFormState = useCallback((state: FormState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        lastUpdated: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error saving form state:", error);
    }
  }, []);

  const clearFormState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing form state:", error);
    }
  }, []);

  return {
    loadFormState,
    saveFormState,
    clearFormState,
  };
};
