"use client";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import { Service } from "@/types/Service";
import ServiceCard2 from "@/components/ServiceCard2";
import PageHeader from "@/components/PageHeader";
import EventHeader from "@/components/EventHeader";
import Box from "@mui/material/Box";
import {EventName} from "@/types/Event";
import styles from "./page.module.css";
import { useTheme } from '@mui/material/styles';





const EventServices = ({ params }: { params: { event_id: string } }) => {
  const [eventId] = useState<string>(params.event_id);
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [eventName, setEventName] = useState<string>("");
  const [isAward, setIsAward] = useState(false);
  const theme = useTheme(); // 現在のテーマを取得

  // const [eventName, setEventName] = useState<EventName[]>([])

  useEffect(() => {
    const fetchServiceData = async () => {
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("id, name , image, description, award_id")
        .eq("event_id", eventId);

      if (fetchError) {
        console.log("fetch Error", fetchError);
        return;
      }
      setServiceData(data as Service[] || []);
    };

    const fetchEventName = async ()=> {
      const { data:eventName ,error} = await supabase
        .from("events")
        .select("name")
        .eq("id",eventId);

      if (error) {
        console.log("event name fetch error", error)
        return;
      }
      console.log(eventName[0].name);
      // setEventName(eventName as EventName[] || [])
      setEventName(eventName[0].name || "");
    }

    fetchEventName();
    fetchServiceData();
  }, []);

  useEffect(()=>{
    serviceData.forEach((service)=>{
      if (service.award_id !== null)
        setIsAward(true);
        console.log(service.award_id)
    });
  },[serviceData]);


  return (
    <>
      <EventHeader title={eventName} eventId={eventId}></EventHeader>
      {/* <EventHeader title={eventName[0].name} eventId={eventId}></EventHeader> */}
      { isAward && (
        <Box className={styles.awardTitle}>
          受賞プロダクト
        </Box>
        )
      }
      <Box className={styles.cardList} >
        {serviceData.map((service)=>(
          service.award_id !== null ? (      
              <ServiceCard2 key={service.id }service={service} color={"#F3DF85"} ></ServiceCard2>
          ) : (        
              <ServiceCard2 key={service.id} service={service} color={"#85D5F3"}></ServiceCard2>
          )
        ))}
      </Box>
    </>
  );
};
export default EventServices;
