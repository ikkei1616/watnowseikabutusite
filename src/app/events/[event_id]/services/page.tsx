"use client";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import ServiceAwardCard from "@/components/ServiceAwardCard";
import Header from "@/components/Header";
import EventHeader from "@/components/EventHeader";
import ServicesContainer from "@/components/ServicesContainer";
import { EventAllService } from "@/types/Service";
import { HeaderMode } from "@/types/HeaderMode";
import { Box, Typography } from "@mui/material";
import styles from "./page.module.css";
import  LoadingModal  from "@/components/loading/LoadingModal";



const EventServices = ({ params }: { params: { event_id: string } }) => {
  const [eventId] = useState<string>(params.event_id);
  const [eventName, setEventName] = useState<string|null>("");
  const [test, setTest] = useState<EventAllService[]>([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) {
        console.log("eventID error", eventId);
        return;
      }

      const { data:eventData, error:eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId);

        if (!eventData || eventData?.length === 0) {
          console.log("Error fetching event data:", eventError?.message);
          setEventName(null);
          setIsLoading(false)
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
      if (eventName && eventName.length > 0) {
        setEventName(eventName[0].name || "");
        setIsLoading(false);
      }
    };

    fetchEventName();
    fetchData();
  }, [eventId]);

  if (isLoading) {
    return <LoadingModal isOpen={true}></LoadingModal>
  }

  if (!eventName) {
    return (
      <>
        <Header mode={HeaderMode.SERVICES}></Header>
        <Box
          sx={{
            width:"100%",
            height:"100vh",
            display:"grid",
            placeItems:"center",
          }}
        >
          <p className={styles.notFound}>イベントが見つかりませんでした！</p>
        </Box> 
      </>
      
    )
  }

  if (test.length === 0) {
    return (
      <>
        <Header mode={HeaderMode.SERVICES}></Header>
        <EventHeader title={eventName} eventId={eventId}></EventHeader>
        <Box
          sx={{
            width:"100%",
            height:"50vh",
            display:"grid",
            placeItems:"center",
          }}
        >
          <p className={styles.notFound}>サービスが見つかりませんでした！</p>
        </Box> 
      </>
      
    )

  }


  return (
    <>
      <Header mode={HeaderMode.SERVICES}></Header>
      <EventHeader title={eventName} eventId={eventId}></EventHeader>
      {/* <EventHeader title={eventName[0].name} eventId={eventId}></EventHeader> */}
      <ServicesContainer>
        {test.map((service) => (
          <ServiceAwardCard key={service.id} service={service}></ServiceAwardCard>
        ))}
      </ServicesContainer>
    </>
  );
};
export default EventServices;
