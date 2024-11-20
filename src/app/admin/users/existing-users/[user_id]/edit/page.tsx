"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "../../../new/userFormSchema";
import { teckData, userTableData, FormField, useFormFields } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

type snsTableData = {
    x_id: string;
    instagram_id: string;
    github_id: string;
}

type tecksTableData = {
    id: number;
    name: string;
}

const EditServicesPage = ({
    params,
}: {
    params: { user_id: string };
}
) => {
    const { control, handleSubmit } = useForm<ServiceInputSchema>({
        mode: "onChange",
        resolver: resolver,
    });
    const userID = params.user_id;
    const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<ServiceInputSchema>[] }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchTecksData = async () => {
            try {
                const { data: getTechsData, error: techsError } = await supabase
                    .from('technologies')
                    .select('id, name');
    
                if (techsError) {
                    throw new Error(`Error fetching techs: ${techsError.message}`);
                }
                return getTechsData.map((tech) => ({ value: tech.id, label: tech.name })) || [];
            } catch (error) {
                console.error(error);
                return undefined;
            }
        };
    
        const fetchUserData = async () => {
            if (userID) {
                const { data: userData, error: userError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userID)
                    .single();
                if (userError) {
                    console.error("Error fetching awards data:", userError);
                    return undefined;
                }
                if (!userData) {
                    console.error("Error! data could not be found");
                    return undefined;
                }
                return {
                    name: userData.name,
                    nickname: userData.nickname,
                    account_id: userData.account_id,
                    introduction: userData.introduction,
                    image: userData.image,
                };
            }
            return undefined;
        };
    
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [tecksDataResult, userDataResult]: [teckData[] | undefined, userTableData | undefined] = await Promise.all([fetchTecksData(), fetchUserData()]);
                console.log(userDataResult);
                setFormFields(useFormFields(control, tecksDataResult, userDataResult));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [userID]);
    

    const handleCancel = () => {
        router.push('/admin/users/existing-users');
    }

    const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
        setIsLoading(true);

        let imageUrl = '';

        if (data.iconImage instanceof File) {
            const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            const { error: uploadError } = await supabase.storage
                .from('user_icons')
                .upload(imageFileName, data.iconImage);

            if (uploadError) {
                console.error('Error uploading file: ', uploadError.message);
                window.alert(uploadError.message);
                setIsLoading(false);
                return;
            }

            const { data: publicImageUrlData } = await supabase.storage
                .from('user_icons')
                .getPublicUrl(imageFileName);

            imageUrl = publicImageUrlData.publicUrl || '';
        }

        const { iconImage, technologiesId, x_id, instagram_id, github_id, ...rest } = data;
        const submitData = { ...rest, image: imageUrl };

        const { data: userData, error: insertError } = await supabase
            .from('users')
            .insert([submitData])
            .select();

        if (insertError) {
            console.error('Error inserting service:', insertError);
            window.alert(insertError.message);
            setIsLoading(false);
            return;
        }

        if (data.technologiesId && data.technologiesId.length > 0) {
            const { error: technologiesError } = await supabase
                .from('users_technologies')
                .insert(data.technologiesId.map((technologyId) => ({
                    user_id: userData[0].id,
                    technology_id: technologyId,
                })));

            if (technologiesError) {
                console.error('Error inserting technologies:', technologiesError);
                window.alert(technologiesError.message);
                setIsLoading(false);
                return;
            }
        }


        if (x_id) {
            const { error: xIdError } = await supabase
                .from('x')
                .insert([{ user_id: userData[0].id, x_id: x_id }]);

            if (xIdError) {
                console.error('Error inserting url_web:', xIdError);
                window.alert(xIdError.message);
                setIsLoading(false);
                return;
            }
        }

        if (instagram_id) {
            const { error: instagramIdError } = await supabase
                .from('instagram')
                .insert([{ user_id: userData[0].id, instagram_id: instagram_id }]);

            if (instagramIdError) {
                console.error('Error inserting url_web:', instagramIdError);
                window.alert(instagramIdError.message);
                setIsLoading(false);
                return;
            }
        }

        if (github_id) {
            const { error: githubIdError } = await supabase
                .from('github')
                .insert([{ user_id: userData[0].id, github_id: github_id }]);

            if (githubIdError) {
                console.error('Error inserting url_web:', githubIdError);
                window.alert(githubIdError.message);
                setIsLoading(false);
                return;
            }
        }
        router.push('/admin/users/existing-users');
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
                    borderBottom: "1px solid #9CABC7",
                    paddingBottom: "12px",
                    marginBottom: "12px",
                }}>新規ユーザ作成</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formFields.map(({ title, fields }, index) => (
                        <section key={index} style={{
                            borderBottom: "1px solid #9CABC7",
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

export default EditServicesPage;
