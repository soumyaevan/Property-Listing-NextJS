"use client";
import addMessage, { AddMessageState } from "@/app/actions/addMessage";
import { PropertyType } from "@/types";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
    >
      <Send className="mr-2" />
      {pending ? "Submitting..." : "Send Message"}
    </button>
  );
}

function PendingHandler() {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      toast.info("Sending message...");
    }
  }, [pending]);

  return null;
}

const PropertyContactForm = ({ property }: { property: PropertyType }) => {
  const { data: session } = useSession();
  const initialState: AddMessageState = { submitted: false };
  const [state, formAction] = useActionState(addMessage, initialState);
  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  useEffect(() => {
    if (state.submitted) toast.success("Message sent successfully");
  }, [state.submitted]);

  if (state.submitted) {
    return <p className="text-green-500 mb-4">Your message is sent</p>;
  }
  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          <PendingHandler />
          <input
            type="hidden"
            name="property"
            id="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            name="recipient"
            id="recipient"
            defaultValue={property.owner}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
