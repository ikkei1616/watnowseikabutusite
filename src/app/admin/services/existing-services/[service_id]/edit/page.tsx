"use client";
import React, { useState, useEffect } from 'react';
import { set, SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "../../../new/serviceFormSchema";
import { useFormFields, FormField, EventData, AwardData, MenberData, TechData } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

const NewServicesPage = () => {
    const { control, handleSubmit, reset } = useForm<ServiceInputSchema>({
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

    const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<ServiceInputSchema>[] }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

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

        const fetchData = async () => {
            try {
                const [events, awards, members, techs]: [EventData[], AwardData[], MenberData[], TechData[]] = await Promise.all([fetchEventsData(), fetchAwardsData(), fetchMenbersData(), fetchTechsData()]);
                setFormFields(useFormFields(control, events, awards, members, techs));

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
        setIsLoading(true);

        let imageUrl = '';
        let videoUrl = '';

        if (data.thumbnailImage instanceof File) {
            const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            const { error: uploadError } = await supabase.storage
                .from('service_images')
                .upload(imageFileName, data.thumbnailImage);

            if (uploadError) {
                console.error('Error uploading file: ', uploadError.message);
                window.alert(uploadError.message);
                setIsLoading(false);
                return;
            }

            const { data: publicImageUrlData } = await supabase.storage
                .from('service_images')
                .getPublicUrl(imageFileName);

            imageUrl = publicImageUrlData.publicUrl || '';
        }

        if (data.demoVideo instanceof File) {
            const videoFileName = encodeURIComponent(`${Date.now()}-${data.demoVideo.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            const { error: uploadError } = await supabase.storage
                .from('service_videos')
                .upload(videoFileName, data.demoVideo);

            if (uploadError) {
                console.error('Error uploading file: ', uploadError.message);
                window.alert(uploadError.message);
                setIsLoading(false);
                return;
            }

            const { data: publicVideoUrlData } = await supabase.storage
                .from('service_videos')
                .getPublicUrl(videoFileName);

            videoUrl = publicVideoUrlData.publicUrl || '';
        }

        const { thumbnailImage, demoVideo, eventYear, teamMembers, url_web, url_appstore, url_googleplay, url_others, technologiesId, ...rest } = data;
        const submitData = { ...rest, image: imageUrl, video: videoUrl };

        const { data: serviceData, error: insertError } = await supabase
            .from('services')
            .insert([submitData])
            .select();

        if (insertError) {
            console.error('Error inserting service:', insertError);
            window.alert(insertError.message);
            setIsLoading(false);
            return;
        }

        if (data.teamMembers && data.teamMembers.length > 0) {
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

        if (data.technologiesId && data.technologiesId.length > 0) {
            const { error: technologiesError } = await supabase
                .from('services_technologies')
                .insert(data.technologiesId.map((technologyId) => ({
                    service_id: serviceData[0].id,
                    technology_id: technologyId,
                })));

            if (technologiesError) {
                console.error('Error inserting technologies:', technologiesError);
                window.alert(technologiesError.message);
                setIsLoading(false);
                return;
            }
        }

        if (data.url_web) {
            const { error: urlWebError } = await supabase
                .from('url_website')
                .insert([{ service_id: serviceData[0].id, url: data.url_web }]);

            if (urlWebError) {
                console.error('Error inserting url_web:', urlWebError);
                window.alert(urlWebError.message);
                setIsLoading(false);
                return;
            }
        }

        if (data.url_appstore) {
            const { error: urlAppleStoreError } = await supabase
                .from('url_app_store')
                .insert([{ service_id: serviceData[0].id, url: data.url_appstore }]);

            if (urlAppleStoreError) {
                console.error('Error inserting url_web:', urlAppleStoreError);
                window.alert(urlAppleStoreError.message);
                setIsLoading(false);
                return;
            }
        }

        if (data.url_googleplay) {
            const { error: urlGooglePlayError } = await supabase
                .from('url_google_play')
                .insert([{ service_id: serviceData[0].id, url: data.url_googleplay }]);

            if (urlGooglePlayError) {
                console.error('Error inserting url_web:', urlGooglePlayError);
                window.alert(urlGooglePlayError.message);
                setIsLoading(false);
                return;
            }
        }

        if (data.url_others) {
            const { error: urlOthersError } = await supabase
                .from('url_others')
                .insert([{ service_id: serviceData[0].id, url: data.url_others }]);

            if (urlOthersError) {
                console.error('Error inserting url_web:', urlOthersError);
                window.alert(urlOthersError.message);
                setIsLoading(false);
                return;
            }
        }

        window.location.href = '/admin/services/existing-services';
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
                        <FormButton name="キャンセル" type='cancel' onClick={() => window.location.href = '/admin/services'} />
                        <FormButton name="新規作成" type='submit' />
                    </div>
                </form>
            </main>
        </>
    );
};

export default NewServicesPage;
