import { useGetCurrentUser, useUpdateProfile } from "@/api/UserApi";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateProfile();
  const { CurrentUser, isLoading: isGetLoading } = useGetCurrentUser();

  // Loading state
  if (isGetLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16 mb-5">
            <div className="absolute inset-0 rounded-2xl border-4 border-orange-100" />
            <div className="absolute inset-0 rounded-2xl border-4 border-orange-500 border-t-transparent animate-spin" />

            <div className="absolute inset-0 flex items-center justify-center">
              <UserRound className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900">
            Loading your profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Please wait a moment...
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (!CurrentUser) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-5">
            <UserRound className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Profile unavailable
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-6">
            We couldn't load your profile information. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-[40%] -left-40 w-80 h-80 bg-orange-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-7"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">
              <UserRound className="w-5 h-5 text-orange-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-bold text-orange-500">
                Account Settings
              </p>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Your Profile
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
            Keep your personal information up to date for a smooth and
            personalized ordering experience.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
          {/* Profile sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* User summary */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                    <UserRound className="w-9 h-9 text-white" />
                  </div>

                  <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h3 className="mt-4 font-bold text-gray-900 text-lg">
                  {CurrentUser.name || "Your Profile"}
                </h3>

                <p className="text-sm text-gray-500 mt-1 break-all">
                  {CurrentUser.email}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Account Protected
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Your information is secure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpful card */}
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-6 text-white">
              <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-orange-500/20 blur-2xl" />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>

                <h3 className="font-bold text-base">
                  Keep it updated
                </h3>

                <p className="text-xs text-gray-400 mt-2 leading-5">
                  Accurate contact and delivery details help us make your
                  ordering experience faster and easier.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
          >
            {/* Form header */}
            <div className="px-5 sm:px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update your details below.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-100">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-700">
                    Profile Active
                  </span>
                </div>
              </div>
            </div>

            {/* Existing form */}
            <div className="p-5 sm:p-8">
              <UserProfileForm
                currentUser={CurrentUser}
                onSave={updateUser}
                isLoading={isUpdateLoading}
              />
            </div>

            {/* Bottom security note */}
            <div className="mx-5 sm:mx-8 mb-6 sm:mb-8 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Your information stays protected
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  We use your profile information only to provide account,
                  delivery, and ordering services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;