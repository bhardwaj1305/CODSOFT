import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Check, ArrowRight, ArrowLeft, Mail, Lock, User, MapPin, Heart } from "lucide-react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  interests: string[];
};

const INTERESTS = [
  "Technology",
  "Design",
  "Music",
  "Sports",
  "Travel",
  "Food",
  "Photography",
  "Reading",
];

export function SignupFlow() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    interests: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        }
        break;

      case 2:
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        break;

      case 3:
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;

      case 4:
        if (!formData.location.trim()) {
          newErrors.location = "Location is required";
        }
        if (formData.interests.length === 0) {
          newErrors.interests = "Please select at least one interest";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (mode === "signin") {
      toast.success(`Welcome back! 👋`, {
        description: "You've been signed in successfully.",
      });
    } else {
      toast.success(`Welcome, ${formData.name}! 🎉`, {
        description: "Your account has been created successfully.",
      });
    }
    // Reset form
    setTimeout(() => {
      setStep(1);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        interests: [],
      });
    }, 2000);
  };

  const handleSignIn = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit();
    }
  };

  const toggleMode = () => {
    setMode(mode === "signup" ? "signin" : "signup");
    setStep(1);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      interests: [],
    });
    setErrors({});
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    // Clear error when user selects an interest
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const goToNext = () => {
    setDirection(1);
    handleNext();
  };

  const goToBack = () => {
    setDirection(-1);
    handleBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {mode === "signin"
                  ? "Welcome Back"
                  : step === totalSteps
                    ? "Almost there!"
                    : "Create Account"}
              </h1>
              {mode === "signup" && (
                <div className="text-sm text-gray-500">
                  Step {step} of {totalSteps}
                </div>
              )}
            </div>
            {mode === "signup" && <Progress value={progress} className="h-2" />}
          </div>

          {/* Form Steps */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              {mode === "signin" ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600">Sign in to your account</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <button className="text-xs text-purple-600 hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSignIn();
                        }
                      }}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                </motion.div>
              ) : step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-gray-600">Let's get to know you!</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">What's your name?</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      Hi {formData.name.split(" ")[0]}! What's your email?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Lock className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-gray-600">Keep your account secure</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword)
                          setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                      <Heart className="w-8 h-8 text-pink-600" />
                    </div>
                    <p className="text-gray-600">
                      Tell us about yourself, {formData.name.split(" ")[0]}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: undefined });
                      }}
                      className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>What are you interested in?</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            formData.interests.includes(interest)
                              ? "bg-purple-100 border-purple-500 text-purple-700"
                              : "bg-white border-gray-200 text-gray-700 hover:border-purple-300"
                          }`}
                        >
                          {formData.interests.includes(interest) && (
                            <Check className="inline w-4 h-4 mr-1" />
                          )}
                          {interest}
                        </button>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-sm text-red-500">{errors.interests}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {mode === "signup" && step > 1 && (
              <Button
                variant="outline"
                onClick={goToBack}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={mode === "signin" ? handleSignIn : goToNext}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {mode === "signin" ? (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : step === totalSteps ? (
                <>
                  Complete
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-purple-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-purple-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
