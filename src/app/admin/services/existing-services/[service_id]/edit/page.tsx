"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "../../../new/serviceFormSchema";
import { useFormFields, FormField, EventData, AwardData, MenberData, TechData } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

type serviceTableData = {
    id: number;
    name: string;
    comment: string;
    description: string;
    team_name: string;
    release_year: number;
    release_month: number;
    development_period_num: number;
    development_period_unit: string;
    eventYear: number;
    event_id: number | null;
    award_id: number | null;
    image: string;
    video: string;
    is_visible: boolean;
}

type serviceMemberData = string;

type serviceTechsData = number;

const NewServicesPage = ({
    params,
}: {
    params: { service_id: string };
}) => {
    const { control, handleSubmit, reset, getValues } = useForm<ServiceInputSchema>({
        mode: "onChange",
        resolver: resolver,
        // defaultValues: {
        //     name: "",
        //     comment: "",
        //     description: "",
        //     team_name: "",
        //     release_year: 0,
        //     release_month: 0, 
        //     development_period_num: 0,
        //     development_period_unit: "",
        //     teamMembers: [],
        //     technologiesId: [],
        //     eventYear: 0,
        //     event_id: 0,
        //     award_id: 0,
        //     url_web: "",
        //     url_appstore: "",
        //     url_googleplay: "",
        //     url_others: "",
        //     thumbnailImage: undefined,
        //     demoVideo: undefined,
        //     is_visible: true,
        //     },
    });

    const serviceID = params.service_id;
    const router = useRouter();

    const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<ServiceInputSchema>[] }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [imageDataURL, setImageDataURL] = useState<string | undefined>(undefined);
    const [checkImageDataURL, setCheckImageDataURL] = useState<string | undefined>(undefined);
    const [videoDataURL, setVideoDataURL] = useState<string | undefined>(undefined);
    const [checkVideoDataURL, setCheckVideoDataURL] = useState<string | undefined>(undefined);

    const eventsRef = useRef<EventData[]>([]);
    const awardsRef = useRef<AwardData[]>([]);
    const menbersRef = useRef<MenberData[]>([]);
    const techsRef = useRef<TechData[]>([]);

    const [checkTecksData, setCheckTecksData] = useState<number[]>([]);
    const [checkMembersData, setCheckMembersData] = useState<string[]>([]);
    const [checkWebURL, setCheckWebURL] = useState<string | undefined>(undefined);
    const [checkAppURL, setCheckAppURL] = useState<string | undefined>(undefined);
    const [checkGoogleURL, setCheckGoogleURL] = useState<string | undefined>(undefined);
    const [checkOtherURL, setCheckOtherURL] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const { data: eventsData, error: eventsError } = await supabase
                    .from('events')
                    .select('id, name')
                    .order('id', { ascending: true });

                if (eventsError) {
                    throw new Error(`Error fetching events: ${eventsError.message}`);
                }
                const Events = eventsData.map((event) => ({ value: event.id, label: event.name }));
                return Events || [];

            } catch (error) {
                return [];
            }
        };

        const fetchAwardsData = async () => {
            try {
                const { data: awardsData, error: awardsError } = await supabase
                    .from('awards')
                    .select('id, name')
                    .order('id', { ascending: true });

                if (awardsError) {
                    throw new Error(`Error fetching awards: ${awardsError.message}`);
                }
                const Awards = awardsData.map((award) => ({ value: award.id, label: award.name }));
                return Awards || [];
            } catch (error) {
                return [];
            }
        };

        const fetchMenbersData = async () => {
            try {
                const { data: menbersData, error: menbersError } = await supabase
                    .from('users')
                    .select('id, name, nickname')

                if (menbersError) {
                    throw new Error(`Error fetching menbers: ${menbersError.message}`);
                }
                const Menbers = menbersData.map((menber) => ({ value: menber.id, label: `${menber.name}　(${menber.nickname})` }));
                return Menbers || [];
            } catch (error) {
                return [];
            }
        };

        const fetchTechsData = async () => {
            try {
                const { data: techsData, error: techsError } = await supabase
                    .from('technologies')
                    .select('id, name')

                if (techsError) {
                    throw new Error(`Error fetching techs: ${techsError.message}`);
                }

                const Techs = techsData.map((tech) => ({ value: tech.id, label: tech.name }));
                return Techs || [];
            } catch (error) {
                return [];
            }
        };

        const fetchServiceData = async () => {
            try {
                const { data: serviceData, error: serviceError } = await supabase
                    .from('services')
                    .select("*")
                    .eq("id", serviceID)
                    .single();

                if (serviceError) {
                    throw new Error(`Error fetching services: ${serviceError.message}`);
                }

                if (serviceData.image) {
                    const splitURl = serviceData.image.split('/');
                    const fileName = splitURl[splitURl.length - 1];
                    setCheckImageDataURL(fileName);
                }
                if (serviceData.video) {
                    const splitURl = serviceData.video.split('/');
                    const fileName = splitURl[splitURl.length - 1];
                    setCheckVideoDataURL(fileName);
                }

                if (serviceData.event_id) {
                    try {
                        const { data: eventYearData, error: eventYearError } = await supabase
                            .from('events')
                            .select('year')
                            .order('id', { ascending: true })
                            .eq('id', serviceData.event_id);

                        if (eventYearError) {
                            throw new Error(`Error fetching events: ${eventYearError.message}`);
                        }
                        serviceData.eventYear = eventYearData[0].year;
                    }
                    catch (error) {
                        console.error(error);
                    }
                }

                return serviceData || {};
            } catch (error) {
                return {};
            }
        }

        const fetchServiceMembersData = async () => {
            try {
                const { data: serviceMembersData, error: serviceMembersError } = await supabase
                    .from('users_servicies')
                    .select('user_id')
                    .eq('service_id', serviceID);

                if (serviceMembersError) {
                    throw new Error(`Error fetching service members: ${serviceMembersError.message}`);
                }

                const ServiceMembers = serviceMembersData.map((serviceMember) => serviceMember.user_id);
                return ServiceMembers || [];
            } catch (error) {
                return [];
            }
        }

        const fetchServiceTechnologiesData = async () => {
            try {
                const { data: serviceTechnologiesData, error: serviceTechnologiesError } = await supabase
                    .from('services_technologies')
                    .select('technology_id')
                    .eq('service_id', serviceID);

                if (serviceTechnologiesError) {
                    throw new Error(`Error fetching service technologies: ${serviceTechnologiesError.message}`);
                }

                const ServiceTechnologies = serviceTechnologiesData.map((serviceTechnology) => serviceTechnology.technology_id);
                return ServiceTechnologies || [];
            } catch (error) {
                return [];
            }
        }

        const fetchurlWebData = async () => {
            try {
                const { data: urlWebData, error: urlWebError } = await supabase
                    .from('url_website')
                    .select('url')
                    .eq('service_id', serviceID);

                if (urlWebError) {
                    throw new Error(`Error fetching url_website: ${urlWebError.message}`);
                }

                return urlWebData[0]?.url || "";
            } catch (error) {
                return "";
            }
        }

        const fetchurlAppStoreData = async () => {
            try {
                const { data: urlAppStoreData, error: urlAppStoreError } = await supabase
                    .from('url_app_store')
                    .select('url')
                    .eq('service_id', serviceID);

                if (urlAppStoreError) {
                    throw new Error(`Error fetching url_app_store: ${urlAppStoreError.message}`);
                }

                return urlAppStoreData[0]?.url || "";
            } catch (error) {
                return "";
            }
        }

        const fetchurlGooglePlayData = async () => {
            try {
                const { data: urlGooglePlayData, error: urlGooglePlayError } = await supabase
                    .from('url_google_play')
                    .select('url')
                    .eq('service_id', serviceID);

                if (urlGooglePlayError) {
                    throw new Error(`Error fetching url_google_play: ${urlGooglePlayError.message}`);
                }

                return urlGooglePlayData[0]?.url || "";
            } catch (error) {
                return "";
            }
        }

        const fetchurlOthersData = async () => {
            try {
                const { data: urlOthersData, error: urlOthersError } = await supabase
                    .from('url_others')
                    .select('url')
                    .eq('service_id', serviceID);

                if (urlOthersError) {
                    throw new Error(`Error fetching url_others: ${urlOthersError.message}`);
                }

                return urlOthersData[0]?.url || "";
            } catch (error) {
                return "";
            }
        }

        const fetchData = async () => {
            try {
                const [events, awards, members, techs, serviceData, serviceMembers, serviceTechs, webURL, appURL, googleURL, otherURL]: [EventData[], AwardData[], MenberData[], TechData[], serviceTableData | undefined, serviceMemberData[], serviceTechsData[], string, string, string, string] = await Promise.all([fetchEventsData(), fetchAwardsData(), fetchMenbersData(), fetchTechsData(), fetchServiceData(), fetchServiceMembersData(), fetchServiceTechnologiesData(), fetchurlWebData(), fetchurlAppStoreData(), fetchurlGooglePlayData(), fetchurlOthersData()]);
                setFormFields(useFormFields(control, events, awards, members, techs, serviceData?.image ? `${serviceData?.image}?${new Date().getTime()}` : undefined, serviceData?.video ? `${serviceData?.video}?${new Date().getTime()}` : undefined, onChangeEventYear, onChangeEvent));
                reset({
                    name: serviceData?.name || "",
                    comment: serviceData?.comment || "",
                    description: serviceData?.description || "",
                    team_name: serviceData?.team_name || "",
                    release_year: serviceData?.release_year || 0,
                    release_month: serviceData?.release_month || 0,
                    development_period_num: serviceData?.development_period_num || 0,
                    development_period_unit: serviceData?.development_period_unit || "",
                    teamMembers: serviceMembers || [],
                    technologiesId: serviceTechs || [],
                    eventYear: serviceData?.eventYear || 0,
                    event_id: serviceData?.event_id || null,
                    award_id: serviceData?.award_id || null,
                    url_web: webURL || "",
                    url_appstore: appURL || "",
                    url_googleplay: googleURL || "",
                    url_others: otherURL || "",
                    thumbnailImage: undefined,
                    demoVideo: undefined,
                    is_visible: serviceData?.is_visible || true,
                });
                eventsRef.current = events;
                awardsRef.current = awards;
                menbersRef.current = members;
                techsRef.current = techs;
                setImageDataURL(serviceData?.image);
                setVideoDataURL(serviceData?.video);
                setCheckTecksData(serviceTechs);
                setCheckMembersData(serviceMembers);
                setCheckWebURL(webURL);
                setCheckAppURL(appURL);
                setCheckGoogleURL(googleURL);
                setCheckOtherURL(otherURL);
                onChangeEventYear(serviceData?.eventYear?.toString() || "", true);
                onChangeEvent(serviceData?.event_id?.toString() || "");

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        fetchServiceData();
    }, []);

    const onChangeEventYear = async (item: string, isFirst?: boolean) => {
        try {
            const { data: eventsData, error: eventsError } = await supabase
                .from('events')
                .select('id, name')
                .order('id', { ascending: true })
                .eq('year', item);

            if (eventsError) {
                throw new Error(`Error fetching events: ${eventsError.message}`);
            }
            eventsRef.current = eventsData.map((event) => ({ value: event.id, label: event.name }));
            if (isFirst === undefined) {
                console.log(getValues());
                reset({ ...getValues(), event_id: null, award_id: null });
            }
            setFormFields(useFormFields(control, eventsRef.current, [], menbersRef.current, techsRef.current, "", "", onChangeEventYear, onChangeEvent));
        }
        catch (error) {
            console.error(error);
        }
    }

    const onChangeEvent = async (item: string) => {
        try {
            const { data: awardsData, error: awardsError } = await supabase
                .from('awards')
                .select('id, name')
                .order('id', { ascending: true })
                .eq('event_id', item);

            if (awardsError) {
                throw new Error(`Error fetching awards: ${awardsError.message}`);
            }

            awardsRef.current = awardsData.map((award) => ({ value: award.id, label: award.name }));
            setFormFields(useFormFields(control, eventsRef.current, awardsRef.current, menbersRef.current, techsRef.current, "", "", onChangeEventYear, onChangeEvent));
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        const confirmDelete = window.confirm("編集内容が破棄されますがよろしいですか？");

        if (!confirmDelete) {
            return;
        }
        router.push('/admin/services/existing-services');
    }

    const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
        setIsLoading(true);
        console.log(data);

        let imageUrl = '';
        let videoUrl = '';

        if (data.thumbnailImage instanceof File) {
            const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            if (checkImageDataURL) {
                const { error: uploadError } = await supabase.storage
                    .from('service_images')
                    .update(checkImageDataURL, data.thumbnailImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: uploadError } = await supabase.storage
                    .from('service_images')
                    .upload(imageFileName, data.thumbnailImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            }

            const { data: publicImageUrlData } = await supabase.storage
                .from('service_images')
                .getPublicUrl(checkImageDataURL ? checkImageDataURL : imageFileName);

            imageUrl = publicImageUrlData.publicUrl || '';
        }

        if (data.demoVideo instanceof File) {
            const videoFileName = encodeURIComponent(`${Date.now()}-${data.demoVideo.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            if (checkVideoDataURL) {
                const { error: uploadError } = await supabase.storage
                    .from('service_videos')
                    .update(checkVideoDataURL, data.demoVideo);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: uploadError } = await supabase.storage
                    .from('service_videos')
                    .upload(videoFileName, data.demoVideo);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            }

            const { data: publicVideoUrlData } = await supabase.storage
                .from('service_videos')
                .getPublicUrl(checkVideoDataURL ? checkVideoDataURL : videoFileName);

            videoUrl = publicVideoUrlData.publicUrl || '';
        }

        const { thumbnailImage, demoVideo, eventYear, teamMembers, url_web, url_appstore, url_googleplay, url_others, technologiesId, ...rest } = data;
        if (imageDataURL && imageUrl === '') {
            console.log("egejeogjeogjeogjeogjeo")
            imageUrl = imageDataURL;
        }
        if (videoDataURL && videoUrl === '') {
            videoUrl = videoDataURL;
        }
        const submitData = { ...rest, image: imageUrl, video: videoUrl };

        const { data: serviceData, error: insertError } = await supabase
            .from('services')
            .update([submitData])
            .eq('id', serviceID)
            .select();

        if (insertError) {
            console.error('Error inserting service:', insertError);
            window.alert(insertError.message);
            setIsLoading(false);
            return;
        }

        if (data.teamMembers && data.teamMembers.length > 0) {
            if (checkMembersData.length > 0) {
                const { error: deleteError } = await supabase
                    .from('users_servicies')
                    .delete()
                    .eq('service_id', serviceID);

                if (deleteError) {
                    console.error('Error deleting team members:', deleteError);
                    window.alert(deleteError.message);
                    setIsLoading(false);
                    return;
                }

                const { error: teamMembersError } = await supabase
                    .from('users_servicies')
                    .insert(data.teamMembers.map((teamMember) => ({
                        service_id: serviceID,
                        user_id: teamMember,
                    })));

                if (teamMembersError) {
                    console.error('Error inserting team members:', teamMembersError);
                    window.alert(teamMembersError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: teamMembersError } = await supabase
                    .from('users_servicies')
                    .insert(data.teamMembers.map((teamMember) => ({
                        service_id: serviceData[0].id,
                        user_id: teamMember,
                    })));

                if (teamMembersError) {
                    console.error('Error inserting team members:', teamMembersError);
                    window.alert(teamMembersError.message);
                    setIsLoading(false);
                    return;
                }
            }
        }

        if (data.technologiesId && data.technologiesId.length > 0) {
            if (checkTecksData.length > 0) {
                const { error: deleteError } = await supabase
                    .from('services_technologies')
                    .delete()
                    .eq('service_id', serviceID);

                if (deleteError) {
                    console.error('Error deleting techs:', deleteError);
                    window.alert(deleteError.message);
                    setIsLoading(false);
                    return;
                }

                const { error: techsError } = await supabase
                    .from('services_technologies')
                    .insert(data.technologiesId.map((technology) => ({
                        service_id: serviceID,
                        technology_id: technology,
                    })));

                if (techsError) {
                    console.error('Error inserting techs:', techsError);
                    window.alert(techsError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: techsError } = await supabase
                    .from('services_technologies')
                    .insert(data.technologiesId.map((technology) => ({
                        service_id: serviceData[0].id,
                        technology_id: technology,
                    })));

                if (techsError) {
                    console.error('Error inserting techs:', techsError);
                    window.alert(techsError.message);
                    setIsLoading(false);
                    return;
                }
            }
        }

        if (checkWebURL) {
            if (url_web === "") {
                const { error: urlWebError } = await supabase
                    .from('url_website')
                    .delete()
                    .eq('service_id', serviceID);

                if (urlWebError) {
                    console.error('Error inserting url_web:', urlWebError);
                    window.alert(urlWebError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: urlWebError } = await supabase
                    .from('url_website')
                    .update([{ url: url_web }])
                    .eq('service_id', serviceID);

                if (urlWebError) {
                    console.error('Error inserting url_web:', urlWebError);
                    window.alert(urlWebError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (url_web) {
            const { error: urlWebError } = await supabase
                .from('url_website')
                .insert([{ service_id: serviceData[0].id, url: url_web }]);

            if (urlWebError) {
                console.error('Error inserting url_web:', urlWebError);
                window.alert(urlWebError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkAppURL) {
            if (url_appstore === "") {
                const { error: urlAppStoreError } = await supabase
                    .from('url_app_store')
                    .delete()
                    .eq('service_id', serviceID);

                if (urlAppStoreError) {
                    console.error('Error inserting url_app:', urlAppStoreError);
                    window.alert(urlAppStoreError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: urlAppStoreError } = await supabase
                    .from('url_app_store')
                    .update([{ url: url_appstore }])
                    .eq('service_id', serviceID);

                if (urlAppStoreError) {
                    console.error('Error inserting url_app:', urlAppStoreError);
                    window.alert(urlAppStoreError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (url_appstore) {
            const { error: urlAppStoreError } = await supabase
                .from('url_app_store')
                .insert([{ service_id: serviceData[0].id, url: url_appstore }]);

            if (urlAppStoreError) {
                console.error('Error inserting url_app:', urlAppStoreError);
                window.alert(urlAppStoreError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkGoogleURL) {
            if (url_googleplay === "") {
                const { error: urlGooglePlayError } = await supabase
                    .from('url_google_play')
                    .delete()
                    .eq('service_id', serviceID);

                if (urlGooglePlayError) {
                    console.error('Error inserting url_google:', urlGooglePlayError);
                    window.alert(urlGooglePlayError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: urlGooglePlayError } = await supabase
                    .from('url_google_play')
                    .update([{ url: url_googleplay }])
                    .eq('service_id', serviceID);

                if (urlGooglePlayError) {
                    console.error('Error inserting url_google:', urlGooglePlayError);
                    window.alert(urlGooglePlayError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (url_googleplay) {
            const { error: urlGooglePlayError } = await supabase
                .from('url_google_play')
                .insert([{ service_id: serviceData[0].id, url: url_googleplay }]);

            if (urlGooglePlayError) {
                console.error('Error inserting url_google:', urlGooglePlayError);
                window.alert(urlGooglePlayError.message);
                setIsLoading(false);
                return;
            }
        }

        if (checkOtherURL) {
            if (url_others === "") {
                const { error: urlOthersError } = await supabase
                    .from('url_others')
                    .delete()
                    .eq('service_id', serviceID);

                if (urlOthersError) {
                    console.error('Error inserting url_others:', urlOthersError);
                    window.alert(urlOthersError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: urlOthersError } = await supabase
                    .from('url_others')
                    .update([{ url: url_others }])
                    .eq('service_id', serviceID);

                if (urlOthersError) {
                    console.error('Error inserting url_others:', urlOthersError);
                    window.alert(urlOthersError.message);
                    setIsLoading(false);
                    return;
                }
            }
        } else if (url_others) {
            const { error: urlOthersError } = await supabase
                .from('url_others')
                .insert([{ service_id: serviceData[0].id, url: url_others }]);

            if (urlOthersError) {
                console.error('Error inserting url_others:', urlOthersError);
                window.alert(urlOthersError.message);
                setIsLoading(false);
                return;
            }
        }

        router.push('/admin/services/existing-services');
    };



    return (
        <>
            <LoadingModal isOpen={isLoading} />
            <main style={{
                width: "90%",
                margin: "0 auto",
            }
            }>
                <AdminHeader isEditing />
                <h1 style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "12px",
                    marginBottom: "12px",
                }}>新規サービスページ作成</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formFields.map(({ title, fields }, index) => (
                        <section key={index} style={{
                            borderBottom: "1px solid var(--border)",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                        }}>
                            <h3>{title}</h3>
                            {fields.map((field) => (
                                <FormFactory<ServiceInputSchema> key={field.id} {...field} />
                            ))}
                        </section>
                    ))}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '60px',
                        margin: "20px 0"
                    }}>
                        <FormButton name="キャンセル" type='cancel' onClick={handleCancel} />
                        <FormButton name="新規作成" type='submit' />
                    </div>
                </form>
            </main>
        </>
    );
};

export default NewServicesPage;
