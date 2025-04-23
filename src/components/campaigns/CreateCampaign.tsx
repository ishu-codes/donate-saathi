import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

// Form schema
const campaignSchema = z.object({
  name: z.string().min(5, "Campaign name must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  target: z.number().min(1000, "Target amount must be at least ₹1,000"),
  tag: z.string({
    required_error: "Please select a category",
  }),
  image_url: z.string().url("Please enter a valid image URL"),
});

// Available categories for campaigns
const CAMPAIGN_CATEGORIES = [
  "Education",
  "Healthcare",
  "Food",
  "Environment",
  "Water",
  "Children",
  "Elderly",
  "Disaster Relief",
  "Women Empowerment",
  "Animal Welfare",
];

const CreateCampaign = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      description: "",
      target: undefined,
      tag: "",
      image_url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof campaignSchema>) => {
    if (!user) {
      toast.error("Please log in to create a campaign");
      return;
    }

    setIsSubmitting(true);

    try {
      // This would normally submit to your backend
      console.log("Campaign data:", data);
      
      toast.success("Campaign submission received", {
        description: "Our team will review your campaign and get back to you shortly.",
      });

      // Navigate back to campaigns page
      setTimeout(() => {
        navigate("/donation-campaigns");
      }, 2000);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign", {
        description: "Please try again or contact our support team.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 py-16 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full grid grid-cols-12 opacity-20">
            {[...Array(120)].map((_, i) => (
              <div key={i} className="border-b border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="mt-10 relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            
            Start a Campaign
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
          </motion.p>
        </div>
      </section>

      {/* Policy Statement and Guidelines Section */}
      <section className="py-12 px-6 md:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <FaInfoCircle className="text-green-600 text-xl" />
              <h2 className="text-2xl font-bold text-gray-800">Campaign Policy & Guidelines</h2>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-md mb-8">
              <p className="text-gray-700">
                Before creating a campaign, please ensure your initiative complies with our guidelines. 
                Our team reviews all campaigns for authenticity and alignment with our mission.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Eligibility Requirements
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>You must be at least 18 years old or have guardian consent</li>
                  <li>Your campaign must serve a charitable, educational, or community purpose</li>
                  <li>You must be able to provide verification documents if requested</li>
                  <li>NGOs must provide valid registration and tax-exemption certificates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" /> Campaign Content Guidelines
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>All information must be accurate, honest, and transparent</li>
                  <li>Campaign goals and intended use of funds must be clearly stated</li>
                  <li>Images and media must be authentic and relevant to your cause</li>
                  <li>Content must not contain harmful, offensive, or discriminatory material</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-amber-500" /> Prohibited Campaigns
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Political campaigns or lobbying activities</li>
                  <li>Personal business ventures or profit-generating activities</li>
                  <li>Campaigns promoting illegal activities or harmful behaviors</li>
                  <li>Fundraising for legal defense or bail bonds</li>
                </ul>
              </div>

               
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Need assistance?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is here to help you create a successful campaign. Contact us for guidance, 
                  questions about the process, or any other assistance you might need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:campaign-support@donatesaathi.org" 
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <FaEnvelope /> campaign-support@donatesaathi.org
                  </a>
                  <a 
                    href="tel:+918005559999" 
                    className="flex items-center gap-2 text-green-600 hover:text-green-700"
                  >
                    <FaPhone /> +91 800 555 9999
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CreateCampaign; 