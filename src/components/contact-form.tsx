import { useState } from "react";

interface FormData {
  emailOrPhone: string;
  fullName: string;
}

const GOOGLE_FORM_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzQP9PWGWzvbfA4htYNAXh4b3NsqtpxWmdJ4uHWCPmiupb2mCAbA4jilS-P242OCNwM/exec"; // 👈 Replace this

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    emailOrPhone: "",
    fullName: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Partial<FormData> = {};
    if (!formData.emailOrPhone) errors.emailOrPhone = "Required";
    if (!formData.fullName) errors.fullName = "Required";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("Sending...");

    const postData = new URLSearchParams();
    postData.append("emailOrPhone", formData.emailOrPhone);
    postData.append("fullName", formData.fullName);

    try {
      const response = await fetch(GOOGLE_FORM_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: postData.toString(),
      });

      if (response.ok) {
        setStatus("Form submitted successfully!");
        setFormData({ emailOrPhone: "", fullName: "" });
        setFormErrors({});
      } else {
        setStatus("Failed to submit. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <div className="contact-container px-2.5 py-10 gap-11 flex flex-col justify-center items-center">
      <h4 className="contact-title">Programeaza-ti prima consultatie</h4>

      <form
        onSubmit={handleSubmit}
        className="w-2xs gap-6 flex flex-col justify-center items-center"
        noValidate
      >
        <div className="w-full">
          <input
            placeholder="Email/Numarul de telefon"
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            className={`form-input p-2.5 h-14 w-full ${
              formErrors.emailOrPhone ? "border-red-500" : ""
            }`}
          />
          {formErrors.emailOrPhone && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.emailOrPhone}
            </p>
          )}
        </div>

        <div className="w-full mb-5">
          <input
            placeholder="Numele Deplin"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-input p-2.5 h-14 w-full ${
              formErrors.fullName ? "border-red-500" : ""
            }`}
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
          )}
        </div>

        <button
          type="submit"
          className="form-btn px-9 py-4 flex justify-center items-center gap-2"
        >
          Trimite Detalii
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3.75 10.5L8.25 6L3.75 1.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {status && <p className="text-sm mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
