"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TechnologyInputSchema, TechnologyOutputSchema, resolver } from "../../../new/technologiesFormSchema";
import {  FormField, createFormFields } from "../../../new/hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

type technologyTableData = {
    name: string;
    image: File | undefined;
    imageURL: string;
}

const EditTechnologiesPage = ({
    params,
}: {
    params: { tech_id: string };
}
) => {
    const { control, handleSubmit, reset } = useForm<TechnologyInputSchema>({
        mode: "onChange",
        resolver: resolver,
        defaultValues: {
            iconImage: undefined,
            name: '',
        },
    });
    const technologyID = params.tech_id;
    const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<TechnologyInputSchema>[] }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstLoading, setIsFirstLoading] = useState(true);

    const [imageDataURL, setImageDataURL] = useState<string | undefined>(undefined);
    const [checkImageDataURL, setCheckImageDataURL] = useState<string | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        const fetchTechnologyData = async () => {
            if (technologyID) {
                const { data: technologyData, error: technologyError } = await supabase
                    .from("technologies")
                    .select("*")
                    .eq("id", technologyID)
                    .single();
                if (technologyError) {
                    console.error("Error fetching awards data:", technologyError);
                    return undefined;
                }
                if (!technologyData) {
                    console.error("Error! data could not be found");
                    return undefined;
                }

                // let file = undefined;

                if (technologyData.image) {
                    //     const url = await fetch(userData.image);
                    //     const blob = await url.blob();
                    //     file = new File([blob], userData.image);
                    const splitURl = technologyData.image.split('/');
                    const fileName = splitURl[splitURl.length - 1];
                    setCheckImageDataURL(fileName);
                }
                return {
                    name: technologyData.name,
                    image: undefined,
                    imageURL: technologyData.image,
                };
            }
            return undefined;
        };

        const fetchData = async () => {
            try {
                const technologyTableData: technologyTableData | undefined = await fetchTechnologyData();
                reset({
                    iconImage: technologyTableData?.image,
                    name: technologyTableData?.name,
                });
                setFormFields(createFormFields(control, technologyTableData?.imageURL ? `${technologyTableData?.imageURL}?${new Date().getTime()}` : undefined));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsFirstLoading(false);
            }
        };

        fetchData();
    }, [technologyID]);


    const handleCancel = () => {
        const confirmDelete = window.confirm("編集内容が破棄されますがよろしいですか？");

        if (!confirmDelete) {
            return;
        }
        router.push('/admin/technologies/existing-technologies');
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("本当に削除しますか？");

        if (!confirmDelete) {
            return;
        }

        setIsLoading(true);
        const { error: deleteError } = await supabase
            .from('technologies')
            .delete()
            .eq('id', technologyID);

        if (deleteError) {
            console.error('Error deleting user:', deleteError);
            window.alert(deleteError.message);
            setIsLoading(false);
            return;
        }

        if (checkImageDataURL) {
            const { error: deleteImageError } = await supabase.storage
                .from('technology_icons')
                .remove([checkImageDataURL]);

            if (deleteImageError) {
                console.error('Error deleting image:', deleteImageError);
                window.alert(deleteImageError.message);
                setIsLoading(false);
                return;
            }
        }

        router.push('/admin/technologies/existing-technologies');
    }

    const onSubmit: SubmitHandler<TechnologyOutputSchema> = async (data) => {
        setIsLoading(true);
        let imageUrl = '';

        if (data.iconImage instanceof File) {
            const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
            if (checkImageDataURL) {
                const { error: uploadError } = await supabase.storage
                    .from('technology_icons')
                    .update(checkImageDataURL, data.iconImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            } else {
                const { error: uploadError } = await supabase.storage
                    .from('technology_icons')
                    .upload(imageFileName, data.iconImage);

                if (uploadError) {
                    console.error('Error uploading file: ', uploadError.message);
                    window.alert(uploadError.message);
                    setIsLoading(false);
                    return;
                }
            }

            const { data: publicImageUrlData } = await supabase.storage
                .from('technology_icons')
                .getPublicUrl(checkImageDataURL ? checkImageDataURL : imageFileName);

            imageUrl = publicImageUrlData.publicUrl || '';
        }

        const { iconImage, ...rest } = data;
        if (imageDataURL && imageUrl === '') {
            imageUrl = imageDataURL;
        }
        const submitData = { ...rest, image: imageUrl };

        const { error: insertError } = await supabase
            .from('technologies')
            .update([submitData])
            .eq('id', technologyID);

        if (insertError) {
            console.error('Error inserting service:', insertError);
            window.alert(insertError.message);
            setIsLoading(false);
            return;
        }

        router.push('/admin/technologies/existing-technologies');
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
                {!isFirstLoading && <div>
                    <div style={{
                        borderBottom: "1px solid #9CABC7",
                        paddingBottom: "12px",
                        marginBottom: "12px",
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <h1>既存技術編集</h1>
                        <FormButton name="データ削除" type='delete' onClick={handleDelete} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields.map(({ title, fields }, index) => (
                            <section key={index} style={{
                                borderBottom: "1px solid #9CABC7",
                                paddingBottom: "12px",
                                marginBottom: "12px",
                            }}>
                                <h3>{title}</h3>
                                {fields.map((field) => (
                                    <FormFactory<TechnologyInputSchema> key={field.id} {...field} />
                                ))}
                            </section>
                        ))}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '60px',
                            margin: "20px 0"
                        }}>
                            <FormButton name="編集破棄" type='cancel' onClick={handleCancel} />
                            <FormButton name="編集完了" type='submit' />
                        </div>
                    </form>
                </div>}
            </main>
        </>
    );
};

export default EditTechnologiesPage;
