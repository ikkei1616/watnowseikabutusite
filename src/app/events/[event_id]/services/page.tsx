"use client";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import ServiceCard2 from "@/components/ServiceCard2";
import EventHeader from "@/components/EventHeader";
import ServicesContainer from "@/components/ServicesContainer";
import { EventAllService } from "@/types/Service";




const EventServices = ({ params }: { params: { event_id: string } }) => {
  const [eventId] = useState<string>(params.event_id);
  const [eventName, setEventName] = useState<string>("");
  const [test, setTest] = useState<EventAllService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) {
        console.log("eventID error", eventId);
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select("id, name , image, description, award_id, awards (id,name)")
        .eq("event_id", eventId)
        .returns<EventAllService[]>();

      if (error) {
        console.log("error", error);
        return;
      }

      setTest(data || []);
    };

    const fetchEventName = async () => {
      const { data: eventName, error } = await supabase
        .from("events")
        .select("name")
        .eq("id", eventId);

      if (error) {
        console.log("event name fetch error", error);
        return;
      }
      // setEventName(eventName as EventName[] || [])
      setEventName(eventName[0].name || "");
    };

    fetchEventName();
    fetchData();
  }, [eventId]);

  return (
    <>
      <EventHeader title={eventName} eventId={eventId}></EventHeader>
      {/* <EventHeader title={eventName[0].name} eventId={eventId}></EventHeader> */}
      <ServicesContainer>
        {test.map((service) => (
          <ServiceCard2 key={service.id} service={service}></ServiceCard2>
        ))}
      </ServicesContainer>
    </>
  );
};
export default EventServices;
