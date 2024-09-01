"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { EventDetail } from "@/types/Event";
import type { Award } from "@/types/Award";
import EventForm from "@/components/EventForm";

export default function EventEditPage({
  params,
}: {
  params: { event_id: string };
}) {
  const eventID = params.event_id;
  const router = useRouter();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventID) {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("id", eventID)
          .single();
        if (eventError) {
          console.error("Error fetching awards data:", eventError);
          return;
        }
        if (!eventData) {
          console.error("Error! data could not be found");
          return;
        }

        //賞のリストを取得
        const { data: awardsData, error: awardsError } = await supabase
          .from("awards")
          .select("*")
          .eq("event_id", eventID)
          .order("order_num", { ascending: true }); //order_numを昇順にソート

        if (awardsError) {
          console.error("Error fetching awards data:", awardsError);
          return;
        }

        setEvent({
          ...eventData,
          awards: awardsData || [],
        });
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventID]);

  const handleSuccess = () => {
    router.push("/events");
  };

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div>
      {event && (
        <EventForm
          initialEvent={event}
          isEditing={true}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
