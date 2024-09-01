"use client";

import React from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/components/EventForm";

const NewEventPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/events/existing-events");
  };

  return (
    <div>
      <EventForm isEditing={false} onSuccess={handleSuccess} />
    </div>
  );
};

export default NewEventPage;
